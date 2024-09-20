import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TabelaGenerica from '../../components/tabelaDropdown';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Perfil, Usuario } from '../../interface/usuario';
import './style.css';

const PerfilLabel: { [key in Perfil]: string } = {
  [Perfil.Admin]: 'Administrador',
  [Perfil.Leitor]: 'Leitor'
};

const dropdownContent = (
  usuario: Usuario,
  atualizarUsuario: (usuario: Usuario) => void,
  excluirUsuario: (id: number) => void
) => ({
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
      <p><strong>Tipo:</strong> {usuario.perfil}</p>
      <p><strong>CPF:</strong> {usuario.cpf}</p>
    </div>
  ),
  extra: [
    <>
      <div key="action-button">
        <button className="btn" onClick={() => atualizarUsuario(usuario)}>Editar</button>
      </div>,
      <div key="delete-button">
        <button className="btn" onClick={() => excluirUsuario(usuario.id)}>Excluir</button>
      </div>
    </>
  ]
});

const UsuarioTable: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Estado para armazenar os usuários
  const [loading, setLoading] = useState<boolean>(true); // Estado de loading

  useEffect(() => {
    // Função para buscar usuários do backend
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/usuarios'); // Substitua pela sua URL do backend
        
        // Mapeia os dados recebidos do backend para o formato correto
        const usuariosData = response.data.map((user: Usuario): Usuario => ({
          id: user.id,
          nome: user.nome,
          email: user.email,
          cpf: user.cpf,
          perfil: user.perfil as Perfil // Mapeia o perfil para o enum `Perfil`
        }));

        setUsuarios(usuariosData); // Armazena os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false); // Finaliza o loading após a resposta
      }
    };

    fetchUsuarios();
  }, []);

  const atualizarUsuario = async (usuario: Usuario) => {
    try {
      await axios.put('http://localhost:5000/usuario/atualizar', usuario); // Substitua pela sua URL do backend
      alert('Usuário atualizado com sucesso!');
      setUsuarios(usuarios.map(u => u.id === usuario.id ? usuario : u)); // Atualiza o estado dos usuários
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  const excluirUsuario = async (id: number) => {
    try {
      await axios.delete('http://localhost:5000/usuario/deletar', {
        data: { id } // Passa o ID como parte do payload
      });
      alert('Usuário excluído com sucesso!');
      setUsuarios(usuarios.filter(usuario => usuario.id !== id)); // Remove o usuário da lista
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  // Define a type for the columns that includes the optional renderCell property
  type Column<T> = {
    label: string;
    key: keyof T;
    renderCell?: (value: T[keyof T]) => JSX.Element; // Ajuste para renderizar com base no tipo da chave
  };

  // Colunas que serão exibidas na tabela
  const columns: Array<Column<Usuario>> = [
    { label: 'ID', key: 'id' },
    { label: 'Nome', key: 'nome' },
    { 
      label: 'Tipo', 
      key: 'perfil', 
      renderCell: (value) => {
        const perfil = value as Perfil;
        return <span>{PerfilLabel[perfil] || 'Desconhecido'}</span>;
      } // Renderiza o valor do enum
    }
  ];

  if (loading) {
    return <div>Carregando...</div>; // Mostra uma mensagem enquanto os dados estão sendo carregados
  }

  return (
    <div className="container">
      <Sidebar />
      <div className="title-box">
        <h2 className="title-text">Usuários</h2>
      </div>
      <div className="content">
        <div className="adicionarUsuario">
          <button className="btn">Adicionar usuário</button>
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
              <p><strong>Tipo:</strong> {PerfilLabel[usuario.perfil as Perfil]}</p>
              <p><strong>CPF:</strong> {usuario.cpf}</p>
            </div>
          )}
          dropdownContent={(usuario) => dropdownContent(usuario, atualizarUsuario, excluirUsuario)}
        />
      </div>
    </div>
  );
};

export default UsuarioTable;