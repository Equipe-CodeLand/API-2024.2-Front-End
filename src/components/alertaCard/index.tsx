import React, { useState } from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import './style.css';

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
}

interface AlertaCardProps {
  alerta: Alerta;
  onDelete: (id: number) => void; // Adiciona a prop para deletar o alerta
}

const AlertaCard: React.FC<AlertaCardProps> = ({ alerta, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editAlerta, setEditAlerta] = useState(alerta);

  // Condições disponíveis no dropdown
  const condicoes = ['<', '>', '==', '>=', '<='];

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditAlerta({ ...editAlerta, [name]: value });
  };

  const handleDeleteClick = async () => {
    const confirmed = window.confirm('Tem certeza que deseja excluir este alerta?');
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:5000/alerta/deletar/${alerta.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          onDelete(alerta.id); // Chama a função de callback para atualizar a lista
        } else {
          console.error('Erro ao deletar o alerta');
        }
      } catch (error) {
        console.error('Erro ao deletar o alerta:', error);
      }
    }
  };

  const gravidadeClasse = alerta.gravidade === 'Atenção' ? 'atencao' : 'perigo';
  

  return (
    <div className="alert-card-container"> {/* Contêiner para centralização */}
      <details className={`alert-card ${gravidadeClasse}`}>
        <summary className="alert-card-header">
          <p className={`text-${gravidadeClasse.toLowerCase()}`}>
            {alerta.gravidade === 'Atenção' ? <WarningIcon className='icon yellow'/> : <WarningIcon className='icon red'/>} {isEditing ? (

                
                <input
                  type="text"
                  name="descricao"
                  value={editAlerta.descricao}
                  onChange={handleInputChange}
                  className="edit-input"
                />
            ) : (
              alerta.descricao
            )}
          </p>
          <p className="text">{alerta.local}</p>
          <img
            src="https://img.icons8.com/ios/50/000000/expand-arrow.png"
            alt="expand-arrow"
          />
        </summary>
        <div className="inside-box">
          <div className="information-box-row">
            <div className="information-box-item">
              <h4 className="text">MENSAGEM: </h4>
              {isEditing ? (
                <input
                  type="text"
                  name="descricao"
                  value={editAlerta.descricao}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              ) : (
                <span>{alerta.descricao}</span>
              )}
            </div>
          </div>

          <div className="information-box-row">
            <div className="information-box-item">
              <h4 className="text">CONDIÇÃO: </h4>
              {isEditing ? (
                <select
                  name="condicao"
                  value={editAlerta.condicao}
                  onChange={handleInputChange}
                  className="edit-input"
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
            <div className="information-box-item">
              <h4 className="text">VALOR: </h4>
              {isEditing ? (
                <input
                  type="number"
                  name="valor"
                  value={editAlerta.valor}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              ) : (
                <span>{alerta.valor}</span>
              )}
            </div>
          </div>

          <div className="information-box-row">
            <div className="information-box-item">
              <h4 className="text">PARÂMETRO: </h4>
              {isEditing ? (
                <input
                  type="text"
                  name="parametro"
                  value={editAlerta.parametro}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              ) : (
                <span>{alerta.parametro}</span>
              )}
            </div>
          </div>

          <div className="box-btn">
            <button className="btn" onClick={handleEditClick}>
              {isEditing ? 'Salvar' : 'Editar'}
            </button>
            {!isEditing && (
              <button className="btn" onClick={handleDeleteClick}>
                Excluir
              </button>
            )}
            {isEditing && (
              <button className="btn" onClick={handleEditClick}>
                Cancelar
              </button>
            )}
          </div>
        </div>
      </details>
    </div>
  );
};

export default AlertaCard;
