import React, { useState, useEffect } from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import './style.css';
import Swal from 'sweetalert2';
import axios from 'axios';

export interface Alerta {
  id: number;
  local: string;
  gravidade: string;
  descricao: string;
  valor: number;
  parametro: string;
  condicao: string;
  nomeParametro: string;
  nomeEstacao: string;
  estacaoId: number;
  parametroId: number;
}

interface AlertaCardProps {
  alerta: Alerta;
  idEstacao: number;
  idParametro: number;
  onDelete: (id: number) => void;
  onUpdate: (alerta: Alerta) => void;
}

const AlertaCard: React.FC<AlertaCardProps> = ({ alerta, idEstacao, idParametro, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editAlerta, setEditAlerta] = useState<Alerta>(alerta);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [parametrosOptions, setParametrosOptions] = useState<any[]>([]);
  const [parametroSelecionado, setParametroSelecionado] = useState<number | null>(null);

  // Condições disponíveis no dropdown
  const condicoes = ['<', '>', '==', '>=', '<='];

  // Opções de gravidade
  const gravidadeOptions = [
    { value: 'Atenção', label: 'Atenção' },
    { value: 'Perigo', label: 'Perigo' }
  ];

  useEffect(() => {
    const fetchParametros = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/parametro/estacao/${idEstacao}`);
        setParametrosOptions(response.data);
        console.log(response.data);

      } catch (error) {
        console.error("Erro ao buscar parâmetros:", error);
      }
    };

    if (idEstacao) {
      fetchParametros();
    }
  }, [idEstacao]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors({});
    }, 2000);

    return () => clearTimeout(timer);
  }, [errors]);


  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setParametroSelecionado(idParametro);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditAlerta((prev) => ({
      ...prev,
      [name]: value,
      parametroId: name === 'parametro' ? Number(value) : prev.parametroId // Converte para número
    }));
  };


  const handleDeleteClick = async () => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, excluir!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/alerta/deletar/${alerta.id}`);
          Swal.fire('Excluído!', 'O alerta foi excluído com sucesso.', 'success');
          onDelete(alerta.id);
        } catch (error) {
          console.error("Erro ao excluir alerta:", error);
        }
      }
    });
  };

  const handleSaveClick = async () => {
    try {
      // Validações de campos obrigatórios
      let hasErrors = false;
      const newErrors: { [key: string]: string } = {};

      if (!editAlerta.descricao) {
        newErrors.descricao = "Mensagem é obrigatória";
        hasErrors = true;
      }

      if (!editAlerta.valor) {
        newErrors.valor = "Valor é obrigatório";
        hasErrors = true;
      }

      if (hasErrors) {
        setErrors(newErrors);
        return; // Saia da função se houver erros
      }

      // Caso contrário, prosseguir com a atualização
      const updatedAlerta = {
        estacaoId: idEstacao,
        parametroId: parametroSelecionado,
        mensagemAlerta: editAlerta.descricao,
        tipoAlerta: editAlerta.gravidade,
        condicao: editAlerta.condicao,
        valor: editAlerta.valor
      };

      const response = await axios.put(`http://localhost:5000/alerta/atualizar/${editAlerta.id}`, updatedAlerta);
      onUpdate(response.data);

      Swal.fire({
        icon: 'success',
        title: 'Atualizado!',
        text: 'O alerta foi atualizado com sucesso!'
      }).then(() => {
        window.location.reload(); // Recarrega a página após clicar em OK
      });
  
      setIsEditing(false);
      setErrors({}); // Limpa os erros após salvar
    } catch (error) {
      console.error("Erro ao atualizar alerta:", error);
      Swal.fire('Erro!', 'Ocorreu um erro ao atualizar o alerta.', 'error');
    }
  };




  const gravidadeClasse = alerta.gravidade === 'Atenção' ? 'atencao' : 'perigo';

  return (
    <div className="alert-card-container">
      <details className={`alert-card ${gravidadeClasse}`}>
        <summary className="alert-card-header">
          <p className={`text-${gravidadeClasse.toLowerCase()}`}>
            {alerta.gravidade === 'Atenção' ? (
              <WarningIcon className='icon yellow' />
            ) : (
              <WarningIcon className='icon red' />
            )}
            {alerta.descricao}
          </p>

          <p className="text">{alerta.local}</p>
          <img
            src="https://img.icons8.com/ios/50/000000/expand-arrow.png"
            alt="expand-arrow"
          />
        </summary>

        <div className="inside-box">
          <div className="information-box-row">
            <div className={`information-box-item ${isEditing ? 'editing-mode' : ''}`}>
              <h4 className="text">Mensagem: </h4>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="descricao"
                    value={editAlerta.descricao}
                    onChange={handleInputChange}
                    className="input-edicao"
                  />
                  {errors.descricao && <span className="error">{errors.descricao}</span>}
                </>
              ) : (
                <span>{alerta.descricao}</span>
              )}

            </div>
          </div>

          <div className="information-box-row">
            <div className={`information-box-item ${isEditing ? 'editing-mode' : ''}`}>
              <h4 className="text">Condição: </h4>
              {isEditing ? (
                <select
                  name="condicao"
                  value={editAlerta.condicao}
                  onChange={handleInputChange}
                  className="input-edicao"
                >
                  {condicoes.map((condicao, index) => (
                    <option key={index} value={condicao}>
                      {condicao}
                    </option>
                  ))}
                </select>
              ) : (
                <span>{alerta.condicao}</span>
              )}
            </div>
            <div className={`information-box-item ${isEditing ? 'editing-mode' : ''}`}>
              <h4 className="text">Valor: </h4>
              {isEditing ? (
                <>
                  <input
                    type="number"
                    name="valor"
                    value={editAlerta.valor}
                    onChange={handleInputChange}
                    className="input-edicao"
                  />
                  {errors.valor && <span className="error">{errors.valor}</span>}
                </>
              ) : (
                <span>{alerta.valor}</span>
              )}

            </div>
          </div>

          <div className="information-box-row">
            <div className={`information-box-item ${isEditing ? 'editing-mode' : ''}`}>
              <h4 className="text">Parâmetro: </h4>
              {isEditing ? (
                <select
                  id="parametro"
                  className='input-edicao'
                  value={parametroSelecionado || ''}
                  onChange={(e) => {
                    const selectedValue = Number(e.target.value); // Converte para número
                    setParametroSelecionado(selectedValue);
                    setEditAlerta({ ...editAlerta, parametroId: selectedValue });
                  }}
                >
                  {parametrosOptions.map((parametro) => (
                    <option key={parametro.id} value={parametro.id}>
                      {parametro.nome}
                    </option>
                  ))}
                </select>
              ) : (
                <span>{alerta.parametro}</span>
              )}
            </div>
            <div className={`information-box-item ${isEditing ? 'editing-mode' : ''}`}>
              <h4 className="text">Tipo: </h4>
              {isEditing ? (
                <select
                  name="gravidade"
                  value={editAlerta.gravidade}
                  onChange={handleInputChange}
                  className="input-edicao"
                >
                  {gravidadeOptions.map((gravidade, index) => (
                    <option key={index} value={gravidade.value}>
                      {gravidade.label}
                    </option>
                  ))}
                </select>
              ) : (
                <span>{alerta.gravidade}</span>
              )}
            </div>
          </div>

          <div className="box-btn">
            <button className="btn" onClick={isEditing ? handleSaveClick : handleEditClick}>
              {isEditing ? 'Salvar' : 'Editar'}
            </button>
            <button className="btn" onClick={handleDeleteClick}>
              Excluir
            </button>
          </div>
        </div>
      </details>
    </div>
  );
}

export default AlertaCard;