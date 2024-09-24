import React, { useEffect, useState } from 'react';
import TabelaGenerica from '../../components/tabelaDropdown';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Link } from 'react-router-dom';
import "../DropdownUsuario/style.css"
import "./style.css"
import api from '../../config';
import "../../components/tabelaDropdown/style.css"

interface Estacao {
    id: number;
    nome: string;
    uid: string;
    cep: string;
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
    parametros: any[];
    status: string;
}

export const DropdownEstacao: React.FC = () => {
    const [estacoes, setEstacoes] = useState<Estacao[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [estacaoEditando, setEstacaoEditando] = useState<Estacao | null>(null);

    // Função para renderizar o status com bolinha colorida
    const renderStatus = (value: string | number | any[]) => {
        // Converter para string se for necessário
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

    const salvarEdicao = async (estacao: Estacao) => {
        try {
            await api.put(`/estacao/atualizar`, estacao);
            setEstacoes(estacoes.map(e => e.id === estacao.id ? estacao : e));
            setEstacaoEditando(null);
            alert('Estação atualizada com sucesso!');
        } catch (error) {
            console.error("Erro ao atualizar estação:", error);
        }
    };

    const cancelarEdicao = () => {
        setEstacaoEditando(null);
    };

    const dropdownContent = (estacao: Estacao) => {
        if (estacaoEditando?.id === estacao.id) {
            // Se estiver em modo de edição
            return {
                idRow: (
                    <div>
                        <p><strong>ID:</strong> {estacao.id}</p>
                    </div>
                ),
                col1: (
                    <div>
                        <p><strong>MAC:</strong></p>
                        <input
                            className="input-edicao"
                            type="text"
                            value={estacaoEditando.uid}
                            onChange={(e) => setEstacaoEditando({ ...estacaoEditando, uid: e.target.value })}
                        />
                        <p><strong>Nome:</strong></p>
                        <input
                            className="input-edicao"
                            type="text"
                            value={estacaoEditando.nome}
                            onChange={(e) => setEstacaoEditando({ ...estacaoEditando, nome: e.target.value })}
                        />
                        <p><strong>CEP:</strong></p>
                        <input
                            className="input-edicao"
                            type="text"
                            value={estacaoEditando.cep}
                            onChange={(e) => setEstacaoEditando({ ...estacaoEditando, cep: e.target.value })}
                        />
                    </div>
                ),
                col2: (
                    <div>
                        <p><strong>Endereço:</strong></p>
                        <input
                            className="input-edicao"
                            type="text"
                            value={estacaoEditando.rua}
                            onChange={(e) => setEstacaoEditando({ ...estacaoEditando, rua: e.target.value })}
                        />
                        <input
                            className="input-edicao"
                            type="number"
                            value={estacaoEditando.numero}
                            onChange={(e) => setEstacaoEditando({ ...estacaoEditando, numero: Number(e.target.value) })}
                        />
                        <p><strong>Bairro:</strong></p>
                        <input
                            className="input-edicao"
                            type="text"
                            value={estacaoEditando.bairro}
                            onChange={(e) => setEstacaoEditando({ ...estacaoEditando, bairro: e.target.value })}
                        />
                        <p><strong>Cidade:</strong></p>
                        <input
                            className="input-edicao"
                            type="text"
                            value={estacaoEditando.cidade}
                            onChange={(e) => setEstacaoEditando({ ...estacaoEditando, cidade: e.target.value })}
                        />
                    </div>
                ),
                extra: [
                    <div className='botoes'>
                        <div key="save-button">
                            <button className='btn' onClick={() => salvarEdicao(estacaoEditando)}>Salvar</button>
                        </div>
                        <div key="cancel-button">
                            <button className='btn' onClick={cancelarEdicao}>Cancelar</button>
                        </div>
                    </div>
                ]
            };
        } else {
            // Se não estiver em modo de edição
            return {
                idRow: (
                    <div>
                        <p><strong>ID:</strong> {estacao.id}</p>
                    </div>
                ),
                col1: (
                    <div>
                        <p><strong>MAC:</strong> {estacao.uid}</p>
                        <p><strong>Nome:</strong> {estacao.nome}</p>
                        <p><strong>CEP:</strong> {estacao.cep}</p>
                    </div>
                ),
                col2: (
                    <div>
                        <p><strong>Endereço:</strong> {estacao.rua} n° {estacao.numero}</p>
                        <p><strong>Bairro:</strong> {estacao.bairro}</p>
                        <p><strong>Cidade:</strong> {estacao.cidade}</p>
                    </div>
                ),
                extra: [
                    <div key="action-button">
                        <button className='btn' onClick={() => setEstacaoEditando(estacao)}>Editar</button>
                    </div>
                ]
            };
        }
    };

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
