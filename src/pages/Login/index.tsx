import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo1.png';
import './style.css';

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
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();
      console.log("Dados retornados:", data); // Verifique a estrutura do retorno

      if (response.ok) {
        // Armazena o token e ID do usuário no localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuarioId', data.usuarioId);

        // Navegue para a página principal
        navigate('/home');
      } else {
        // Exiba a mensagem de erro
        setErrorMessage(data.erro || 'Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro ao realizar o login:', error);
      setErrorMessage('Erro ao realizar o login. Tente novamente mais tarde.');
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
          <a href="#" className="login-link" onClick={handleLogin}>Cadastre-se</a>
          <span>ou</span>
          <a href="#" className="login-link" onClick={handleLogin}>Continue sem login</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
