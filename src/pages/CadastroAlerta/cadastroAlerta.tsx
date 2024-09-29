import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; // Importa o SweetAlert2
import { Sidebar } from "../../components/sidebar/sidebar";
import './style.css';
import api from '../../config';

const CadastroAlerta: React.FC = () => {
    const [estacaoSelecionada, setEstacaoSelecionada] = useState<number>(0);
    const [parametroSelecionado, setParametroSelecionado] = useState<number>(0);
    const [alertaSelecionado, setAlertaSelecionado] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [condicaoSelecionada, setCondicaoSelecionada] = useState('');
    const [valor, setValor] = useState<string>('');
    const [estacoesOptions, setEstacoesOptions] = useState<any[]>([]);
    const [parametrosOptions, setParametrosOptions] = useState<any[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
                const response = await api.get('/estacao');
                setEstacoesOptions(response.data);
            } catch (err) {
                console.log('Erro ao buscar as estações: ' + err);
            }
        };

        fetchEstacoes();
    }, []);

    // busca os parâmetros quando a estação é selecionada
    useEffect(() => {
        const fetchParametros = async () => {
            try {
                if (estacaoSelecionada !== 0) {
                    const response = await api.get(`/parametro/estacao/${estacaoSelecionada}`);
                    console.log(response.data, 'parametros');
                    setParametrosOptions(response.data);
                }
            } catch (err) {
                console.log('Erro ao buscar os parâmetros: ' + err);
            }
        };

        fetchParametros();
    }, [estacaoSelecionada]);

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

                if (response.data.success) {
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'O alerta foi cadastrado com sucesso!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        window.location.href = '/alertas';
                    });

                    // limpar os campos
                    setEstacaoSelecionada(0);
                    setParametroSelecionado(0);
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
                                    onChange={(e) => {
                                        setEstacaoSelecionada(parseInt(e.target.value));
                                        setParametroSelecionado(0);
                                    }}
                                >
                                    <option value="">Selecione uma estação</option>
                                    {estacoesOptions.map((estacao, index) => (
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
                                        onChange={(e) => setParametroSelecionado(parseInt(e.target.value))}
                                        disabled={estacaoSelecionada === 0} // desabilitar se nenhuma estação estiver selecionada
                                    >
                                        <option value="">Selecione um parâmetro</option>
                                        {parametrosOptions.map((parametro, index) => (
                                            <option key={index} value={parametro.id}>
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