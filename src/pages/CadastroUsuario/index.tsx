import React, { useEffect, useState } from 'react';
import { formatCpf, validateCpf, validateEmail } from '../../utils/formatters';
import axios from 'axios';
import './style.css';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Usuario } from '../../interface/usuario';

const CadastroUsuario: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [cargo, setCargo] = useState('visualizador');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const checkExistingEmail = async (email: string) => {
    const response = await axios.get<Usuario[]>(`${import.meta.env.VITE_API_URL}/usuarios`);
    const usuarios = response.data;
    return usuarios.some((usuario) => usuario.email === email);
  };

  const checkExistingCpf = async (cpf: string) => {
    const response = await axios.get<Usuario[]>(`${import.meta.env.VITE_API_URL}/usuarios`);
    const usuarios = response.data;
    return usuarios.some((usuario) => usuario.cpf === cpf);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors: { [key: string]: string } = {};
    setSuccessMessage('');

    // validação do nome
    if (!nome) {
      formErrors.nome = 'Nome é obrigatório';
    }

    // validação de email
    if (!email) {
      formErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(email)) {
      formErrors.email = 'Email inválido';
    } else if (await checkExistingEmail(email)) {
      formErrors.email = 'Email já cadastrado';
    }

    // validação de cpf
    const cpfUnformatted = cpf.replace(/\D/g, '');
    if (!cpf) {
      formErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCpf(cpfUnformatted)) {
      formErrors.cpf = 'CPF inválido';
    } else if (await checkExistingCpf(cpfUnformatted)) {
      formErrors.cpf = 'CPF já cadastrado';
    }

    // validação de senha
    if (!senha) {
      formErrors.senha = 'Senha é obrigatória';
    }

    // confirmar a senha
    if (!confirmarSenha) {
      formErrors.confirmarSenha = 'Confirmação de senha é obrigatória';
    } else if (senha !== confirmarSenha) {
      formErrors.confirmarSenha = 'As senhas não coincidem';
    }

    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/usuario/cadastro`, {
          nome,
          email,
          senha,
          cargo,
          cpf
        });

        if (response.data.success) {
          setSuccessMessage('Cadastro realizado com sucesso!');
          setNome('');
          setEmail('');
          setCpf('');
          setSenha('');
          setConfirmarSenha('');
          setCargo('visualizador');
        } else {
          setErrors({ ...errors, form: response.data.message });
        }
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        setErrors({ ...errors, form: 'Erro ao cadastrar usuário' });
      }
    }
  };

  return (
    <div className='container'>
      <Sidebar />
      <div className="content">
        <div className="title-box">
          <h2 className="title-text">Cadastro de Usuários</h2>
        </div>
        <form className="signin-container" onSubmit={handleSubmit}>
          <div className="signin-item">
            <div className="signin-row">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                className='input-full-size'
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  setErrors({ ...errors, nome: '' });
                }}
              />
              {errors.nome && <span className="error">{errors.nome}</span>}
            </div>
          </div>
          <div className="signin-item-row">
            <div className="signin-row">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                className='input-full-size'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: '' });
                }}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="signin-row">
              <label htmlFor="cpf">CPF:</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                className='input-full-size'
                value={formatCpf(cpf)}
                maxLength={11}
                onChange={(e) => {
                  setCpf(e.target.value);
                  setErrors({ ...errors, cpf: '' });
                }}
              />
              {errors.cpf && <span className="error">{errors.cpf}</span>}
            </div>
          </div>
          <div className="signin-item-row">
            <div className="signin-row">
              <label htmlFor="senha">Digite a nova senha:</label>
              <input
                type="password"
                id="senha"
                name="senha"
                className='input-full-size'
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  setErrors({ ...errors, senha: '' });
                }}
              />
              {errors.senha && <span className="error">{errors.senha}</span>}
            </div>
            <div className="signin-row">
              <label htmlFor="confirm-senha">Confirmar senha:</label>
              <input
                type="password"
                id="confirm-senha"
                name="confirm-senha"
                className='input-full-size'
                value={confirmarSenha}
                onChange={(e) => {
                  setConfirmarSenha(e.target.value);
                  setErrors({ ...errors, confirmarSenha: '' });
                }}
              />
              {errors.confirmarSenha && <span className="error">{errors.confirmarSenha}</span>}
            </div>
          </div>
          <div className="signin-item-row">
            <div className="signin-row">
              <label>Cargo:</label>
              <select
                id="cargo"
                name="cargo"
                title='cargo'
                style={{background: 'white'}}
                className='input-full-size'
                value={cargo}
                onChange={(e) => {
                  setCargo(e.target.value);
                  setErrors({ ...errors, cargo: '' });
                }}
              >
                <option value="visualizador">Visualizador</option>
                <option value="administrador">Administrador</option>
              </select>
              {errors.cargo && <span className="error">{errors.cargo}</span>}

              {errors.cargo && <span className="error">{errors.cargo}</span>}
            </div>
          </div>
          <div className="signin-item-last">
            <div className="signin-row">
              <input type="submit" className='btn' value="Cadastrar" />
            </div>
          </div>
          {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
      </div>
    </div>
  )
}

export default CadastroUsuario;