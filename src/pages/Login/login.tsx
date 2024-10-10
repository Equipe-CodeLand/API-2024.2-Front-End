import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate
import logo from '../../assets/Logo.png';
import './style.css'; // Importe o arquivo CSS global

const Login: React.FC = () => {
  const [email, setEmail] = useState(''); // Estado para o email
  const [senha, setSenha] = useState(''); // Estado para a senha
  const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro
  const navigate = useNavigate(); // Inicialize o hook useNavigate

  const handleLogin = async () => {
    // Limpe a mensagem de erro antes de fazer a requisição
    setErrorMessage('');

    // Verifique se os campos estão vazios
    if (!email || !senha) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return; // Pare a execução se os campos estiverem vazios
    }

    try {
      // Chama a API de login
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Se o login for bem-sucedido, armazene o token no localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuarioId', data.usuarioId);

        // Navegue para a página principal (ou qualquer outra)
        navigate('/home');
      } else {
        // Exiba a mensagem de erro caso o login falhe
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
          name="userEmail" 
          autoComplete="new-email" 
          className="login-input"
          value={email} // Bind ao estado email
          onChange={(e) => setEmail(e.target.value)} // Atualiza o email
        />
        
        <label className="login-label">Senha:</label>
        <input 
          type="password" 
          placeholder="********" 
          name="userPassword" 
          autoComplete="new-password" 
          className="login-input"
          value={senha} // Bind ao estado senha
          onChange={(e) => setSenha(e.target.value)} // Atualiza a senha
        />
        
        {/* Exibe mensagem de erro, se houver */}
        {errorMessage && <p className="login-error">{errorMessage}</p>}

        <button 
          type="button" 
          className="login-button" 
          onClick={handleLogin} // Chame a função de login
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
