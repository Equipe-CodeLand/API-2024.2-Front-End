import React, { useState } from 'react';
import './style.css';
import { IoIosArrowDown } from 'react-icons/io';

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

  // Transformar data em um array vazio se não for um array
  const validData = Array.isArray(data) ? data : [];

  return (
    <div className='container-tabela'>
      <table className='tabela'>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)}>{column.label}</th>
            ))}
            <th></th> {/* Coluna vazia para alinhar com o ícone */}
          </tr>
        </thead>
        <tbody>
          {validData.map((item, index) => (
            <React.Fragment key={index}>
              <tr className='linha' onClick={() => handleRowClick(index)}>
                {columns.map((column) => (
                  <td key={String(column.key)}>
                    {column.renderCell ? column.renderCell(item[column.key]) : String(item[column.key])}
                  </td>
                ))}
                <td>
                  <IoIosArrowDown />
                </td>
              </tr>
              {selectedItemId === index && (
                <tr className='dropdown-tabela'>
                  <td colSpan={columns.length + 1}>
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
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaGenerica;