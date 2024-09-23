import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/sidebar/sidebar';
import './style.css';

const CadastroParametros: React.FC = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fator, setFator] = useState('');
  const [offset, setOffset] = useState('');
  const [unidade, setUnidade] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

    // Validação do nome
    if (!nome) {
      formErrors.nome = 'Nome é obrigatório';
    }

    // Validação da descrição
    if (!descricao) {
      formErrors.descricao = 'Descrição é obrigatória';
    }

    // Validação do fator
    if (!fator || isNaN(Number(fator))) {
      formErrors.fator = 'Fator é obrigatório';
    }

    // Validação do offset
    if (!offset || isNaN(Number(offset))) {
      formErrors.offset = 'Offset é obrigatório';
    }

    // Validação da unidade
    if (!unidade) {
      formErrors.unidade = 'Unidade é obrigatória';
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Aqui você pode enviar os dados para o servidor
      console.log('Formulário enviado com sucesso:', { nome, descricao, fator, offset, unidade });
      setSuccessMessage('Cadastro realizado com sucesso!');
      // Resetar o formulário após envio bem-sucedido (opcional)
      setNome('');
      setDescricao('');
      setFator('');
      setOffset('');
      setUnidade('');
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div>
        <div className="title-box">
          <h2 className="title-text">Cadastro de Parâmetros</h2>
        </div>
        <div className="content">
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
                <label htmlFor="descricao">Descrição:</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  className='input-full-size'
                  value={descricao}
                  onChange={(e) => {
                    setDescricao(e.target.value);
                    setErrors((prevErrors) => ({ ...prevErrors, descricao: '' }));
                  }}
                />
                {errors.descricao && <span className="error">{errors.descricao}</span>}
              </div>
            </div>

            <div className="signin-item-row">
              <div className="signin-row">
                <label htmlFor="fator">Fator:</label>
                <input
                  type="text"
                  id="fator"
                  name="fator"
                  className='input-full-size'
                  value={fator}
                  onChange={(e) => {
                    setFator(e.target.value);
                    setErrors((prevErrors) => ({ ...prevErrors, fator: '' }));
                  }}
                />
                {errors.fator && <span className="error">{errors.fator}</span>}
              </div>
              <div className="signin-row">
                <label htmlFor="offset">Offset:</label>
                <input
                  type="text"
                  id="offset"
                  name="offset"
                  className='input-full-size'
                  value={offset}
                  onChange={(e) => {
                    setOffset(e.target.value);
                    setErrors((prevErrors) => ({ ...prevErrors, offset: '' }));
                  }}
                />
                {errors.offset && <span className="error">{errors.offset}</span>}
              </div>
              <div className="signin-row">
                <label htmlFor="unidade">Unidade:</label>
                <input
                  type="text"
                  id="unidade"
                  name="unidade"
                  className='input-full-size'
                  value={unidade}
                  onChange={(e) => {
                    setUnidade(e.target.value);
                    setErrors((prevErrors) => ({ ...prevErrors, unidade: '' }));
                  }}
                />
                {errors.unidade && <span className="error">{errors.unidade}</span>}
              </div>
            </div>
            <div className="signin-row-submit">
              <input type="submit" className='btn' value="Cadastrar" />
            </div>
            {successMessage && <div className="success-message">{successMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroParametros;
