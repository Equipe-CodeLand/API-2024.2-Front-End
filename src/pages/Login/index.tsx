import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo1.png';
import './style.css';
import { api } from '../../config';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage('');

    if (!email || !senha) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await api.post('/login', { email, senha });

      const data = response.data;
      console.log("Dados retornados:", data); // Verifique a estrutura do retorno

      if (response.status === 200) {
        // Armazena o token e ID do usuário no localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuarioId', data.usuarioId);

        // Navegue para a página principal
        navigate('/home');
      } else {
        // Exiba a mensagem de erro
        setErrorMessage('Email ou senha inválidos.');
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="logo" className="login-logo" />
      <form className="login-form">
        <label className="login-label">Login:</label>
        <input
          type="email"
          placeholder="exemplo@email.com"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="login-label">Senha:</label>
        <input
          type="password"
          placeholder="********"
          className="login-input"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {errorMessage && <p className="login-error">{errorMessage}</p>}

        <button
          type="button"
          className="login-button"
          onClick={handleLogin}
        >
          Entrar
        </button>

        <div className="login-links">
          <a href="/usuario/cadastro" className="login-link" onClick={handleLogin}>Cadastre-se</a>
          <span>ou</span>
          <a href="/home" className="login-link" onClick={handleLogin}>Continue sem login</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
