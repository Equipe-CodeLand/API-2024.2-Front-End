import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sidebar } from '../../components/sidebar/sidebar';
import TabelaGenerica from '../../components/tabelaDropdown';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './style.css';
import { api } from '../../config';
import { Parametro } from '../../interface/parametro';
import { isUserAdmin } from '../Login/privateRoutes';

const Parametros: React.FC = () => {
  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editando, setEditando] = useState<string | null>(null);
  const [parametroEditado, setParametroEditado] = useState<Partial<Parametro>>({});
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const fetchParametros = async () => {
    try {
      const response = await api.get('/parametros');
      console.log('Dados recebidos:', response.data);
      setParametros(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Erro ao buscar parâmetros:', err);
      if (axios.isAxiosError(err) && err.response) {
        setError(`Erro ao buscar parâmetros: ${err.response.status} - ${err.response.statusText}`);
      } else {
        setError('Erro desconhecido ao buscar parâmetros.');
      }
    }
  };

  useEffect(() => {
    fetchParametros();
  }, []);

  const handleEdit = (parametro: Parametro) => {
    setEditando(parametro.id || null);
    setParametroEditado(parametro);
  };

  const handleSave = async () => {
    const errors: { [key: string]: string } = {};
    if (!parametroEditado.nome) errors.nome = 'O campo nome é obrigatório.';
    if (!parametroEditado.unidade) errors.unidade = 'O campo unidade é obrigatório.';
    if (parametroEditado.fator === undefined) errors.fator = 'O campo fator é obrigatório.';
    if (parametroEditado.offset === undefined) errors.offset = 'O campo offset é obrigatório.';
    if (!parametroEditado.descricao) errors.descricao = 'O campo descrição é obrigatório.';
    if (!parametroEditado.sigla) errors.sigla = 'O campo sigla é obrigatório.';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await api.put(`/parametro/atualizar/${parametroEditado.id}`, parametroEditado, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      Swal.fire({
        icon: 'success',
        title: 'Parâmetro atualizado com sucesso!',
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setEditando(null);
          fetchParametros(); // Atualiza a lista após a edição
          setError(null);
          setValidationErrors({});
        }
      });
    } catch (err) {
      console.error('Erro ao atualizar parâmetro:', err);
      setError('Erro ao atualizar parâmetro.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/parametro/deletar/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
    });
      fetchParametros(); // Atualiza a lista após deletar
      Swal.fire(
        'Deletado!',
        'O parâmetro foi deletado.',
        'success'
      );
    } catch (err) {
      console.error('Erro ao deletar parâmetro:', err);
      setError('Erro ao deletar parâmetro.');
    }
  };

  const confirmDelete = (id: string) => {
    console.log('Deletar parâmetro com ID:', id);
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e57c2',
      cancelButtonColor: '#969696',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        console.log('Parâmetro deletado com sucesso!');
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParametroEditado(prev => ({ ...prev, [name]: value }));
    setValidationErrors(prev => ({ ...prev, [name]: '' })); // Limpa o erro de validação ao alterar o campo
  };

  // Função para gerar o conteúdo em duas colunas + o extra no dropdown
  const dropdownContent = (parametro: Parametro) => {
    if (editando === parametro.id) {
      return {
        idRow: (
          <div>
            <p className="field-label">ID: {parametro.id}</p>
          </div>
        ),
        col1: (
          <div>
            <p><strong className="field-label">Parametro:</strong> <input className="input-field" type="text" name="nome" value={parametroEditado.nome || ''} onChange={handleChange} /></p>
            {validationErrors.nome && <p className="error-text">{validationErrors.nome}</p>}
            <p><strong className="field-label">Fator:</strong> <input className="input-field" type="number" name="fator" value={parametroEditado.fator || 0} onChange={handleChange} /></p>
            {validationErrors.fator && <p className="error-text">{validationErrors.fator}</p>}
            <p><strong className="field-label">Descrição:</strong> <input className="input-field" type="text" name="descricao" value={parametroEditado.descricao || ''} onChange={handleChange} /></p>
            {validationErrors.descricao && <p className="error-text">{validationErrors.descricao}</p>}
          </div>
        ),
        col2: (
          <div>
            <p><strong className="field-label">Unidade:</strong> <input className="input-field" type="text" name="unidade" value={parametroEditado.unidade || ''} onChange={handleChange} /></p>
            {validationErrors.unidade && <p className="error-text">{validationErrors.unidade}</p>}
            <p><strong className="field-label">Offset:</strong> <input className="input-field" type="number" name="offset" value={parametroEditado.offset || 0} onChange={handleChange} /></p>
            {validationErrors.offset && <p className="error-text">{validationErrors.offset}</p>}
            <p><strong className="field-label">Sigla:</strong> <input className="input-field" type="text" name="sigla" value={parametroEditado.sigla || ''} onChange={handleChange} /></p>
            {validationErrors.sigla && <p className="error-text">{validationErrors.sigla}</p>}
          </div>
        ),
        extra: isUserAdmin() ? [
          <div key="action-button" className="button-group">
            <button className='btn-salvar' onClick={handleSave}>Salvar</button>
            <button className='btn-deletar' onClick={() => setEditando(null)}>Cancelar</button>
          </div>
        ] : undefined
      };
    } else {
      return {
        idRow: (
          <div>
            <p className="field-label">ID: {parametro.id}</p>
          </div>
        ),
        col1: (
          <div>
            <p className="field-label">Parametro:</p>
            <p className="field-value">{parametro.nome}</p>
            <p className="field-label">Fator:</p>
            <p className="field-value">{parametro.fator}</p>
            <p className="field-label">Descrição:</p>
            <p className="field-value">{parametro.descricao}</p>
          </div>
        ),
        col2: (
          <div>
            <p className="field-label">Unidade:</p>
            <p className="field-value">{parametro.unidade}</p>
            <p className="field-label">Offset:</p>
            <p className="field-value">{parametro.offset}</p>
            <p className="field-label">Sigla:</p>
            <p className="field-value">{parametro.sigla}</p>
          </div>
        ),
        extra: isUserAdmin() ? [
          <div key="action-button" className="button-group">
            <button className='btn-editar' onClick={() => handleEdit(parametro)}>Editar</button>
            <button className='btn-deletar' onClick={() => parametro.id && confirmDelete(parametro.id)}>Excluir</button>
          </div>
        ] : undefined
      };
    }
  };

  // Define a type for the columns that includes the optional renderCell property
  type Column<T> = {
    label: string;
    key: keyof T;
    renderCell?: (value: string | number | undefined) => JSX.Element;
  };

  // Colunas que serão exibidas na tabela
  const columns: Array<Column<Parametro>> = [
    { label: 'ID', key: 'id' },
    { label: 'Parâmetro', key: 'nome' },
    { label: 'Unidade', key: 'unidade' },
    { label: 'Fator', key: 'fator' },
    { label: 'Offset', key: 'offset' }
  ];

  return (
    <div className='container'>
      <Sidebar />
      <div className="title-box">
        <h2 className='title-text'>Parâmetros</h2>
      </div>
      <div className="content">
        <div className="adicionarUsuario">
          <div></div>
          {isUserAdmin() && (
          <Link to="/parametro/cadastro" className='btn'>Adicionar Parâmetro</Link>
          )}
        </div>
        {error && <strong className='error-text'>{error}</strong>}
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <TabelaGenerica<Parametro>
            data={parametros}
            columns={columns}
            detailExtractor={(parametro) => (
              <div className="parametro-detalhes">
                <p className="field-label">ID: {parametro.id}</p>
                <p className="field-label">Nome:</p>
                <p className="field-value">{parametro.nome}</p>
                <p className="field-label">Fator:</p>
                <p className="field-value">{parametro.fator}</p>
              </div>
            )}
            dropdownContent={dropdownContent}
          />
        )}
      </div>
    </div>
  );
};

export default Parametros;