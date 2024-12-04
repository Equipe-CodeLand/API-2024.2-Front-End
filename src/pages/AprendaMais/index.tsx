import React from 'react'
import './style.css'
import { Sidebar } from '../../components/sidebar/sidebar'
// Importando as imagens
import pluviometroImg from '../../assets/Pluviometro.jpg'
import termometroImg from '../../assets/Termometro.jpg'
import barometroImg from '../../assets/Barometro.jpg'
import anemometroImg from '../../assets/Anemometro.jpg'
import higrometroImg from '../../assets/Higrometro.jpg'
import piranometroImg from '../../assets/Piranometro.jpg'

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
                        <p>O pluviômetro é um instrumento utilizado para medir a quantidade de precipitação de chuva em um determinado período. A unidade de medida geralmente utilizada é o milímetro (mm). Cada milímetro de precipitação corresponde a um litro de água por metro quadrado.</p>
                        <p>Um dos tipos mais comuns de pluviômetro é o pluviômetro de balança basculante. Este tipo de pluviômetro coleta a água da chuva em um recipiente e, sempre que uma quantidade específica de água é coletada, uma balança basculante gera um pulso elétrico. A calibração do pluviômetro é ajustada para que cada pulso represente uma quantidade fixa de precipitação, geralmente 0,2 mm.</p>
                        <p>Para calcular a quantidade total de precipitação registrada, utilizamos a fórmula:</p>
                        <p className="formula">P = N × C</p>

                        <ul className="list">
                            <li>P: Precipitação total acumulada (mm)</li>
                            <li>N: Número de pulsos registrados pelo pluviômetro</li>
                            <li>C: Calibração do pluviômetro, ou seja, a quantidade de precipitação representada por cada pulso (mm/pulso)</li>
                        </ul>

                        <img src={pluviometroImg} alt="Pluviômetro" className="instrument-image" />
                    </div>
                </div>

                <div className="text-container">
                    <h2 className="small-title-text">Termômetro</h2>

                    <div className="text-box">
                        <p>O termômetro é um dispositivo usado para medir a temperatura de diferentes ambientes, como o ar, a água ou superfícies sólidas. A temperatura é uma medida do grau de agitação das moléculas em um corpo ou substância.</p>
                        <p>Existem vários tipos de termômetros, incluindo os de mercúrio, de álcool e eletrônicos. Os termômetros eletrônicos, por exemplo, utilizam materiais que variam sua resistência elétrica com a temperatura. Um exemplo comum é o termistor, que é um tipo de resistor cuja resistência muda significativamente com a temperatura.</p>
                        <p>A fórmula para relacionar a variação da resistência com a temperatura em um termistor é:</p>
                        <p className="formula">T = a + bR</p>

                        <ul className="list">
                            <li>T: Temperatura medida (°C)</li>
                            <li>a: Constante de ajuste, que depende das características específicas do termômetro</li>
                            <li>b: Coeficiente de temperatura, que descreve como a resistência varia com a temperatura</li>
                            <li>R: Resistência elétrica do sensor (ohms)</li>
                        </ul>

                        <img src={termometroImg} alt="Termômetro" className="instrument-image" />
                    </div>
                </div>

                <div className="text-container">
                    <h2 className="small-title-text">Barômetro</h2>

                    <div className="text-box">
                        <p>O barômetro é um instrumento usado para medir a pressão atmosférica, que é a força exercida pela atmosfera sobre uma superfície. A pressão atmosférica é fundamental para várias aplicações meteorológicas e científicas e é normalmente medida em hectopascais (hPa) ou milibares (mb).</p>
                        <p>A fórmula que relaciona a pressão atmosférica com a altitude é conhecida como equação barométrica. Ela descreve como a pressão diminui à medida que se sobe na atmosfera:</p>
                        <p className="formula">P = P<sub>0</sub> × e<sup>-Mgh/RT</sup></p>

                        <ul className="list">
                            <li>P: Pressão no ponto considerado (Pa)</li>
                            <li>P<sub>0</sub>: Pressão atmosférica ao nível do mar (Pa)</li>
                            <li>M: Massa molar do ar (kg/mol)</li>
                            <li>g: Aceleração gravitacional (m/s²)</li>
                            <li>h: Altura acima do nível do mar (m)</li>
                            <li>R: Constante universal dos gases (J/mol·K)</li>
                            <li>T: Temperatura absoluta (K)</li>
                            <li>e: Base do logaritmo natural, aproximadamente 2,718, usada para calcular o decaimento exponencial da pressão com a altitude</li>
                        </ul>

                        <img src={barometroImg} alt="Barômetro" className="instrument-image" />
                    </div>
                </div>

                <div className="text-container">
                    <h2 className="small-title-text">Anemômetro</h2>

                    <div className="text-box">
                        <p>O anemômetro é utilizado para medir a velocidade e a direção do vento. O tipo mais comum é o anemômetro de copos, que mede a velocidade ao registrar o número de rotações dos copos em um determinado intervalo de tempo, porém também é possível encontrar os anemômetros de tipo sônico e tipo hélice.</p>
                        <p>O anemômetro tem grande importância, visto que, sabendo a velocidade do vento, é possível identificar mudanças nos padrões climáticos, o que pode ajudar em prever uma tempestade, ou outros acontecimentos climáticos, por exemplo.</p>
                        <p>Para calcular a velocidade do vento com um anemômetro de copos, utilizamos a fórmula:</p>
                        <p className="formula">V = (N × C) / t</p>

                        <ul className="list">
                            <li>V: Velocidade do vento (m/s)</li>
                            <li>N: Número de rotações dos copos do anemômetro</li>
                            <li>C: Constante de calibração do anemômetro, que pode variar de acordo com o modelo</li>
                            <li>t: Tempo decorrido durante a medição (s)</li>
                        </ul>

                        <img src={anemometroImg} alt="Anemômetro" className="instrument-image" />
                    </div>
                </div>

                <div className="text-container">
                    <h2 className="small-title-text">Higrômetro</h2>

                    <div className="text-box">
                        <p>O higrômetro é um instrumento utilizado para medir a umidade relativa do ar. A umidade relativa é uma medida da quantidade de vapor d'água presente no ar comparada com a quantidade máxima que o ar pode conter a uma temperatura específica. A umidade relativa é expressa como uma porcentagem (%).</p>
                        <p>A umidade relativa é calculada comparando a pressão de vapor atual (e) com a pressão de vapor de saturação (es) à mesma temperatura. A pressão de vapor de saturação é a pressão máxima de vapor que o ar pode conter a uma determinada temperatura antes de ocorrer condensação.</p>
                        <p>Para calcular a umidade relativa, usamos a fórmula:</p>
                        <p className="formula">UR = (e / es) × 100</p>

                        <ul className="list">
                            <li>UR: Umidade relativa do ar (%)</li>
                            <li>e: Pressão de vapor atual do ar (hPa)</li>
                            <li>es: Pressão de vapor de saturação a uma determinada temperatura (hPa)</li>
                        </ul>

                        <img src={higrometroImg} alt="Higrômetro" className="instrument-image" />
                    </div>
                </div>

                <div className="text-container">
                    <h2 className="small-title-text">Piranômetro</h2>

                    <div className="text-box">
                        <p>O Piranômetro é um instrumento utilizado para medir a radiação solar incidente em uma superfície. A radiação solar é importante para várias aplicações, como estudos meteorológicos, pesquisa climática e controle de processos industriais.</p>
                        <p>O Piranômetro pode medir a radiação total (incluindo a direta e a difusa) ou a radiação direta. A fórmula utilizada para calcular a quantidade total de radiação solar incidente é:</p>
                        <p className="formula">R = E / A</p>

                        <ul className="list">
                            <li>R: Radiação solar total incidente (W/m²)</li>
                            <li>E: Energia total medida pelo piranômetro (W)</li>
                            <li>A: Área da superfície onde a radiação é medida (m²)</li>
                        </ul>

                        <img src={piranometroImg} alt="Piranômetro" className="instrument-image" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AprendaMais