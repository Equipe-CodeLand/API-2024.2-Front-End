import { useState } from 'react';
import './style.css';

interface TableProps<T> {
  data: T[];
  columns: Array<{
    label: string;
    key: keyof T;
    renderCell?: (value: T[keyof T]) => JSX.Element; // Função opcional para renderizar células
  }>;
  detailExtractor: (item: T) => JSX.Element;
  dropdownContent: (item: T) => { idRow: JSX.Element; col1: JSX.Element; col2: JSX.Element; extra?: JSX.Element[] };
}

const TabelaGenerica = <T,>({ data, columns, dropdownContent }: TableProps<T>): JSX.Element => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleRowClick = (itemId: number) => {
    setSelectedItemId((prevId) => (prevId === itemId ? null : itemId));
  };

  return (
    <div className='container-tabela'>
      <table className='tabela'>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <>
              <tr key={index} onClick={() => handleRowClick(index)}>
                {columns.map((column) => (
                  <td key={String(column.key)}>
                    {column.renderCell ? column.renderCell(item[column.key]) : String(item[column.key])}
                  </td>
                ))}
              </tr>
              {selectedItemId === index && (
                <tr className='dropdown-tabela'>
                  <td colSpan={columns.length}>
                    <div className='dropdown-content'>
                      <div className='id-row'>
                        {dropdownContent(item).idRow}
                      </div>
                      <div className='dropdown-columns'>
                        <div className='dropdown-col'>
                          {dropdownContent(item).col1}
                        </div>
                        <div className='dropdown-col'>
                          {dropdownContent(item).col2}
                        </div>
                      </div>
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
