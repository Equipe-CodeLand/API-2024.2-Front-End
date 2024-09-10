import React from 'react';
import TabelaGenerica from '../../components/tabelaDropdown'; 
import { Sidebar } from '../../components/sidebar/sidebar';
import { Navbar } from '../../components';
import { Usuario } from '../../interface/usuario';

// Dados de exemplo
const usuarios: Usuario[] = [
  { id: 1, nome: 'Pedro Henrique de Souza', tipo: 'Administrador', status: 'Ativo', email: 'pedro@gmail.com', cpf: '123.456.789/10' },
  { id: 2, nome: 'Letícia Helena', tipo: 'Visualizador', status: 'Inativo', email: 'leticia@gmail.com', cpf: '234.567.890/11' },
];

const UsuarioTable: React.FC = () => {
  // Colunas que serão exibidas na tabela
  const columns: Array<{ label: string; key: keyof Usuario }> = [
    { label: 'ID', key: 'id' },
    { label: 'Nome', key: 'nome' },
    { label: 'Tipo', key: 'tipo' },
    { label: 'Status', key: 'status' },
  ];

  // Função para renderizar os detalhes do usuário
  const renderDetails = (usuario: Usuario) => (
    <div className="usuario-detalhes">
      <p><strong>ID:</strong> {usuario.id}</p>
      <p><strong>Nome:</strong> {usuario.nome}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Tipo:</strong> {usuario.tipo}</p>
      <p><strong>CPF:</strong> {usuario.cpf}</p>
    </div>
  );

  // Função para gerar o conteúdo em duas colunas + o extra no dropdown
  const dropdownContent = (usuario: Usuario) => ({
    idRow: (
      <div>
        <p><strong>ID:</strong> {usuario.id}</p>
      </div>
    ), // o ID e o extra ficam em linhas separadas
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
      // Elemento extra, como um botão
      <div key="action-button">
        <button onClick={() => alert(`Ação realizada para ${usuario.nome}`)}>Ação</button>
      </div>
    ]
  });

  return (
    <div className="container">
      {/* <Navbar /> */}
      <Sidebar /> {/* Adicionar Sidebar */}
      <div style={{ marginLeft: '60px' }}> {/* Adicionar margem à esquerda */}
        <div className="content">
          {/* Tabela genérica que recebe os dados e configurações */}
          <TabelaGenerica<Usuario> 
            data={usuarios} 
            columns={columns} 
            detailExtractor={renderDetails}
            dropdownContent={dropdownContent} 
          />
        </div>
      </div>
    </div>
  );
};

export default UsuarioTable;