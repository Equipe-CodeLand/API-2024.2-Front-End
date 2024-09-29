import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sidebar } from '../../components/sidebar/sidebar';
import TabelaGenerica from '../../components/tabelaDropdown';
import { Link } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import './style.css';
import api from '../../config';

interface Parametro {
  id: number;
  nome: string;
  unidade: string;
  fator: number;
  offset: number;
  descricao: string;
}

const Parametros: React.FC = () => {
  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editando, setEditando] = useState<number | null>(null);
  const [parametroEditado, setParametroEditado] = useState<Partial<Parametro>>({});
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const fetchParametros = async () => {
    try {
      const response = await api.get('http://localhost:5000/parametros'); // Atualize a URL
      console.log('Dados recebidos:', response.data); // Adicione este log para verificar os dados recebidos
      setParametros(response.data.parametros); // Ajuste conforme a estrutura dos dados
    } catch (err) {
      console.error('Erro ao buscar parâmetros:', err); // Mude para console.error para erros
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
    setEditando(parametro.id);
    setParametroEditado(parametro);
  };

  const handleSave = async () => {
    const errors: { [key: string]: string } = {};
    if (!parametroEditado.nome) errors.nome = 'O campo nome é obrigatório.';
    if (!parametroEditado.unidade) errors.unidade = 'O campo unidade é obrigatório.';
    if (parametroEditado.fator === undefined) errors.fator = 'O campo fator é obrigatório.';
    if (parametroEditado.offset === undefined) errors.offset = 'O campo offset é obrigatório.';
    if (!parametroEditado.descricao) errors.descricao = 'O campo descrição é obrigatório.';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await api.put(`http://localhost:5000/parametro/atualizar/${parametroEditado.id}`, parametroEditado);
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

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`http://localhost:5000/parametro/${id}`);
      fetchParametros(); // Atualiza a lista após deletar
    } catch (err) {
      console.error('Erro ao deletar parâmetro:', err);
    }
  };

  const confirmDelete = (id: number) => {
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
        Swal.fire(
          'Deletado!',
          'O parâmetro foi deletado.',
          'success'
        );
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
            <p><strong>Parametro:</strong> <input className="input-field" type="text" name="nome" value={parametroEditado.nome || ''} onChange={handleChange} /></p>
            {validationErrors.nome && <p className="error-text">{validationErrors.nome}</p>}
            <p><strong>Fator:</strong> <input className="input-field" type="number" name="fator" value={parametroEditado.fator || 0} onChange={handleChange} /></p>
            {validationErrors.fator && <p className="error-text">{validationErrors.fator}</p>}
            <p><strong>Descrição:</strong> <input className="input-field" type="text" name="descricao" value={parametroEditado.descricao || ''} onChange={handleChange} /></p>
            {validationErrors.descricao && <p className="error-text">{validationErrors.descricao}</p>}
          </div>
        ),
        col2: (
          <div>
            <p><strong>Unidade:</strong> <input className="input-field" type="text" name="unidade" value={parametroEditado.unidade || ''} onChange={handleChange} /></p>
            {validationErrors.unidade && <p className="error-text">{validationErrors.unidade}</p>}
            <p><strong>Offset:</strong> <input className="input-field" type="number" name="offset" value={parametroEditado.offset || 0} onChange={handleChange} /></p>
            {validationErrors.offset && <p className="error-text">{validationErrors.offset}</p>}
          </div>
        ),
        extra: [
          <div key="action-button" className="button-group">
            <button className='btn-salvar' onClick={handleSave}>Salvar</button>
            <button className='btn-deletar' onClick={() => setEditando(null)}>Cancelar</button>
          </div>
        ]
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
          </div>
        ),
        extra: [
          <div key="action-button" className="button-group">
            <button className='btn-editar' onClick={() => handleEdit(parametro)}>Editar</button>
            <button className='btn-deletar' onClick={() => confirmDelete(parametro.id)}>Deletar</button>
          </div>
        ]
      };
    }
  };

  // Define a type for the columns that includes the optional renderCell property
  type Column<T> = {
    label: string;
    key: keyof T;
    renderCell?: (value: string | number) => JSX.Element;
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
        <br />
        <div className="button-container">
          {/* <button className='btn-filtro'>Filtro</button> */}
          <Link to="/parametro/cadastro" className='adicionarParametro'>Adicionar Parâmetro</Link>
        </div>
      </div>
      <div className="content">
        {error && <strong className='error-text'>{error}</strong>}
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
      </div>
    </div>
  );
};

export default Parametros;