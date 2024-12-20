import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importe o SweetAlert2
import TabelaGenerica from '../../components/tabelaDropdown';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Perfil, Usuario } from '../../interface/usuario';
import { Link } from 'react-router-dom'; // Importar o componente Link
import './style.css';
import { formatCpf } from '../../utils/formatters';
import { api } from '../../config';
import { isUserAdmin } from '../Login/privateRoutes';

const PerfilLabel: { [key in Perfil]: string } = {
  [Perfil.Admin]: 'Administrador',
  [Perfil.Leitor]: 'Leitor'
};

const UsuarioTable: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dropdownContent = (
    usuario: Usuario,
    isEditando: boolean,
    usuarioEditado: Usuario | null,
    setUsuarioEditado: (usuario: Usuario | null) => void,
    salvarEdicao: (usuario: Usuario) => void,
    cancelarEdicao: (usuario: Usuario | null) => void,
    excluirUsuario: (id: number) => void
  ) => {
    if (isEditando && usuarioEditado) {
      return {
        idRow: (
          <div className='edicao'>
            <p style={{ color: 'var(--main-purple)' }}><strong>ID:</strong> {usuarioEditado.id}</p>
          </div>
        ),
        col1: (
          <div className='edicao'>
            <p><strong style={{ color: 'var(--main-purple)' }}>Nome:</strong></p>
            <p>
              <input
                type="text"
                value={usuarioEditado.nome}
                onChange={(e) => {
                  setUsuarioEditado({ ...usuarioEditado, nome: e.target.value });
                  setErrors((prevErrors) => ({ ...prevErrors, nome: '' }));
                }
                }
              />
              {errors.nome && <span className="error">{errors.nome}</span>}
            </p>
            <p><strong style={{ color: 'var(--main-purple)' }}>Email:</strong></p>
            <p>
              <input
                type="email"
                value={usuarioEditado.email}
                onChange={(e) => {
                  setUsuarioEditado({ ...usuarioEditado, email: e.target.value })
                  setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
                }
                }
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </p>
            <p><strong style={{ color: 'var(--main-purple)' }}>Senha:</strong></p>
            <p>
              <input
                type="text"
                value={usuarioEditado.senha}
                onChange={(e) => {
                  setUsuarioEditado({ ...usuarioEditado, senha: e.target.value })
                  setErrors((prevErrors) => ({ ...prevErrors, senha: '' }));
                }
                }
              />
              {errors.senha && <span className="error">{errors.senha}</span>}
            </p>
          </div>
        ),
        col2: (
          <div className='edicao'>
            <p><strong style={{ color: 'var(--main-purple)' }}>Tipo:</strong></p>
            <p>
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
            <p><strong style={{ color: 'var(--main-purple)' }}>CPF:</strong></p>
            <p>
              <input
                type="text"
                value={formatCpf(usuarioEditado.cpf)}
                maxLength={11}
                onChange={(e) => {
                  setUsuarioEditado({ ...usuarioEditado, cpf: e.target.value });
                  setErrors((prevErrors) => ({ ...prevErrors, cpf: '' }));
                }}
                onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, cpf: '' }))} // Limpa o erro no foco
              />
              {errors.cpf && <span className="error">{errors.cpf}</span>}
            </p>
            <p>
              <div style={{ background: 'white', padding: '1.25rem' }} />
            </p>
            <p>
              <div style={{ background: 'white', padding: 'var(--pd-3)' }} />
            </p>
          </div>
        ),
        extra: isUserAdmin() ? [
          <div className='botoes'>
            <div key="save-button">
              <button className="btn" onClick={() => salvarEdicao(usuarioEditado)}>Salvar</button>
            </div>
            <div key="cancel-button">
              <button className="btn" onClick={() => cancelarEdicao(null)}>Cancelar</button>
            </div>
          </div>
        ] : undefined
      }
    } else {
      return {
        idRow: (
          <div>
            <p style={{ color: 'var(--main-purple)' }}><strong>ID:</strong> {usuario.id}</p>
          </div>
        ),
        col1: (
          <div className='listagem'>
            <p><strong style={{ color: 'var(--main-purple)' }}>Nome:</strong></p>
            <p>{usuario.nome}</p>
            <p><strong style={{ color: 'var(--main-purple)' }}>Email:</strong></p>
            <p>{usuario.email}</p>
            <p><strong style={{ color: 'var(--main-purple)' }}>Senha:</strong></p>
            <p>{usuario.senha ? '*'.repeat(usuario.senha.length) : 'Senha não definida'}</p>
          </div>
        ),
        col2: (
          <div className='listagem'>
            <p><strong style={{ color: 'var(--main-purple)' }}>Tipo:</strong></p>
            <p>{PerfilLabel[usuario.perfil as Perfil]}</p>
            <p><strong style={{ color: 'var(--main-purple)' }}>CPF:</strong></p>
            <p>{formatCpf(usuario.cpf)}</p>
            <p>
              <div style={{ background: 'white', padding: '2rem' }} />
            </p>
          </div>
        ),
        extra: isUserAdmin() ? [
          <>
            <div className='botoes'>
              <div key="edit-button">
                <button className="btn" onClick={() => setUsuarioEditado(usuario)}>Editar</button>
              </div>
              <div key="delete-button">
                <button className="btn" onClick={() => excluirUsuario(usuario.id)}>Excluir</button>
              </div>
            </div>
          </>
        ] : undefined
      };
    }
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/usuarios`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adiciona o token de autenticação
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar usuários');
        }

        const usuariosData = await response.json();

        setUsuarios(usuariosData.map((user: Usuario): Usuario => ({
          id: user.id,
          nome: user.nome,
          email: user.email,
          cpf: user.cpf,
          perfil: user.perfil as Perfil,
          senha: user.senha
        })));
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);


  const salvarEdicao = async (usuario: Usuario) => {
    setErrors({});

    let hasErrors = false;

    // Validação dos campos
    if (!usuario.nome) {
      setErrors((prev) => ({ ...prev, nome: 'Nome é obrigatório.' }));
      hasErrors = true;
    }
    if (!usuario.email) {
      setErrors((prev) => ({ ...prev, email: 'Email é obrigatório.' }));
      hasErrors = true;
    }
    if (!usuario.senha) {
      setErrors((prev) => ({ ...prev, senha: 'Senha é obrigatória.' }));
      hasErrors = true;
    }
    if (!usuario.cpf) {
      setErrors((prev) => ({ ...prev, cpf: 'CPF é obrigatório.' }));
      hasErrors = true;
    }

    if (hasErrors) return;

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/usuario/atualizar`, usuario, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Adiciona o token aqui
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Usuário atualizado com sucesso!',
      });

      setUsuarios(usuarios.map(u => u.id === usuario.id ? usuario : u));
      setUsuarioEditando(null);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      Swal.fire('Erro!', 'Não foi possível atualizar o usuário.', 'error');
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
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, excluir!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`${process.env.REACT_APP_API_URL}/usuario/deletar`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` // Adiciona o token aqui
            },
            data: { id }
          });

          Swal.fire('Excluído!', 'O usuário foi excluído com sucesso.', 'success');

          setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        } catch (error) {
          console.error("Erro ao excluir usuário:", error);
          Swal.fire('Erro!', 'Não foi possível excluir o usuário.', 'error');
        }
      }
    });
  }

  type Column<T> = {
    label: string;
    key: keyof T;
    renderCell?: (value: T[keyof T]) => JSX.Element;
  };

  const columns: Array<Column<Usuario>> = [
    { label: 'CPF', key: 'cpf' },
    { label: 'Nome', key: 'nome' },
    {
      label: 'Tipo',
      key: 'perfil',
      renderCell: (value) => {
        const perfil = value as Perfil;
        return (
          <span>
            {PerfilLabel[perfil] || 'Desconhecido'}
          </span>
        );
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
        <div className='adicionarUsuario'>
          <Link to="/usuario/cadastro" className='btn'>Adicionar usuário</Link>
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