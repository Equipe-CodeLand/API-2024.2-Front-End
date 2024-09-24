import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importe o SweetAlert2
import TabelaGenerica from '../../components/tabelaDropdown';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Link } from 'react-router-dom'; // Importar o componente Link
import './style.css';
import { Estacao } from '../../interface/estacao';

const dropdownContent = (
  estacao: Estacao,
  isEditando: boolean,
  estacaoEditado: Estacao | null,
  setEstacaoEditado: (estacao: Estacao | null) => void,
  salvarEdicao: (estacao: Estacao) => void,
  cancelarEdicao: () => void,
) => {
  if (isEditando && estacaoEditado) {
    return {
      idRow: (
        <div className='edicao'>
          <p style={{ color: 'var(--main-purple)' }}><strong>ID:</strong> {estacaoEditado.id}</p>
        </div>
      ),
      col1: (
        <div className='edicao'>
          <p><strong style={{ color: 'var(--main-purple)' }}>MAC:</strong></p>
          <input
            type="text"
            value={estacaoEditado.uid}
            onChange={(e) =>
              setEstacaoEditado({ ...estacaoEditado, uid: e.target.value })
            }
          />
          <p><strong style={{ color: 'var(--main-purple)' }}>Nome:</strong></p>
          <input
            type="text"
            value={estacaoEditado.nome}
            onChange={(e) =>
              setEstacaoEditado({ ...estacaoEditado, nome: e.target.value })
            }
          />
          <p><strong style={{ color: 'var(--main-purple)' }}>CEP:</strong></p>
          <input
            type="cep"
            value={estacaoEditado.cep}
            onChange={(e) =>
              setEstacaoEditado({ ...estacaoEditado, cep: e.target.value })
            }
          />
        </div>
      ),
      col2: (
        <div className='edicao'>
          <p><strong style={{ color: 'var(--main-purple)' }}>Endereço:</strong></p>
          <input
            type="text"
            value={estacaoEditado.rua}
            onChange={(e) => setEstacaoEditado({ ...estacaoEditado, rua: e.target.value })}
          />
          <input
            type="number"
            value={estacaoEditado.numero}
            onChange={(e) => setEstacaoEditado({ ...estacaoEditado, numero: Number(e.target.value) })}
          />
          <p><strong style={{ color: 'var(--main-purple)' }}>Bairro:</strong></p>
          <input
            type="text"
            value={estacaoEditado.bairro}
            onChange={(e) =>
              setEstacaoEditado({ ...estacaoEditado, bairro: e.target.value })
            }
          />
          <p><strong style={{ color: 'var(--main-purple)' }}>Cidade:</strong></p>
          <input
            type="text"
            value={estacaoEditado.cidade}
            onChange={(e) =>
              setEstacaoEditado({ ...estacaoEditado, cidade: e.target.value })
            }
          />
        </div>
      ),
      extra: [
        <div className='botoes'>
          <div key="save-button">
            <button className="btn" onClick={() => salvarEdicao(estacaoEditado)}>Salvar</button>
          </div>
          <div key="cancel-button">
            <button className="btn" onClick={() => cancelarEdicao()}>Cancelar</button>
          </div>
        </div>
      ]
    }
  } else {
    return {
      idRow: (
        <div>
          <p style={{ color: 'var(--main-purple)' }}><strong>ID:</strong> {estacao.id}</p>
        </div>
      ),
      col1: (
        <div className='listagem'>
          <p><strong style={{ color: 'var(--main-purple)' }}>MAC:</strong></p>
          <p>{estacao.uid}</p>
          <p><strong style={{ color: 'var(--main-purple)' }}>Nome:</strong></p>
          <p>{estacao.nome}</p>
          <p><strong style={{ color: 'var(--main-purple)' }}>CEP:</strong></p>
          <p>{estacao.cep}</p>
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
        <div className='botoes'>
          <div key="edit-button">
            <button className="btn" onClick={() => setEstacaoEditado(estacao)}>Editar</button>
          </div>
        </div>
      ]
    };
  }
};

const EstacaoTable: React.FC = () => {
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [estacaoEditando, setEstacaoEditando] = useState<Estacao | null>(null);

  useEffect(() => {
    const fetchEstacoes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/estacoes');
        setEstacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar estações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstacoes();
  }, []);

  const salvarEdicao = async (estacao: Estacao) => {
    try {
      await axios.put('http://localhost:5000/estacoes/atualizar', estacao);
      
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Estação atualizada com sucesso!'
      });

      setEstacoes(estacoes.map(e => e.id === estacao.id ? estacao : e));
      setEstacaoEditando(null);
    } catch (error) {
      console.error("Erro ao atualizar estação:", error);
    }
  };

  const cancelarEdicao = () => {
    setEstacaoEditando(null);
  };  

  type Column<T> = {
    label: string;
    key: keyof T;
    renderCell?: (value: T[keyof T]) => JSX.Element;
  };

  const columns: Array<Column<Estacao>> = [
    { label: 'ID', key: 'id' },
    { label: 'Nome', key: 'nome' },
    { label: 'CEP', key: 'cep' },
  ];

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <Sidebar />
      <div className="title-box">
        <h2 className="title-text">Estações</h2>
      </div>
      <div className="content">
        <div className='adicionarEstacao'>
          <Link to="/estacoes/cadastro" className='btn'>Adicionar estação</Link> 
        </div>
        <TabelaGenerica<Estacao>
          data={estacoes}
          columns={columns}
          detailExtractor={(estacao) => (
            <div className="estacao-detalhes">
              <p><strong>ID:</strong> {estacao.id}</p>              
              <p><strong>Nome:</strong> {estacao.nome}</p>
              <p><strong>MAC:</strong> {estacao.uid}</p>
              <p><strong>CEP:</strong> {estacao.cep}</p>
              <p><strong>Endereço:</strong> {estacao.rua} n° {estacao.numero}, {estacao.bairro} - {estacao.cidade}</p>
            </div>
          )}
          dropdownContent={(estacao) =>
            dropdownContent(
              estacao,
              estacaoEditando?.id === estacao.id,
              estacaoEditando,
              setEstacaoEditando,
              salvarEdicao,
              cancelarEdicao
            )
          }
        />
      </div>
    </div>
  );
};

export default EstacaoTable;
