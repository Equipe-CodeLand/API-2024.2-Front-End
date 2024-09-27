import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/sidebar/sidebar';
import axios from 'axios';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors: { [key: string]: string } = {};

    // Validação dos campos
    if (!nome) formErrors.nome = 'Nome é obrigatório';
    if (!descricao) formErrors.descricao = 'Descrição é obrigatória';
    if (!fator || isNaN(Number(fator))) formErrors.fator = 'Fator é obrigatório e deve ser numérico';
    if (!offset || isNaN(Number(offset))) formErrors.offset = 'Offset é obrigatório e deve ser numérico';
    if (!unidade) formErrors.unidade = 'Unidade é obrigatória';

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/parametro/cadastro`;
        console.log('Enviando dados para:', apiUrl); // Adicione este log
        console.log('Dados:', { nome, descricao, fator, offset, unidade }); // Adicione este log

        const response = await axios.post(apiUrl, {
          nome,
          descricao,
          fator,
          offset,
          unidade
        });

        if (response.data.success) {
          setSuccessMessage('Cadastro realizado com sucesso!');
          // Resetar o formulário após envio bem-sucedido
          setNome('');
          setDescricao('');
          setFator('');
          setOffset('');
          setUnidade('');
        } else {
          setErrors({ form: response.data.message });
        }
      } catch (error) {
        console.error('Erro ao cadastrar parâmetro:', error);
        setErrors({ form: 'Erro ao cadastrar parâmetro' });
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <div className="title-box">
          <h2 className="title-text">Cadastro de Parâmetros</h2>
        </div>
        <form className="signin-container" onSubmit={handleSubmit}>
          <div className="signin-item-row">
            <div className="signin-row">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                className="input-full-size"
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
                className="input-full-size"
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
                className="input-full-size"
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
                className="input-full-size"
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
                className="input-full-size"
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
            <input type="submit" className="btn" value="Cadastrar" />
          </div>

          {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default CadastroParametros;