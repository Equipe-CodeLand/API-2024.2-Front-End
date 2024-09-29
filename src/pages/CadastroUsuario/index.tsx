import React, { useEffect, useState } from 'react';
import { formatCpf, validateCpf, validateEmail } from '../../utils/formatters';
import axios from 'axios';
import './style.css';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Usuario } from '../../interface/usuario';
import Swal from 'sweetalert2';

const CadastroUsuario: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [perfil, setPerfil] = useState('');
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
    try {
      const response = await axios.get<Usuario[]>(`${import.meta.env.VITE_API_URL}/usuarios`);
      const usuarios = response.data;
      return usuarios.some((usuario) => usuario.email === email);
    } catch (error) {
      console.error('Erro ao verificar email existente:', error);
      return false;
    }
  };

  const checkExistingCpf = async (cpf: string) => {
    try {
      const response = await axios.get<Usuario[]>(`${import.meta.env.VITE_API_URL}/usuarios`);
      const usuarios = response.data;
      return usuarios.some((usuario) => usuario.cpf === cpf);
    } catch (error) {
      console.error('Erro ao verificar CPF existente:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors: { [key: string]: string } = {};
    setSuccessMessage('');

    if (!nome) formErrors.nome = 'Nome é obrigatório';
    if (!email) {
      formErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(email)) {
      formErrors.email = 'Email inválido';
    } else if (await checkExistingEmail(email)) {
      formErrors.email = 'Email já cadastrado';
    }

    const cpfUnformatted = cpf.replace(/\D/g, '');
    if (!cpf) {
      formErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCpf(cpfUnformatted)) {
      formErrors.cpf = 'CPF inválido';
    } else if (await checkExistingCpf(cpfUnformatted)) {
      formErrors.cpf = 'CPF já cadastrado';
    }

    if (!senha) formErrors.senha = 'Senha é obrigatória';
    if (!confirmarSenha) {
      formErrors.confirmarSenha = 'Confirmação de senha é obrigatória';
    } else if (senha !== confirmarSenha) {
      formErrors.confirmarSenha = 'As senhas não coincidem';
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/usuario/cadastro`;
        console.log('Enviando dados para:', apiUrl);
        console.log('Dados:', { nome, email, senha, perfil, cpf: cpfUnformatted });

        const response = await axios.post(apiUrl, {
          nome,
          email,
          cpf: cpfUnformatted,
          senha,
          perfil
        });

        if (response.data.success) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Usuário cadastrado com sucesso',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          setNome('');
          setEmail('');
          setCpf('');
          setSenha('');
          setConfirmarSenha('');
          setPerfil('');
        } else {
          setErrors({ form: response.data.message });
        }
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        setErrors({ form: 'Erro ao cadastrar usuário' });
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
          <div className="signin-item-row">
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
                  setErrors((prevErrors) => ({ ...prevErrors, nome: '' }));
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
                  setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
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
                  setErrors((prevErrors) => ({ ...prevErrors, cpf: '' }));
                }}
              />
              {errors.cpf && <span className="error">{errors.cpf}</span>}
            </div>
          </div>
          <div className="signin-item-row">
            <div className="signin-row">
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                id="senha"
                name="senha"
                className='input-full-size'
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, senha: '' }));
                }}
              />
              {errors.senha && <span className="error">{errors.senha}</span>}
            </div>
            <div className="signin-row">
              <label htmlFor="confirmarSenha">Confirmar senha:</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                className='input-full-size'
                value={confirmarSenha}
                onChange={(e) => {
                  setConfirmarSenha(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, confirmarSenha: '' }));
                }}
              />
              {errors.confirmarSenha && <span className="error">{errors.confirmarSenha}</span>}
            </div>
          </div>
          <div className="signin-item-row">
            <div className="signin-row">
              <label htmlFor="perfil">Perfil:</label>
              <select
                id="perfil"
                name="perfil"
                className='input-full-size'
                value={perfil}
                onChange={(e) => {
                  setPerfil(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, perfil: '' }));
                }}
              >
                <option value="">Selecione um perfil</option>
                <option value="Leitor">Leitor</option>
                <option value="Administrador">Administrador</option>
              </select>
              {errors.perfil && <span className="error">{errors.perfil}</span>}
            </div>
          </div>
          <div className="signin-row-submit">
            <input type="submit" className='btn' value="Cadastrar" />
          </div>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errors.form && <div className="error-message">{errors.form}</div>}
        </form>
      </div>
    </div>
  );
};

export default CadastroUsuario;