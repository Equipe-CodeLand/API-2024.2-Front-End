import React, { useEffect, useState } from 'react';
import TabelaGenerica from '../../components/tabelaDropdown';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Link } from 'react-router-dom';
import './style.css'
import { api } from '../../config';
import "../../components/tabelaDropdown/style.css"
import Swal from 'sweetalert2';
import { Estacao } from '../../interface/estacao';
import { Parametro } from '../../interface/parametro';
import { isUserAdmin } from '../Login/privateRoutes';

export const DropdownEstacao: React.FC = () => {
    const [estacoes, setEstacoes] = useState<Estacao[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [estacaoEditando, setEstacaoEditando] = useState<Estacao | null>(null);
    const [selectedParametros, setSelectedParametros] = useState<string[]>([]);
    const [parametroSelecionado, setParametroSelecionado] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [parametrosOptions, setParametrosOptions] = useState<Parametro[]>([])

    const excluirEstacao = async (id: string) => {
        console.log("id da estação para deletar:", id)
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
                    const token = localStorage.getItem('token');
                    await api.delete(`/estacao/deletar/${id}`,
                        {
                            headers: {
                              'Authorization': `Bearer ${token}`,
                              'Content-Type': 'application/json'
                            }
                      });

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

            // Atualiza a estação com os IDs dos parâmetros
            const updatedEstacao = { ...estacao, parametros: selectedParametros };
            const token = localStorage.getItem('token');
            await api.put(`/estacao/atualizar/`, updatedEstacao,
                {
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                    }
              });

            // Aqui, vamos buscar os objetos completos dos parâmetros novamente
            setEstacoes(estacoes.map(e => e.id === estacao.id ? updatedEstacao : e));
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
        const fetchParametros = async () => {
            try {
                const response = await api.get('/parametros');
                console.log('parametros:', response.data);
                setParametrosOptions(response.data);
            } catch (err) {
                console.log('Erro ao buscar as estações' + err);
            }
        };

        fetchParametros();
    }, []);

    // Corrigido: handleSelectParametro agora usa selectedParametros
    const handleSelectParametro = (parametroId: string) => {
        if (!selectedParametros.includes(parametroId)) {
            setSelectedParametros([...selectedParametros, parametroId]);
            setParametroSelecionado('');
        }
    };

    const handleRemoveParametro = (parametroId: string) => {
        setSelectedParametros(selectedParametros.filter(id => id !== parametroId));
    };

    const dropdownContent = (estacao: Estacao) => {
        if (estacaoEditando?.id === estacao.id) {
            return {
                idRow: (
                    <div>
                        <p><strong style={{ color: 'var(--main-purple)' }}>ID:</strong> {estacao.id}</p>
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
                            <p><strong style={{ color: 'var(--main-purple)' }}>Parâmetros:</strong></p>
                            <select
                                id="parametros"
                                className="input-full-size"
                                value={parametroSelecionado}
                                onChange={(e) => {
                                    const newParam = (e.target.value);
                                    setParametroSelecionado(newParam);
                                    handleSelectParametro(newParam);
                                }}
                            >
                                <option value="">Selecione um parâmetro</option>
                                {parametrosOptions.map((parametro) => (
                                    <option
                                        key={parametro.id}
                                        value={parametro.id}
                                        disabled={parametro.id ? selectedParametros.includes(parametro.id) : false}
                                    >
                                        {parametro.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.parametros && <span className="error">{errors.parametros}</span>}
                        </div>

                        {/* Renderização dos parâmetros selecionados, tanto já cadastrados quanto novos */}
                        {selectedParametros.length > 0 && (
                            <div className="parametros-selecionados">
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
                extra: isUserAdmin() ? [
                    <div className='botoes'>
                        <div key="cancel-button">
                            <button className='btn' onClick={cancelarEdicao}>Cancelar</button>
                        </div>
                        <div key="save-button">
                            <button className='btn' onClick={() => salvarEdicao(estacaoEditando)}>Salvar</button>
                        </div>
                    </div>
                ] : undefined
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
                            <div className='parametro-container'>
                                {estacao.parametros.map((parametro) => {
                                    // Buscar o parâmetro completo a partir dos parâmetrosOptions
                                    const parametroCompleto = parametrosOptions.find(p => p.id === parametro);
                                    // console.log("id dos parametros",parametro)
                                    return (
                                        <p className='parametro' key={parametro}>
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
                extra: isUserAdmin() ? [
                    <div className='botoes'>
                        <div key="edit-button">
                            <button className="btn" onClick={() => setEstacaoEditando(estacao)}>Editar</button>
                        </div>
                        <div key="delete-button">
                            <button className="btn" onClick={() => excluirEstacao(estacao.id)}>Excluir</button>
                        </div>
                        <div>
                            <Link to={`/estacao/${estacao.id}`} state={{ estacao }} className='btn'>Dashboard</Link>
                        </div>
                    </div>
                ] : undefined
            };
        }
    };

    useEffect(() => {
        if (estacaoEditando) {
            // Quando iniciar a edição, preenche o estado com os parâmetros já cadastrados
            setSelectedParametros(estacaoEditando.parametros.map(parametro => parametro));
        }
    }, [estacaoEditando]);

    useEffect(() => {
        const fetchEstacoes = async () => {
            try {
                const response = await api.get('/estacoes');
                console.log('estacoes:', response.data);
                setEstacoes(response.data);
                setLoading(false);
            } catch (err) {
                setError('Erro ao buscar as estações' + err);
                setLoading(false);
            }
        };

        fetchEstacoes();
    }, []);


    return (
        <>
            <div className="container">
                <Sidebar />
                <div className="title-box">
                    <h2 className='title-text'>Estações</h2>
                </div>
                <div className="content">
                    <div className='adicionarUsuario'>
                        {isUserAdmin() && (
                            <Link to="/estacao/cadastro" className='btn'>Adicionar estação</Link>
                        )}
                    </div>
                    {loading ? (
                        <p>Carregando...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <TabelaGenerica<Estacao>
                            data={estacoes}
                            columns={[
                                { label: 'MAC', key: 'uid' },
                                { label: 'Nome', key: 'nome' },
                                { label: 'CEP', key: 'cep' }
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
                    )}
                </div>
            </div>
        </>
    );
};