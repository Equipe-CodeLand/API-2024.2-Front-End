import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate
import logo from '../../assets/Logo1.png';
import './style.css'; // Importe o arquivo CSS global

const Login: React.FC = () => {
  const navigate = useNavigate(); // Inicialize o hook useNavigate

  const handleNavigation = () => {
    navigate('/home'); // Navegue para a rota /home
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
        />
        
        <label className="login-label">Senha:</label>
        <input 
          type="password" 
          placeholder="********" 
          name="userPassword" 
          autoComplete="new-password" 
          className="login-input"
        />
        
        <button 
          type="button" 
          className="login-button" 
          onClick={handleNavigation} // Chame a função para navegar
        >
          Entrar
        </button>
        
        <div className="login-links">
          <a href="#" className="login-link" onClick={handleNavigation}>Cadastre-se</a>
          <span>ou</span>
          <a href="#" className="login-link" onClick={handleNavigation}>Continue sem login</a>
        </div>
      </form>
    </div>
  );
}

export default Login;