import React from 'react'
import './style.css'
import { Sidebar } from '../../components/sidebar/sidebar'

const AprendaMais: React.FC = () => {
  return (
    <div className='container'>
        <Sidebar />

        <div className="title-box">
            <h2 className='title-text'>Aprenda mais!</h2>
        </div>

        <div className="content">
            <div className="text-container">
                <h2 className="small-title-text">Pluviômetro</h2>

                <div className="text-box">
                    <p>O pluviômetro mede a quantidade de chuva em milímetros (mm), onde cada milímetro corresponde a 1 litro de água por metro quadrado. O tipo mais comum é o pluviômetro de balança basculante, que gera pulsos elétricos sempre que uma quantidade específica de água é coletada.</p>
                    <p>Cada pulso gerado pelo pluviômetro representa uma quantidade fixa de precipitação, geralmente calibrada em 0,2 mm. A quantidade total de chuva é a soma dos pulsos gerados.</p>
                    <p>Para calcular a quantidade de precipitação, usamos a seguinte fórmula:</p>
                    <p className="formula">P = N × C</p>

                    <ul className="list">
                        <li>P: precipitação total (mm)</li>
                        <li>N: número de pulsos gerados</li>
                        <li>C: calibração do pluviômetro (mm/pulso)</li>
                    </ul>
                </div>           
            </div>

            <div className="text-container">
                <h2 className="small-title-text">Termômetro</h2>

                <div className="text-box">
                    <p>O termômetro é o instrumento utilizado para medir a temperatura do ar, da água ou de superfícies. A temperatura é uma grandeza física que indica o grau de agitação das moléculas em um corpo ou substância.</p>
                    <p>Os termômetros mais comuns utilizam materiais que se expandem ou contraem com a variação de temperatura. No caso dos termômetros eletrônicos, a temperatura é medida pela variação na resistência elétrica de um material termossensível, como o termistor.</p>
                    <p>A fórmula que relaciona a variação de resistência com a temperatura é baseada na lei de Ohm:</p>
                    <p className="formula">T = a + bR</p>

                    <ul className="list">
                        <li>T: temperatura (°C)</li>
                        <li>a: constante de ajuste</li>
                        <li>b: coeficiente de temperatura</li>
                        <li>R: resistência elétrica do sensor (ohms)</li>
                    </ul>
                </div>           
            </div>

            <div className="text-container">
                <h2 className="small-title-text">Barômetro</h2>

                <div className="text-box">
                    <p>O barômetro mede a pressão atmosférica, que é a força exercida pela atmosfera sobre uma superfície. A pressão atmosférica é geralmente medida em hectopascais (hPa) ou milibares (mb).</p>
                    <p>A fórmula que relaciona a pressão com a altitude é dada pela equação barométrica:</p>
                    <p className="formula">P = P0 × e^(-Mgh/RT)</p>

                    <ul className="list">
                        <li>P: pressão no ponto considerado (Pa)</li>
                        <li>P0: pressão ao nível do mar (Pa)</li>
                        <li>M: massa molar do ar (kg/mol)</li>
                        <li>g: aceleração gravitacional (m/s²)</li>
                        <li>h: altura acima do nível do mar (m)</li>
                        <li>R: constante universal dos gases (J/mol·K)</li>
                        <li>T: temperatura absoluta (K)</li>
                    </ul>
                </div>           
            </div>

            <div className="text-container">
                <h2 className="small-title-text">Anemômetro</h2>

                <div className="text-box">
                    <p>O anemômetro é o instrumento utilizado para medir a velocidade do vento. O tipo mais comum é o de copos, que mede a velocidade ao registrar o número de rotações de seus copos em um determinado tempo.</p>
                    <p>A fórmula para calcular a velocidade do vento é:</p>
                    <p className="formula">V = (N × C) / t</p>

                    <ul className="list">
                        <li>V: velocidade do vento (m/s)</li>
                        <li>N: número de rotações</li>
                        <li>C: constante de calibração do anemômetro</li>
                        <li>t: tempo decorrido (s)</li>
                    </ul>
                </div>           
            </div>

            <div className="text-container">
                <h2 className="small-title-text">Higrômetro</h2>

                <div className="text-box">
                    <p>O higrômetro mede a umidade relativa do ar, que é a quantidade de vapor d'água presente no ar em relação à quantidade máxima que ele pode conter a uma certa temperatura. A umidade relativa é expressa em porcentagem.</p>
                    <p>A fórmula para calcular a umidade relativa é:</p>
                    <p className="formula">UR = (e / es) × 100</p>

                    <ul className="list">
                        <li>UR: umidade relativa (%)</li>
                        <li>e: pressão de vapor atual (hPa)</li>
                        <li>es: pressão de vapor de saturação (hPa)</li>
                    </ul>
                </div>           
            </div>

            <div className="text-container">
                <h2 className="small-title-text">Piranômetro</h2>

                <div className="text-box">
                    <p>O piranômetro é utilizado para medir a irradiância solar, ou seja, a quantidade de radiação solar que atinge uma superfície. A irradiância é medida em watts por metro quadrado (W/m²).</p>
                    <p>A fórmula para calcular a irradiância é:</p>
                    <p className="formula">E = P / A</p>

                    <ul className="list">
                        <li>E: irradiância (W/m²)</li>
                        <li>P: potência recebida (W)</li>
                        <li>A: área da superfície (m²)</li>
                    </ul>
                </div>           
            </div>

        </div>
    </div>
  )
}

export default AprendaMais
