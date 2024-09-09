import { useState } from 'react';
import './style.css';

interface TableProps<T> {
  data: T[]; // Dados a serem exibidos na tabela
  columns: Array<{
    label: string;
    key: keyof T;
  }>; // Array de colunas com label e chave
  detailExtractor: (item: T) => JSX.Element; // Função para extrair detalhes do item
  dropdownContent: (item: T) => { idRow: JSX.Element; col1: JSX.Element; col2: JSX.Element; extra?: JSX.Element[] }; // Função para extrair conteúdo de duas colunas
}

const TabelaGenerica = <T,>({ data, columns, dropdownContent }: TableProps<T>): JSX.Element => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null); // Estado para controlar o item selecionado

  const handleRowClick = (itemId: number) => {
    setSelectedItemId((prevId) => (prevId === itemId ? null : itemId)); // Toggle para abrir/fechar detalhes
  };

  return (
    <div className='container-tabela'>
      <table className='tabela'>
        <thead>
          <tr>
            {columns.map((column) => ( // Mapeia as colunas da tabela
              <th key={String(column.key)}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => ( // Mapeia os itens da tabela
            <>
              <tr key={index} onClick={() => handleRowClick(index)}>
                {columns.map((column) => (
                  <td key={String(column.key)}>{String(item[column.key])}</td>
                ))}
              </tr>
              {selectedItemId === index && ( // Renderiza o dropdown se o item estiver selecionado
                <tr className='dropdown-tabela'>
                  <td colSpan={columns.length}>
                    <div className='dropdown-content'>
                      {/* Linha separada para o ID */}
                      <div className='id-row'>
                        {dropdownContent(item).idRow}
                      </div>
                      {/* Duas colunas para os outros dados do dropdown */}
                      <div className='dropdown-columns'>
                        <div className='dropdown-col'>
                          {dropdownContent(item).col1}
                        </div>
                        <div className='dropdown-col'>
                          {dropdownContent(item).col2}
                        </div>
                      </div>
                      {/* Renderiza os elementos extras, se existirem */}
                      {dropdownContent(item).extra && (
                        <div className='dropdown-extra'>
                          {dropdownContent(item).extra?.map((element, idx) => (
                            <div key={idx} className='dropdown-item'>
                              {element}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaGenerica;
