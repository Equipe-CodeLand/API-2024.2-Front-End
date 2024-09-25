import React from 'react';
import TabelaGenerica from '../../components/tabelaDropdown';
import { Sidebar } from '../../components/sidebar/sidebar';
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

// Dados de exemplo
const parametrosData: Parametro[] = [
  {
    id: 1,
    nome: 'Pluviosidade',
    unidade: 'mm',
    fator: 0.25,
    offset: 1.4,
    descricao: 'Quantidade de chuva caída que, durante um período de tempo determinado, precipita numa região'
  },
  {
    id: 2,
    nome: 'Temperatura',
    unidade: '°C',
    fator: 0.1,
    offset: 2.0,
    descricao: 'Medida da quantidade de calor em uma determinada região.'
  }
];

// Função para gerar o conteúdo em duas colunas + o extra no dropdown
const dropdownContent = (parametro: Parametro) => ({
  idRow: (
    <div>
      <p><strong>ID:</strong> {parametro.id}</p>
    </div>
  ),
  col1: (
    <div>
      <p ><strong>Parametro:</strong> {parametro.nome}</p>
      <p ><strong>Fator:</strong> {parametro.fator}</p>
      <p ><strong>Descrição:</strong> {parametro.descricao}</p>
    </div>
  ),
  col2: (
    <div>
      <p ><strong>Unidade:</strong> {parametro.unidade}</p>
      <p ><strong>Offset:</strong> {parametro.offset}</p>
    </div>
  ),
  extra: [
    <div key="action-button" className="button-group">
      <button className='btn-editar'>Editar</button>
      <button className='btn-deletar'>Deletar</button>
    </div>
  ]
});

const ParametroTable: React.FC = () => {
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
    <div className="container">
      <Sidebar />
      <div className="title-box">
        <h2 className='title-text'>Parâmetros</h2>
        <div className="button-container">
          <button className='btn-filtro'>Filtro</button>
          <Link to="/parametro/cadastro" className='btn'>Adicionar Parâmetro</Link>
        </div>
      </div>
      <div className="content">
        <TabelaGenerica<Parametro> 
          data={parametrosData} 
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

export default ParametroTable;
