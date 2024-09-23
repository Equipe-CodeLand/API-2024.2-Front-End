import React, { useEffect, useState } from 'react';
import TabelaGenerica from '../../components/tabelaDropdown';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Link } from 'react-router-dom';
import "../DropdownUsuario/style.css"
import "./style.css"
import api from '../../config';

interface Estacao {
    id: number;
    nome: string;
    uid: string;
    cep: string;
    rua: string;
    numero: number;
    bairro: string
    cidade: string;
    parametros: any[];
    status: string;
}

export const DropdownEstacao: React.FC = () => {
    const [estacoes, setEstacoes] = useState<Estacao[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    type Column<T> = {
        label: string;
        key: keyof T;
        renderCell?: (value: any) => JSX.Element;
    };

    const dropdownContent = (estacao: Estacao) => ({
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
                <p><strong>Parâmetros: </strong></p>
                {estacao.parametros && estacao.parametros.length > 0 ? (
                    <div className='parametros-container'>
                        {estacao.parametros.map(parametro => (
                            <p className='parametros'key={parametro.id}> <strong> {parametro.descricao}  - {parametro.unidade}</strong></p>
                        ))}
                    </div>
                ) : (
                    <p>Nenhum parâmetro disponível</p>
                )}
            </div>
        ),
        col2: (
            <div>
                <p><strong>Endereço:</strong> {estacao.rua} n° {estacao.numero}</p>
                <p><strong>Bairro: </strong> {estacao.bairro}</p>
                <p><strong>Cidade: </strong> {estacao.cidade}</p>
            </div>
        ),
        extra: [
            <div key="action-button">
                <button className='btn' onClick={() => alert(`Ação realizada para ${estacao.nome}`)}>Ação</button>
            </div>
        ]
    });
    

    // Função para renderizar o status com bolinha colorida
    const renderStatus = (status: string | number |[]) => {
        const statusClasses: { [key: string]: string } = {
            'Ok': 'status-active',
            'Alerta': 'status-inactive',
        };

        const statusClass = statusClasses[status as string] || '';

        return (
            <span className='status-container'>
                {status}
                <span className={`status-bullet ${statusClass}`}></span>
            </span>
        );
    };

    // Colunas que serão exibidas na tabela
    const columns: Array<Column<Estacao>> = [
        { label: 'ID', key: 'id' },
        { label: 'Nome', key: 'nome' },
        { label: 'CEP', key: 'cep' },
        {
            label: 'Status',
            key: 'status',
            renderCell: renderStatus
        },
    ];

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
                        <Link to="/estacao/cadastro" className='btn'>Adicionar estação</Link>
                    </div>            
                    <TabelaGenerica<Estacao>
                        data={estacoes}
                        columns={columns}
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