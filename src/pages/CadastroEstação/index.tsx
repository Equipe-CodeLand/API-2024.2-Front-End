import React, { useEffect, useState } from 'react';
import { Sidebar } from "../../components/sidebar/sidebar";
import './style.css';
import { formatCep } from '../../utils/formatters';
import { api } from '../../config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import BackArrow from '../../assets/back-arrow.png';

const CadastroEstacao: React.FC = () => {
    const [nome, setNome] = useState('');
    const [uid, setUid] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [selectedParametros, setSelectedParametros] = useState<string[]>([]);
    const [parametroSelecionado, setParametroSelecionado] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const [parametrosOptions, setParametrosOptions] = useState<any[]>([]);

    useEffect(() => {
        const fetchParametros = async () => {
            try {
                const response = await api.get('/parametros');
                setParametrosOptions(response.data);
                console.log(selectedParametros)
            } catch (err) {
                console.log('Erro ao buscar os parâmetros: ' + err);
            }
        };

        fetchParametros();
    }, [selectedParametros]); // Adicionei a dependência selectedParametros para evitar um loop infinito

    const handleSelectParametro = (parametroId: string) => {
        if (!selectedParametros.includes(parametroId)) {
            setSelectedParametros([...selectedParametros, parametroId]);
            setParametroSelecionado('');
        }
    };

    const handleRemoveParametro = (parametroId: string) => {
        setSelectedParametros(selectedParametros.filter(id => id !== parametroId));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors: { [key: string]: string } = {};
        setSuccessMessage('');

        // Validação de campos
        if (!nome) {
            formErrors.nome = 'Nome é obrigatório';
        }
        if (!uid) {
            formErrors.uid = 'Mac Address é obrigatório';
        }
        if (!cep) {
            formErrors.cep = 'CEP é obrigatório';
        }
        if (!rua) {
            formErrors.rua = 'Rua é obrigatória';
        }
        if (!numero) {
            formErrors.numero = 'Número é obrigatório';
        }
        if (!bairro) {
            formErrors.bairro = 'Bairro é obrigatório';
        }
        if (!cidade) {
            formErrors.cidade = 'Cidade é obrigatória';
        }
        if (selectedParametros.length === 0) {
            formErrors.parametros = 'Nenhum parâmetro selecionado';
        }

        setErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
            try {
                const token = localStorage.getItem('token'); // Obtém o token do localStorage
                const response = await api.post("/estacao/cadastro", {
                    nome,
                    uid,
                    cep,
                    rua,
                    numero,
                    bairro,
                    cidade,
                    parametros: selectedParametros
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Adiciona o token ao cabeçalho
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: 'Estação cadastrada com sucesso!'
                    });
                    setNome('');
                    setUid('');
                    setCep('');
                    setRua('');
                    setNumero('');
                    setBairro('');
                    setCidade('');
                    setSelectedParametros([]);
                    setSuccessMessage('Estação cadastrada com sucesso!');
                    navigate('/estacoes');
                }
            } catch (error) {
                console.error('Erro ao cadastrar estação:', error);
                setErrors({ ...errors, form: 'Erro ao cadastrar estação' });
            }
        }
    };

    return (
        <div>
            <Sidebar />
            <div className='container'>
                <div className="title-box">
                    <h2 className="title-text">Cadastro de Estações</h2>
                </div>
                <div className="content">
                    <form className="signin-container" onSubmit={handleSubmit}>
                    <div className="back-button" onClick={() => navigate('/estacoes')}>
                        <img src={BackArrow} alt="voltar" className='back-arrow' />
                        <span>Voltar</span>
                    </div>
                        <div className="signin-item-row">
                            <div className="signin-row">
                                <label htmlFor="nome">Nome:</label>
                                <input
                                    type="text"
                                    id="nome"
                                    placeholder="ex: Estação exemplo"
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

                            <div className="signin-row">
                                <label htmlFor="mac-address">Mac Address (UID):</label>
                                <input
                                    type="text"
                                    id="mac-address"
                                    placeholder="ex: abc123"
                                    name="uid"
                                    className='input-full-size'
                                    value={uid}
                                    onChange={(e) => {
                                        setUid(e.target.value);
                                        setErrors({ ...errors, uid: '' });
                                    }}
                                />
                                {errors.uid && <span className="error">{errors.uid}</span>}
                            </div>
                        </div>

                        <div className="signin-item-row">
                            <div className="signin-row">
                                <label htmlFor="parametros">Parâmetros:</label>
                                <select
                                    id="parametros"
                                    className='input-full-size'
                                    value={parametroSelecionado}
                                    onChange={(e) => {
                                        setParametroSelecionado(e.target.value);
                                        handleSelectParametro(e.target.value);
                                    }}
                                >
                                    <option value="">Selecione um parâmetro</option>
                                    {Array.isArray(parametrosOptions) && parametrosOptions.map((parametro, index) => (
                                        <option
                                            key={index}
                                            value={parametro.id}
                                            disabled={selectedParametros.includes(parametro.id)}
                                        >
                                            {parametro.nome} - {parametro.unidade}
                                        </option>
                                    ))}
                                </select>
                                {errors.parametros && <span className="error">{errors.parametros}</span>}
                            </div>
                            <div className="signin-row">
                                <label htmlFor="cep">Cep:</label>
                                <input
                                    type="text"
                                    id="cep"
                                    placeholder="ex: 12345-678"
                                    name="cep"
                                    className='input-full-size'
                                    value={cep}
                                    maxLength={9}
                                    onChange={(e) => {
                                        setCep(formatCep(e.target.value));
                                        setErrors({ ...errors, cep: '' });
                                    }}
                                />
                                {errors.cep && <span className="error">{errors.cep}</span>}
                            </div>
                        </div>
                        <div >
                            {selectedParametros.length === 0 ? (
                                <p>Nenhum parâmetro selecionado</p>
                            ) : (
                                <div className="parametros-list">
                                    {selectedParametros.map((parametroId) => (
                                        <div key={parametroId} className="selected-parametro">

                                            {parametrosOptions.find(p => p.id === parametroId)?.nome}
                                            <p onClick={() => handleRemoveParametro(parametroId)} className="close">
                                                x
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                        <div className="signin-item-row">
                            <div className="signin-row">
                                <label htmlFor="rua">Rua:</label>
                                <input
                                    type="text"
                                    id="rua"
                                    placeholder="ex: Rua exemplo"
                                    name="rua"
                                    className='input-full-size'
                                    value={rua}
                                    onChange={(e) => {
                                        setRua(e.target.value);
                                        setErrors({ ...errors, rua: '' });
                                    }}
                                />
                                {errors.rua && <span className="error">{errors.rua}</span>}
                            </div>
                            <div className="signin-row">
                                <label htmlFor="numero">Número:</label>
                                <input
                                    type="text"
                                    id="numero"
                                    placeholder="ex: 123"
                                    name="numero"
                                    className='input-full-size'
                                    value={numero}
                                    onChange={(e) => {
                                        setNumero(e.target.value);
                                        setErrors({ ...errors, numero: '' });
                                    }}
                                />
                                {errors.numero && <span className="error">{errors.numero}</span>}
                            </div>
                        </div>

                        <div className="signin-item-row">
                            <div className="signin-row">
                                <label htmlFor="bairro">Bairro:</label>
                                <input
                                    type="text"
                                    id="bairro"
                                    placeholder="ex: Bairro exemplo"
                                    name="bairro"
                                    className='input-full-size'
                                    value={bairro}
                                    onChange={(e) => {
                                        setBairro(e.target.value);
                                        setErrors({ ...errors, bairro: '' });
                                    }}
                                />
                                {errors.bairro && <span className="error">{errors.bairro}</span>}
                            </div>
                            <div className="signin-row">
                                <label htmlFor="cidade">Cidade:</label>
                                <input
                                    type="text"
                                    id="cidade"
                                    placeholder="ex: Cidade exemplo"
                                    name="cidade"
                                    className='input-full-size'
                                    value={cidade}
                                    onChange={(e) => {
                                        setCidade(e.target.value);
                                        setErrors({ ...errors, cidade: '' });
                                    }}
                                />
                                {errors.cidade && <span className="error">{errors.cidade}</span>}
                            </div>
                        </div>

                        <div className="signin-row-submit">
                            <input type="submit" className='btn' value="Cadastrar" />
                        </div>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CadastroEstacao;