import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; // Importa o SweetAlert2
import { Sidebar } from "../../components/sidebar/sidebar";
import './style.css';
import {api} from '../../config';
import { useNavigate } from 'react-router-dom';
import { Estacao } from '../../interface/estacao';
import { Parametro } from '../../interface/parametro';

const CadastroAlerta: React.FC = () => {
    // estados referente as estações
    const [estacoes, setEstacoes] = useState<Estacao[]>([]);
    const [estacaoSelecionada, setEstacaoSelecionada] = useState<string>('');
    // estados referentes aos parametros
    const [parametros, setParametros] = useState<Parametro[]>([]);
    const [parametroSelecionado, setParametroSelecionado] = useState<string>('');
    // 
    const [alertaSelecionado, setAlertaSelecionado] = useState('');
    // 
    const [condicaoSelecionada, setCondicaoSelecionada] = useState('');
    // 
    const [mensagem, setMensagem] = useState('');
    const [valor, setValor] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const alertaOptions = [
        { value: 'Atencao', label: 'Atenção' },
        { value: 'Perigo', label: 'Perigo' }
    ];

    const condicaoOptions = [
        { value: '<', label: '<' },
        { value: '>', label: '>' },
        { value: '==', label: '==' },
        { value: '>=', label: '>=' },
        { value: '<=', label: '<=' }
    ];

    // busca as estações na montagem do componente
    useEffect(() => {
        const fetchEstacoes = async () => {
            try {
                const response = await api.get('/estacoes');
                setEstacoes(response.data);
                console.log('get estações:',response.data);
            } catch (err) {
                console.log('Erro ao buscar as estações: ' + err);
            }
        };

        fetchEstacoes();
    }, []);

    // busca os parâmetros quando a estação é selecionada
    useEffect(() => {
        const estacao = estacoes.find((e) => e.id === estacaoSelecionada);
        if (estacao) {
            const parametrosEstacao = estacao.parametros.map(parametro => ({
                id: parametro,
                nome: parametro,
                unidade: '', // Provide appropriate default or fetched values
                fator: 1,    // Provide appropriate default or fetched values
                offset: 0,   // Provide appropriate default or fetched values
                descricao: '' // Provide appropriate default or fetched values
            }));
            setParametros(parametrosEstacao);
            console.log('parametro da estação',parametrosEstacao);
        } else {
            setParametros([]);
        }
    }, [estacaoSelecionada, estacoes]);

    const handleEstacaoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEstacaoSelecionada(event.target.value);
        setParametroSelecionado('');
    };

    const handleParametroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setParametroSelecionado(event.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors: { [key: string]: string } = {};

        // validação dos campos do formulário
        if (!estacaoSelecionada) {
            formErrors.estacao = 'Estação é obrigatória';
        }

        if (!parametroSelecionado) {
            formErrors.parametro = 'Parâmetro é obrigatório';
        }

        if (!alertaSelecionado) {
            formErrors.alerta = 'Tipo de Alerta é obrigatório';
        }

        if (!mensagem) {
            formErrors.mensagem = 'Mensagem é obrigatória';
        }

        if (!condicaoSelecionada) {
            formErrors.condicao = 'Condição é obrigatória';
        }

        if (!valor) {
            formErrors.valor = 'Valor é obrigatório';
        } else if (isNaN(Number(valor))) {
            formErrors.valor = 'Valor deve ser um número válido';
        }

        setErrors(formErrors);

        // se não houver erros, envia os dados para o servidor
        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await api.post("/alerta/cadastro", {
                    estacaoId: estacaoSelecionada,
                    parametroId: parametroSelecionado,
                    mensagemAlerta: mensagem,
                    tipoAlerta: alertaSelecionado.toLowerCase(),
                    condicao: condicaoSelecionada,
                    valor: parseFloat(valor)
                });

                if (response.status === 201) {
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'O alerta foi cadastrado com sucesso!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        navigate('/alertas')
                    });

                    // limpar os campos
                    setEstacaoSelecionada('');
                    setParametroSelecionado('');
                    setAlertaSelecionado('');
                    setMensagem('');
                    setCondicaoSelecionada('');
                    setValor('');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: 'Erro ao cadastrar alerta.',
                        confirmButtonText: 'OK'
                    });
                }
            } catch (error) {
                console.error('Erro ao cadastrar alerta:', error);
            }
        } else {
            console.log('Erros no formulário:', formErrors);
        }
    };

    return (
        <div>
            <Sidebar />
            <div className='container'>
                <div className="title-box">
                    <h2 className="title-text">Cadastro de Alerta</h2>
                </div>
                <div className="content">
                    <form className="signin-container" onSubmit={handleSubmit}>
                        <div className='signin-item-row'>
                            <div className="signin-row">
                                <label htmlFor="estacao">Estação:</label>
                                <select
                                    id="estacao"
                                    className='input-full-size'
                                    value={estacaoSelecionada}
                                    onChange={handleEstacaoChange}
                                >
                                    <option value="">Selecione uma estação</option>
                                    {estacoes.map((estacao, index) => (
                                        <option key={index} value={estacao.id}>
                                            {estacao.nome}
                                        </option>
                                    ))}
                                </select>
                                {errors.estacao && <span className="error">{errors.estacao}</span>}
                            </div>
                        </div>

                        <div className="signin-item">
                            <div className="signin-item-row">
                                <div className="signin-row">
                                    <label htmlFor="parametro">Parâmetro:</label>
                                    <select
                                        id="parametro"
                                        className='input-full-size'
                                        value={parametroSelecionado}
                                        onChange={handleParametroChange}
                                        disabled={!estacaoSelecionada} // desabilitar se nenhuma estação estiver selecionada
                                    >
                                        <option value="">Selecione um parâmetro</option>
                                        {parametros.map((parametro, index) => (
                                            <option key={index} value={parametro.nome}>
                                                {parametro.nome}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.parametro && <span className="error">{errors.parametro}</span>}
                                </div>

                                <div className="signin-row">
                                    <label htmlFor="alerta">Alerta:</label>
                                    <select
                                        id="alerta"
                                        className='input-full-size'
                                        value={alertaSelecionado}
                                        onChange={(e) => setAlertaSelecionado(e.target.value)}
                                    >
                                        <option value="">Selecione um tipo de alerta</option>
                                        {alertaOptions.map((alerta, index) => (
                                            <option key={index} value={alerta.value}>
                                                {alerta.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.alerta && <span className="error">{errors.alerta}</span>}
                                </div>
                            </div>
                        </div>

                        <div className='signin-item-row'>
                            <div className="signin-row">
                                <label htmlFor="mensagem">Mensagem:</label>
                                <input
                                    type="text"
                                    id="mensagem"
                                    className='input-full-size'
                                    value={mensagem}
                                    onChange={(e) => {
                                        setMensagem(e.target.value);
                                        setErrors({ ...errors, mensagem: '' });
                                    }}
                                />
                                {errors.mensagem && <span className="error">{errors.mensagem}</span>}
                            </div>
                        </div>

                        <div className="signin-item">
                            <div className="signin-item-row">
                                <div className="signin-row">
                                    <label htmlFor="condicao">Condição:</label>
                                    <select
                                        id="condicao"
                                        className='input-full-size'
                                        value={condicaoSelecionada}
                                        onChange={(e) => setCondicaoSelecionada(e.target.value)}
                                    >
                                        <option value="">Selecione uma condição</option>
                                        {condicaoOptions.map((condicao, index) => (
                                            <option key={index} value={condicao.value}>
                                                {condicao.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.condicao && <span className="error">{errors.condicao}</span>}
                                </div>

                                <div className="signin-row">
                                    <label htmlFor="valor">Valor:</label>
                                    <input
                                        type="text"
                                        id="valor"
                                        className='input-full-size'
                                        value={valor}
                                        onChange={(e) => {
                                            setValor(e.target.value);
                                            setErrors({ ...errors, valor: '' });
                                        }}
                                    />
                                    {errors.valor && <span className="error">{errors.valor}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="signin-button">
                            <button type="submit" className="btn">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CadastroAlerta;