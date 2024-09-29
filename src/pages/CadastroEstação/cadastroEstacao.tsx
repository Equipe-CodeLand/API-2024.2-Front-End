import React, { useEffect, useState } from 'react';
import { Sidebar } from "../../components/sidebar/sidebar";
import './style.css';
import { formatCep } from '../../utils/formatters';
import api from '../../config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CadastroEstacao: React.FC = () => {
    const [nome, setNome] = useState('');
    const [uid, setUid] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [selectedParametros, setSelectedParametros] = useState<any[]>([]);
    const [parametroSelecionado, setParametroSelecionado] = useState<number>(0);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate()

    const [parametrosOptions, setParametrosOptions] = useState<any[]>([])

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrors({});
        }, 2000);

        return () => clearTimeout(timer);
    }, [errors]);

    useEffect(() => {
        const fetchParametros = async () => {
            try {
                const response = await api.get('/parametros');
                setParametrosOptions(response.data.parametros);
            } catch (err) {
                console.log('Erro ao buscar as estações' + err);
            }
        };

        fetchParametros();
    }, []);

    const handleSelectParametro = (parametroId: number) => {

        if (!selectedParametros.includes(parametroId)) {
            setSelectedParametros([...selectedParametros, parametroId]);
            setParametroSelecionado(0);
        }
    };


    const handleRemoveParametro = (parametroId: number) => {
        // Remove o parâmetro selecionado pelo ID
        setSelectedParametros(selectedParametros.filter(id => id !== parametroId));
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors: { [key: string]: string } = {};
        setSuccessMessage('');

        // validação do nome
        if (!nome) {
            formErrors.nome = 'Nome é obrigatório';
        }

        // validação de Mac Address
        if (!uid) {
            formErrors.uid = 'Mac Address é obrigatório';
        }

        // validação de CEP
        if (!cep) {
            formErrors.cep = 'CEP é obrigatório';
        }

        // validação de rua
        if (!rua) {
            formErrors.rua = 'Rua é obrigatória';
        }

        // validação de número
        if (!numero) {
            formErrors.numero = 'Número é obrigatório';
        }

        // validação de bairro
        if (!bairro) {
            formErrors.bairro = 'Bairro é obrigatório';
        }

        // validação de cidade
        if (!cidade) {
            formErrors.cidade = 'Cidade é obrigatória';
        }

        // Validação de parâmetros
        if (selectedParametros.length === 0) {
            formErrors.parametros = 'Nenhum parâmetro selecionado';
        }

        setErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
            // adicionar aqui a rota para o cadastro, igual foi feito no cadastro de usuario
            try {
                const response = await api.post("/estacao/cadastro",
                    {
                        nome,
                        uid,
                        cep,
                        rua,
                        numero,
                        bairro,
                        cidade,
                        parametros: selectedParametros
                    })

                if (response.data.success) {

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
                    navigate('/estacoes')
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
                                        setParametroSelecionado(parseInt(e.target.value));
                                        handleSelectParametro(parseInt(e.target.value));
                                    }}
                                >
                                    <option value="">Selecione um parâmetro</option>
                                    {parametrosOptions.map((parametro, index) => (
                                        <option
                                            key={index}
                                            value={parametro.id}
                                            disabled={selectedParametros.includes(parametro)}
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
                                    name="cep"
                                    className='input-full-size'
                                    value={formatCep(cep)}
                                    maxLength={8}
                                    onChange={(e) => {
                                        setCep(e.target.value);
                                        setErrors({ ...errors, cep: '' });
                                    }}
                                />
                                {errors.cep && <span className="error">{errors.cep}</span>}
                            </div>
                        </div>

                        {selectedParametros.length > 0 ? (
                            <div className="parametros-list">
                                {selectedParametros.map((parametroId) => {
                                    // Busca o objeto completo com base no ID
                                    const parametro = parametrosOptions.find(p => p.id === parametroId);
                                    return (
                                        <div key={parametroId} className="selected-parametro">
                                            {parametro?.nome}
                                            <p onClick={() => handleRemoveParametro(parametroId)} className="close"> x </p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <></>
                        )}

                        <div className="signin-item-row">
                            <div className="signin-row">
                                <label htmlFor="rua">Rua:</label>
                                <input
                                    type="text"
                                    id="rua"
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

                        <div className="signin-item">
                            <div className="signin-item-row">
                                <div className="signin-row">
                                    <label htmlFor="bairro">Bairro:</label>
                                    <input
                                        type="text"
                                        id="bairro"
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
};

export default CadastroEstacao;
