import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './style.css'

interface GraficoProps {
  parametro: string;
}

const data = [
  { name: 'Page A', umidade: 4000, temperatura: 2400, pluviosidade: 2400 },
  { name: 'Page B', umidade: 3000, temperatura: 1398, pluviosidade: 2210 },
  { name: 'Page C', umidade: 2000, temperatura: 9800, pluviosidade: 2290 },
  { name: 'Page D', umidade: 2780, temperatura: 3908, pluviosidade: 2000 },
  { name: 'Page E', umidade: 1890, temperatura: 4800, pluviosidade: 2181 },
  { name: 'Page F', umidade: 2390, temperatura: 3800, pluviosidade: 2500 },
  { name: 'Page G', umidade: 3490, temperatura: 4300, pluviosidade: 2100 },
];

const Grafico: React.FC<GraficoProps> = ({ parametro }) => {
  return (
    <div className="grafico-container">
      <h4 className='small-title-text'>Gráfico de {parametro}</h4>
      <LineChart width={700} height={250} data={data}>
        <Line type="monotone" dataKey={parametro.toLowerCase()} stroke="#7f43c5" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <Tooltip />
        <YAxis />
      </LineChart>
    </div>
  );
};

export default Grafico;
