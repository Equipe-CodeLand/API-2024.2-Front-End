import React, { useEffect, useState } from 'react';
import TabelaGenerica from '../../components/tabelaDropdown';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Link } from 'react-router-dom';
import "../DropdownUsuario/style.css"
import "./style.css"
import api from '../../config';
import "../../components/tabelaDropdown/style.css"
import Swal from 'sweetalert2';
import axios from 'axios';

interface Estacao {
    id: number;
    nome: string;
    uid: string;
    cep: string;
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
    parametros: any[]; // Corrigido: use any[] para o tipo de parâmetro
    status: string;
}

export const DropdownEstacao: React.FC = () => {
    const [estacoes, setEstacoes] = useState<Estacao[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [estacaoEditando, setEstacaoEditando] = useState<Estacao | null>(null);
    const [selectedParametros, setSelectedParametros] = useState<number[]>([]);
    const [parametroSelecionado, setParametroSelecionado] = useState<number>(0);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [parametrosOptions, setParametrosOptions] = useState<any[]>([])

    // Função para renderizar o status com bolinha colorida
    const renderStatus = (value: string | number | any[]) => {
        const status = typeof value === 'string' ? value : String(value);

        const statusClasses: { [key: string]: string } = {
            'Ok': 'status-active',
            'Alerta': 'status-inactive',
        };

        const statusClass = statusClasses[status] || '';

        return (
            <span className='status-container'>
                {status}
                <span className={`status-bullet ${statusClass}`}></span>
            </span>
        );
    };


    const excluirEstacao = async (id: number) => {
        Swal.fire({
            title: 'Tem certeza?',
            text: 'Esta ação não pode ser desfeita!',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim, excluir!',
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/estacao/deletar/${id}`); // Passa o ID na URL

                    Swal.fire('Excluído!', 'A estação foi excluída com sucesso.', 'success');

                    setEstacoes(estacoes.filter(estacao => estacao.id !== id));
                } catch (error) {
                    console.error("Erro ao excluir estação:", error);
                }
            }
        });
    };


    // Corrigido: salvarEdicao agora usa selectedParametros
    const salvarEdicao = async (estacao: Estacao) => {
        try {
            // Validação dos campos
            let hasErrors = false;
            const newErrors: { [key: string]: string } = {};

            if (!estacao.nome) {
                newErrors.nome = "Nome é obrigatório";
                hasErrors = true;
            }

            if (!estacao.uid) {
                newErrors.uid = "MAC é obrigatório";
                hasErrors = true;
            }

            if (!estacao.cep) {
                newErrors.cep = "CEP é obrigatório";
                hasErrors = true;
            }

            if (!estacao.rua) {
                newErrors.rua = "Rua é obrigatória";
                hasErrors = true;
            }

            if (!estacao.numero) {
                newErrors.numero = "Número é obrigatório";
                hasErrors = true;
            }

            if (!estacao.bairro) {
                newErrors.bairro = "Bairro é obrigatório";
                hasErrors = true;
            }

            if (!estacao.cidade) {
                newErrors.cidade = "Cidade é obrigatória";
                hasErrors = true;
            }

            if (selectedParametros.length === 0) {
                newErrors.parametros = "Selecione pelo menos um parâmetro";
                hasErrors = true;
            }

            if (hasErrors) {
                setErrors(newErrors);
                return;
            }

            // Extrai os IDs dos parâmetros selecionados
            const parametrosIds = selectedParametros;

            // Atualiza a estação com os IDs dos parâmetros
            const updatedEstacao = { ...estacao, parametros: parametrosIds };

            await api.put(`/estacao/atualizar/${estacao.id}`, updatedEstacao);

            // Aqui, vamos buscar os objetos completos dos parâmetros novamente
            const parametrosCompletos = parametrosOptions.filter(p => parametrosIds.includes(p.id));

            // Atualiza o estado da estação editada com os objetos completos dos parâmetros
            const estacaoComParametrosCompletos = { ...updatedEstacao, parametros: parametrosCompletos };

            setEstacoes(estacoes.map(e => e.id === estacao.id ? estacaoComParametrosCompletos : e));
            setEstacaoEditando(null);
            setSelectedParametros([]); // Limpa a seleção de parâmetros
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Estação atualizada com sucesso!'
            });
        } catch (error) {
            console.error("Erro ao atualizar estação e parâmetros:", error);

            Swal.fire({
                icon: 'error',
                title: 'Oooops...',
                text: 'Algo deu errado! Tente novamente mais tarde.'
            });
        }
    };

    const cancelarEdicao = () => {
        setEstacaoEditando(null);
        setSelectedParametros([]); // Limpa a seleção de parâmetros
    };

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

    // Corrigido: handleSelectParametro agora usa selectedParametros
    const handleSelectParametro = (parametroId: number) => {
        if (!selectedParametros.includes(parametroId)) {
            setSelectedParametros([...selectedParametros, parametroId]);
            setParametroSelecionado(0);
        }
    };

    const handleRemoveParametro = (parametroId: number) => {
        setSelectedParametros(selectedParametros.filter(id => id !== parametroId));
    };

    const dropdownContent = (estacao: Estacao) => {
        if (estacaoEditando?.id === estacao.id) {
            return {
                idRow: (
                    <div>
                        <p style={{ color: 'var(--main-purple)' }}><strong>ID:</strong> {estacao.id}</p>
                    </div>

                ),
                col1: (
                    <div>
                        <p><strong style={{ color: 'var(--main-purple)' }}>MAC:</strong></p>
                        <p>
                            <input
                                className="input-edicao"
                                type="text"
                                value={estacaoEditando.uid}
                                onChange={(e) => setEstacaoEditando({ ...estacaoEditando, uid: e.target.value })}
                            />
                            {errors.uid && <span className="error">{errors.uid}</span>}
                        </p>
                        <p><strong style={{ color: 'var(--main-purple)' }}>Nome:</strong></p>
                        <input
                            className="input-edicao"
                            type="text"
                            value={estacaoEditando.nome}
                            onChange={(e) => setEstacaoEditando({ ...estacaoEditando, nome: e.target.value })}
                        />
                        {errors.nome && <span className="error">{errors.nome}</span>}
                        <p><strong style={{ color: 'var(--main-purple)' }}>CEP:</strong></p>
                        <input
                            className="input-edicao"
                            type="text"
                            value={estacaoEditando.cep}
                            onChange={(e) => setEstacaoEditando({ ...estacaoEditando, cep: e.target.value })}
                        />
                        {errors.cep && <span className="error">{errors.cep}</span>}
                        <div className="signin-row">
                            <label htmlFor="parametros" >Parâmetros:</label>
                            <select
                                id="parametros"
                                className="input-full-size"
                                value={parametroSelecionado}
                                onChange={(e) => {
                                    setParametroSelecionado(parseInt(e.target.value));
                                    handleSelectParametro(parseInt(e.target.value));
                                }}
                            >
                                <option value="">Selecione um parâmetro</option>
                                {parametrosOptions.map((parametro) => (
                                    <option
                                        key={parametro.id}
                                        value={parametro.id}
                                        disabled={selectedParametros.includes(parametro.id)}
                                    >
                                        {parametro.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.parametros && <span className="error">{errors.parametros}</span>}
                        </div>

                        {/* Renderização dos parâmetros selecionados, tanto já cadastrados quanto novos */}
                        {selectedParametros.length > 0 ? (
                            <div className="parametros">
                                {selectedParametros.map((parametroId) => {
                                    const parametro = parametrosOptions.find(p => p.id === parametroId);
                                    return (
                                        <div key={parametroId} className="selected-parametro">
                                            {parametro?.nome} - {parametro?.unidade}
                                            <p onClick={() => handleRemoveParametro(parametroId)} className="close"> x </p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>

                ),
                col2: (
                    <div>
                        <p><strong style={{ color: 'var(--main-purple)' }}>Endereço:</strong></p>
                        <input
                            className="input-edicao"
                            type="text"
                            value={estacaoEditando.rua}
                            onChange={(e) => setEstacaoEditando({ ...estacaoEditando, rua: e.target.value })}
                        />
                        {errors.rua && <span className="error">{errors.rua}</span>}
                        <input
                            className="input-edicao"
                            type="number"
                            value={estacaoEditando.numero}
                            onChange={(e) => setEstacaoEditando({ ...estacaoEditando, numero: Number(e.target.value) })}
                        />
                        {errors.numero && <span className="error">{errors.numero}</span>}
                        <p><strong style={{ color: 'var(--main-purple)' }}>Bairro:</strong></p>
                        <input
                            className="input-edicao"
                            type="text"
                            value={estacaoEditando.bairro}
                            onChange={(e) => setEstacaoEditando({ ...estacaoEditando, bairro: e.target.value })}
                        />
                        {errors.bairro && <span className="error">{errors.bairro}</span>}
                        <p><strong style={{ color: 'var(--main-purple)' }}>Cidade:</strong></p>
                        <input
                            className="input-edicao"
                            type="text"
                            value={estacaoEditando.cidade}
                            onChange={(e) => setEstacaoEditando({ ...estacaoEditando, cidade: e.target.value })}
                        />
                        {errors.cidade && <span className="error">{errors.cidade}</span>}
                    </div>
                ),
                extra: [
                    <div className='botoes'>
                        <div key="cancel-button">
                            <button className='btn' onClick={cancelarEdicao}>Cancelar</button>
                        </div>
                        <div key="save-button">
                            <button className='btn' onClick={() => salvarEdicao(estacaoEditando)}>Salvar</button>
                        </div>
                    </div>
                ]
            };
        } else {
            // Se não estiver em modo de edição
            return {
                idRow: (
                    <div>
                        <p><strong style={{ color: 'var(--main-purple)' }}>ID:</strong> {estacao.id}</p>
                    </div>
                ),
                col1: (
                    <div className='listagem'>
                        <p><strong style={{ color: 'var(--main-purple)' }}>MAC:</strong> </p>
                        <p>{estacao.uid}</p>
                        <p><strong style={{ color: 'var(--main-purple)' }}>Nome:</strong> </p>
                        <p>{estacao.nome}</p>
                        <p><strong style={{ color: 'var(--main-purple)' }}>CEP:</strong> </p>
                        <p>{estacao.cep}</p>
                        <p><strong style={{ color: 'var(--main-purple)' }}>Parâmetros:</strong></p>
                        {estacao.parametros && estacao.parametros.length > 0 ? (
                            <div className='parametros-container'>
                                {estacao.parametros.map((parametro) => {
                                    // Buscar o parâmetro completo a partir dos parâmetrosOptions
                                    const parametroCompleto = parametrosOptions.find(p => p.id === parametro.id);
                                    return (
                                        <p className='parametros' key={parametro.id}>
                                            <strong>
                                                {parametroCompleto
                                                    ? `${parametroCompleto.nome} - ${parametroCompleto.unidade}`
                                                    : "Nome e unidade não disponíveis"
                                                }
                                            </strong>
                                        </p>
                                    );
                                })}
                            </div>
                        ) : (
                            <p>Nenhum parâmetro disponível</p>
                        )}
                    </div>
                ),
                col2: (
                    <div className='listagem'>
                        <p><strong style={{ color: 'var(--main-purple)' }}>Endereço:</strong></p>
                        <p>{estacao.rua} n° {estacao.numero}</p>
                        <p><strong style={{ color: 'var(--main-purple)' }}>Bairro:</strong></p>
                        <p>{estacao.bairro}</p>
                        <p><strong style={{ color: 'var(--main-purple)' }}>Cidade:</strong> </p>
                        <p>{estacao.cidade}</p>
                        <p>
                            <div style={{ background: 'white', padding: '2rem' }} />
                        </p>
                    </div>
                ),
                extra: [
                    <div className='botoes'>
                        <div key="edit-button">
                            <button className="btn" onClick={() => setEstacaoEditando(estacao)}>Editar</button>
                        </div>
                        <div key="delete-button">
                            <button className="btn" onClick={() => excluirEstacao(estacao.id)}>Excluir</button>
                        </div>
                        <div>
                            <Link to={`/estacao/${estacao.id}`} className='btn'>Dashboard</Link>
                        </div>
                    </div>
                ]
            };
        }
    };

    useEffect(() => {
        if (estacaoEditando) {
            // Quando iniciar a edição, preenche o estado com os parâmetros já cadastrados
            setSelectedParametros(estacaoEditando.parametros.map(parametro => parametro.id));
        }
    }, [estacaoEditando]);

    useEffect(() => {
        const fetchEstacoes = async () => {
            try {
                const response = await api.get('/estacao');
                setEstacoes(response.data);
                setLoading(false);
            } catch (err) {
                setError('Erro ao buscar as estações' + err);
                setLoading(false);
            }
        };

        fetchEstacoes();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="container">
                <Sidebar />
                <div className="title-box">
                    <h2 className='title-text'>Estações</h2>
                </div>
                <div className="content">
                    <div className='adicionarUsuario'>
                        <Link to="/estacoes/cadastro" className='btn'>Adicionar estação</Link>
                    </div>
                    <TabelaGenerica<Estacao>
                        data={estacoes}
                        columns={[
                            { label: 'ID', key: 'id' },
                            { label: 'Nome', key: 'nome' },
                            { label: 'CEP', key: 'cep' },
                            { label: 'Status', key: 'status', renderCell: renderStatus }
                        ]}
                        detailExtractor={(estacao) => (
                            <div className="estacao-detalhes">
                                <p><strong>ID:</strong> {estacao.id}</p>
                                <p><strong>Nome:</strong> {estacao.nome}</p>
                                <p><strong>MAC-ADDRESS:</strong> {estacao.uid}</p>
                                <p><strong>CEP:</strong> {estacao.cep}</p>
                                <p><strong>Endereço:</strong> {estacao.rua} n° {estacao.numero}</p>
                                <p>{estacao.bairro} - {estacao.cidade}</p>
                            </div>
                        )}
                        dropdownContent={dropdownContent}
                    />
                </div>
            </div>
        </>
    );
};