import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importe o SweetAlert2
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
  isEditando: boolean,
  usuarioEditado: Usuario | null,
  setUsuarioEditado: (usuario: Usuario | null) => void,
  salvarEdicao: (usuario: Usuario) => void,
  cancelarEdicao: (usuario: Usuario | null) => void, // Certifique-se de que cancelarEdicao está presente
  excluirUsuario: (id: number) => void
) => {
  if (isEditando && usuarioEditado) {
    return {
      idRow: (
        <div className='edicao'>
          <p><strong>ID:</strong> {usuarioEditado.id}</p>
        </div>
      ),
      col1: (
        <div className='edicao'>
          <p><strong>Nome:</strong>
            <input
              type="text"
              value={usuarioEditado.nome}
              onChange={(e) =>
                setUsuarioEditado({ ...usuarioEditado, nome: e.target.value })
              }
            />
          </p>
          <p><strong>Email:</strong>
            <input
              type="email"
              value={usuarioEditado.email}
              onChange={(e) =>
                setUsuarioEditado({ ...usuarioEditado, email: e.target.value })
              }
            />
          </p>
          <p><strong>Senha:</strong>
            <input
              type="text"
              value={usuarioEditado.senha}
              onChange={(e) =>
                setUsuarioEditado({ ...usuarioEditado, senha: e.target.value })
              }
            />
          </p>
        </div>
      ),
      col2: (
        <>
          <div className='edicao'>
            <p><strong>Tipo:</strong> 
              <select
                value={usuarioEditado.perfil}
                onChange={(e) =>
                  setUsuarioEditado({ ...usuarioEditado, perfil: e.target.value as Perfil })
                }
              >
                <option value={Perfil.Admin}>Administrador</option>
                <option value={Perfil.Leitor}>Leitor</option>
              </select>
            </p>
            <p><strong>CPF:</strong>
              <input
                type="text"
                value={usuarioEditado.cpf}
                onChange={(e) =>
                  setUsuarioEditado({ ...usuarioEditado, cpf: e.target.value })
                }
              />
            </p>
          </div>
        </>
      ),
      extra: [
        <>
        <div key="save-button">
          <button className="btn" onClick={() => salvarEdicao(usuarioEditado)}>Salvar</button>
        </div>,
        <div key="cancel-button">
          <button className="btn" onClick={() => cancelarEdicao(null)}>Cancelar</button>
        </div>
        </>
      ]
    };
  } else {
    return {
      idRow: (
        <div>
          <p><strong>ID:</strong> {usuario.id}</p>
        </div>
      ),
      col1: (
        <div>
          <p><strong>Nome:</strong> {usuario.nome}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Senha:</strong> {usuario.senha}</p>
        </div>
      ),
      col2: (
        <div>
          <p><strong>Tipo:</strong> {PerfilLabel[usuario.perfil as Perfil]}</p>
          <p><strong>CPF:</strong> {usuario.cpf}</p>
        </div>
      ),
      extra: [
        <>
        <div key="edit-button">
          <button className="btn" onClick={() => setUsuarioEditado(usuario)}>Editar</button>
        </div>,
        <div key="delete-button">
          <button className="btn" onClick={() => excluirUsuario(usuario.id)}>Excluir</button>
        </div>
        </>
      ]
    };
  }
};

const UsuarioTable: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/usuarios');
        const usuariosData = response.data.map((user: Usuario): Usuario => ({
          id: user.id,
          nome: user.nome,
          email: user.email,
          cpf: user.cpf,
          perfil: user.perfil as Perfil,
          senha: user.senha
        }));

        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const salvarEdicao = async (usuario: Usuario) => {
    try {
      await axios.put('http://localhost:5000/usuario/atualizar', usuario);
      
      // SweetAlert de sucesso
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Usuário atualizado com sucesso!'
      });

      setUsuarios(usuarios.map(u => u.id === usuario.id ? usuario : u));
      setUsuarioEditando(null); // Sai do modo de edição
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  const cancelarEdicao = () => {
    setUsuarioEditando(null); // Sai do modo de edição
  };  

  const excluirUsuario = async (id: number) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete('http://localhost:5000/usuario/deletar', {
            data: { id }
          });

          Swal.fire('Excluído!', 'O usuário foi excluído com sucesso.', 'success');

          setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        } catch (error) {
          console.error("Erro ao excluir usuário:", error);
        }
      }
    });
  };

  type Column<T> = {
    label: string;
    key: keyof T;
    renderCell?: (value: T[keyof T]) => JSX.Element;
  };

  const columns: Array<Column<Usuario>> = [
    { label: 'ID', key: 'id' },
    { label: 'Nome', key: 'nome' },
    {
      label: 'Tipo',
      key: 'perfil',
      renderCell: (value) => {
        const perfil = value as Perfil;
        return <span>{PerfilLabel[perfil] || 'Desconhecido'}</span>;
      }
    }
  ];

  if (loading) {
    return <div>Carregando...</div>;
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
          dropdownContent={(usuario) =>
            dropdownContent(usuario, usuarioEditando?.id === usuario.id, usuarioEditando, setUsuarioEditando, salvarEdicao, cancelarEdicao, excluirUsuario) // Passando cancelarEdicao
          }
        />
      </div>
    </div>
  );
};

export default UsuarioTable;
