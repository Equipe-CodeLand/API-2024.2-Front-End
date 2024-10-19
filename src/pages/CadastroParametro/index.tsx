import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/sidebar/sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';
import './style.css';
import { useNavigate } from 'react-router-dom';
import BackArrow from '../../assets/back-arrow.png';

const CadastroParametros: React.FC = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fator, setFator] = useState('');
  const [offset, setOffset] = useState('');
  const [unidade, setUnidade] = useState('');
  const [sigla, setSigla] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage) {
      return () => setSuccessMessage('');
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
    if (!sigla) formErrors.sigla = 'Sigla é obrigatória';

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/parametro/cadastro`;
        console.log('Enviando dados para:', apiUrl); // Adicione este log
        console.log('Dados:', { nome, descricao, fator, offset, unidade, sigla }); // Adicione este log

        // Adicionar o token ao cabeçalho
        const token = localStorage.getItem('token');

        const response = await axios.post(apiUrl, {
          nome,
          descricao,
          fator,
          offset,
          unidade,
          sigla
        }, {
          headers: {
            'Authorization': `Bearer ${token}`, // Aqui está o token
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Parâmetro criado com sucesso!'
          });
          // Resetar o formulário após envio bem-sucedido
          setNome('');
          setDescricao('');
          setFator('');
          setOffset('');
          setUnidade('');
          setSigla('');
          navigate('/parametros');
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
          <div className="back-button" onClick={() => navigate('/parametros')}>
            <img src={BackArrow} alt="voltar" className='back-arrow' />
            <span>Voltar</span>
          </div>
          <div className="signin-item-row">
            <div className="signin-row">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                placeholder="ex: Temperatura"
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
                placeholder="ex: Usado para medir a temperatura média."
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
                placeholder="ex: 12"
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
                placeholder="ex: 0"
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
                placeholder="ex: km/h, %, C°"
                className="input-full-size"
                value={unidade}
                onChange={(e) => {
                  setUnidade(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, unidade: '' }));
                }}
              />
              {errors.unidade && <span className="error">{errors.unidade}</span>}
            </div>
            <div className="signin-row">
              <label htmlFor="unidade">Sigla:</label>
              <input
                type="text"
                id="sigla"
                name="sigla"
                placeholder="ex: umi, tem, plu, vel"
                className="input-full-size"
                value={sigla}
                onChange={(e) => {
                  setSigla(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, sigla: '' }));
                }}
              />
              {errors.sigla && <span className="error">{errors.sigla}</span>}
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