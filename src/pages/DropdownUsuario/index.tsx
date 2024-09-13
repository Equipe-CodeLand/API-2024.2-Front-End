import React from 'react';
import TabelaGenerica from '../../components/tabelaDropdown'; 
import { Sidebar } from '../../components/sidebar/sidebar';
// import { Navbar } from '../../components';
import { Usuario } from '../../interface/usuario';
import './style.css';

// Dados de exemplo
const usuarios: Usuario[] = [
  { id: 1, nome: 'Pedro Henrique de Souza', tipo: 'Administrador', status: 'Ativo', email: 'pedro@gmail.com', cpf: '123.456.789/10' },
  { id: 2, nome: 'Letícia Helena', tipo: 'Visualizador', status: 'Inativo', email: 'leticia@gmail.com', cpf: '234.567.890/11' },
];

// Função para renderizar o status com bolinha colorida
const renderStatus = (status: string | number) => {
  const statusClasses: { [key: string]: string } = {
    Ativo: 'status-active',
    Inativo: 'status-inactive',
  };

  const statusClass = statusClasses[status as string] || '';

  return (
    <span className='status-container'>
      {status}
      <span className={`status-bullet ${statusClass}`}></span>
    </span>
  );
};

// Função para gerar o conteúdo em duas colunas + o extra no dropdown
const dropdownContent = (usuario: Usuario) => ({
  idRow: (
    <div>
      <p><strong>ID:</strong> {usuario.id}</p>
    </div>
  ),
  col1: (
    <div>
      <p><strong>Nome:</strong> {usuario.nome}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
    </div>
  ),
  col2: (
    <div>
      <p><strong>Tipo:</strong> {usuario.tipo}</p>
      <p><strong>CPF:</strong> {usuario.cpf}</p>
    </div>
  ),
  extra: [
    <div key="action-button">
      <button className='btn' onClick={() => alert(`Ação realizada para ${usuario.nome}`)}>Ação</button>
    </div>
  ]
});

const UsuarioTable: React.FC = () => {
  // Define a type for the columns that includes the optional renderCell property
  type Column<T> = {
    label: string;
    key: keyof T;
    renderCell?: (value: string | number) => JSX.Element;
  };

  // Colunas que serão exibidas na tabela
  const columns: Array<Column<Usuario>> = [
    { label: 'ID', key: 'id' },
    { label: 'Nome', key: 'nome' },
    { label: 'Tipo', key: 'tipo' },
    { 
      label: 'Status', 
      key: 'status',
      renderCell: renderStatus // Passa a função de renderização personalizada
    },
  ];

  return (
    <div className="container">
      <Sidebar />
      <div className="title-box">
        <h2 className='title-text'>Usuários</h2>
      </div>
      <div className="content">
        <div className='adicionarUsuario'>
          <button className='btn'>Adicionar usuário</button>
        </div>
        {/* Tabela genérica que recebe os dados e configurações */}
        <TabelaGenerica<Usuario> 
          data={usuarios} 
          columns={columns} 
          detailExtractor={(usuario) => (
            <div className="usuario-detalhes">
              <p><strong>ID:</strong> {usuario.id}</p>
              <p><strong>Nome:</strong> {usuario.nome}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Tipo:</strong> {usuario.tipo}</p>
              <p><strong>CPF:</strong> {usuario.cpf}</p>
            </div>
          )}
          dropdownContent={dropdownContent} 
        />
      </div>
    </div>
  );
};

export default UsuarioTable;