import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sidebar } from '../../components/sidebar/sidebar';
import TabelaGenerica from '../../components/tabelaDropdown';
import { Link } from 'react-router-dom'; 
import './style.css';

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

  const fetchParametros = async () => {
    try {
      const response = await axios.get('http://localhost:5000/parametro'); // Atualize a URL
      console.log('Dados recebidos:', response.data); // Adicione este log para verificar os dados recebidos
      setParametros(response.data); // Ajuste conforme a estrutura dos dados
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

  const handleEdit = async (parametro: Parametro) => {
    try {
      await axios.put(`http://localhost:5000/parametro/${parametro.id}`, parametro);
      fetchParametros(); // Atualiza a lista após a edição
    } catch (err) {
      console.error('Erro ao atualizar parâmetro:', err);
      setError('Erro ao atualizar parâmetro.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/parametro/${id}`);
      fetchParametros(); // Atualiza a lista após deletar
    } catch (err) {
      console.error('Erro ao deletar parâmetro:', err);
    }
  };

  // Função para gerar o conteúdo em duas colunas + o extra no dropdown
  const dropdownContent = (parametro: Parametro) => ({
    idRow: (
      <div>
        <p><strong>ID:</strong> {parametro.id}</p>
      </div>
    ),
    col1: (
      <div>
        <p><strong>Parametro:</strong> {parametro.nome}</p>
        <p><strong>Fator:</strong> {parametro.fator}</p>
        <p><strong>Descrição:</strong> {parametro.descricao}</p>
      </div>
    ),
    col2: (
      <div>
        <p><strong>Unidade:</strong> {parametro.unidade}</p>
        <p><strong>Offset:</strong> {parametro.offset}</p>
      </div>
    ),
    extra: [
      <div key="action-button" className="button-group">
        <button className='btn-editar' onClick={() => handleEdit(parametro)}>Editar</button>
        <button className='btn-deletar' onClick={() => handleDelete(parametro.id)}>Deletar</button>
      </div>
    ]
  });

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
        <p className='text'>Aqui você pode ver todos os parâmetros!</p>
        <div className="button-container">
          <button className='btn-filtro'>Filtro</button>
          <Link to="/parametro/cadastro" className='btn'>Adicionar Parâmetro</Link>
        </div>
      </div>
      <div className='adicionarParametro'>
        <Link to="/parametro/cadastro" className='btn'>Adicionar parâmetro</Link>
      </div>
      <div className="content">
        {error && <p className='error-text'>{error}</p>}
        <TabelaGenerica<Parametro> 
          data={parametros} 
          columns={columns} 
          detailExtractor={(parametro) => (
            <div className="parametro-detalhes">
              <p><strong>ID:</strong> {parametro.id}</p>
              <p><strong>Nome:</strong> {parametro.nome}</p>
              <p><strong>Fator:</strong> {parametro.fator}</p>
            </div>
          )}
          dropdownContent={dropdownContent} 
        />
      </div>
    </div>
  );
};

export default Parametros;