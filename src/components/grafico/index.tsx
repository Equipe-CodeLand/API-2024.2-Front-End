import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './style.css';

interface GraficoProps {
  parametro: any;
  nome: string;
  dados: any[];
}

const Grafico: React.FC<GraficoProps> = ({ parametro, dados, nome }) => {
  // Mapear os dados recebidos para o formato esperado pelo gráfico
  const data = dados.map(d => ({
    name: new Date(d.uxt * 1000).toLocaleString(),
    valor: d[parametro]
  }));

  // Função para calcular a variação entre os valores consecutivos
  const calcularVariacao = (dados: any[]) => {
    return dados.map((d, i) => {
      if (i === 0) {
        return { ...d, variacao: 0 };
      }
      const variacao = d.valor - dados[i - 1].valor;
      return { ...d, variacao };
    });
  };

  const variacaoData = calcularVariacao(data);

  return (
    <div className="grafico-container">
      <h4 className='dashboard-title-text'>Gráfico de {nome}</h4>
      {data.length === 0 ? (
        <p>Nenhuma medição encontrada nesse período.</p>
      ) : (
        <LineChart width={700} height={250} data={variacaoData}>
          <Line type="monotone" dataKey="valor" stroke="#7f43c5" />
          <Line type="monotone" dataKey="variacao" stroke="#ff7300" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <Tooltip />
          <YAxis />
        </LineChart>
      )}
    </div>
  );
};

export default Grafico;
