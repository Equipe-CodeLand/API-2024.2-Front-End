import React, { useEffect, useState } from 'react'
import { formatCpf, validateCpf, validateEmail } from '../../utils/formatters';
import './style.css'

const CadastroUsuario: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const handleSubmit = (e: React.FormEvent) => {
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
    }

    // validação de cpf
    if (!cpf) {
      formErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCpf(cpf)) {
      formErrors.cpf = 'CPF inválido';
    }

    // validação de senha
    if (!password) {
      formErrors.password = 'Senha é obrigatória';
    }

    // confirmar a senha
    if (!confirmPassword) {
      formErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (password !== confirmPassword) {
      formErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      console.log('Formulário enviado', { nome, email, cpf, password });
      setSuccessMessage('Cadastro realizado com sucesso!');
      setNome('')
      setEmail('')
      setCpf('')
      setPassword('')
      setConfirmPassword('')
    }
  };

  return (
    <div className='container'>
      <div className="content">
        <div className="title-box">
          <h2 className="title-text">Cadastro</h2>
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
                value={cpf}
                maxLength={14}
                onChange={(e) => {
                  setCpf(formatCpf(e.target.value));
                  setErrors({ ...errors, cpf: '' });
                }}
              />
              {errors.cpf && <span className="error">{errors.cpf}</span>}
            </div>
          </div>
          <div className="signin-item-row">
            <div className="signin-row">
              <label htmlFor="password">Digite a nova senha:</label>
              <input
                type="password"
                id="password"
                name="password"
                className='input-full-size'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: '' });
                }}
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="signin-row">
              <label htmlFor="confirm-password">Confirmar senha:</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                className='input-full-size'
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({ ...errors, confirmPassword: '' });
                }}
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
          </div>
          <div className="signin-item last">
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

export default CadastroUsuario