import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/sidebar/sidebar';
import './style.css';
import { Alerta } from '../../interface/alerta';
import AlertaCard from '../../components/alertaCard';
import { api } from '../../config/index';
import { isUserAdmin } from '../Login/privateRoutes';
import { Link } from 'react-router-dom';

interface GroupedAlert {
  nomeEstacao: string;
  idEstacao: string;
  idParametro: string;
  alerts: Alerta[];
}

const Alertas: React.FC = () => {
  const [alerts, setAlerts] = useState<GroupedAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [estacaoFiltro, setEstacaoFiltro] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [parametroFiltro, setParametroFiltro] = useState('');
  const [mensagemFiltro, setMensagemFiltro] = useState('');

  useEffect(() => {
    const fetchAlertas = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/alertas');
        const data = await response.data;

        console.log('Dados recebidos:', data);

        if (Array.isArray(data)) {
          const groupedAlerts: GroupedAlert[] = [];

          // buscar o nome das estações pelo id vindo do mapeamento dos alertas
          const getEstacao = data.map((alerta: any) =>
            api.get(`/estacao/${alerta.estacaoId}`)
          );

          const estacoesResponses = await Promise.all(getEstacao);
          const estacoesData = estacoesResponses.map((res: { data: any; }) => res.data);

          data.forEach((alerta: any) => {
            const estacaoData = estacoesData.find((estacao: { id: any; }) => estacao.id === alerta.estacaoId);
            const estacao = groupedAlerts.find(
              loc => loc.idEstacao === alerta.estacaoId
            );

            const formattedAlert = {
              id: alerta.id,
              gravidade: alerta.tipoAlerta === 'Perigo' ? 'Perigo' : 'Atenção',
              descricao: alerta.mensagemAlerta,
              valor: alerta.valor,
              parametro: alerta.nomeParametro,
              condicao: alerta.condicao,
              local: alerta.local,
              nomeParametro: alerta.nomeParametro,
              nomeEstacao: estacaoData.nome,
              estacaoId: alerta.estacaoId,
              parametroId: alerta.parametroId,
            };

            if (estacao) {
              estacao.alerts.push(formattedAlert);
            } else {
              groupedAlerts.push({
                nomeEstacao: estacaoData.nome,
                idParametro: alerta.parametroId,
                idEstacao: alerta.estacaoId,
                alerts: [formattedAlert],
              });
            }
          });
          setAlerts(groupedAlerts);
        } else {
          console.error('A resposta da API não contém alertas válidos:', data);
          setError('Sem alertas cadastrados no momento.');
        }
      } catch (error) {
        console.error('Erro ao buscar alertas:', error);
        setError('Erro ao buscar alertas. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlertas();
  }, []);

  const handleDelete = (id: string) => {
    const updatedAlerts = alerts
      .map(location => ({
        ...location,
        alerts: location.alerts.filter(alerta => alerta.id !== id),
      }))
      .filter(location => location.alerts.length > 0);

    setAlerts(updatedAlerts);
  };

  const handleUpdate = (updatedAlerta: Alerta) => {
    const updatedAlerts = alerts.map(location => ({
      ...location,
      alerts: location.alerts.map(alerta =>
        alerta.id === updatedAlerta.id ? updatedAlerta : alerta
      ),
    }));

    setAlerts(updatedAlerts);
  };

  const filteredAlerts = alerts.map(location => ({
    ...location,
    alerts: location.alerts.filter(alerta =>
      (estacaoFiltro ? location.nomeEstacao.toLowerCase().includes(estacaoFiltro.toLowerCase()) : true) &&
      (tipoFiltro ? alerta.gravidade === tipoFiltro : true) &&
      (parametroFiltro ? alerta.parametro.toLowerCase().includes(parametroFiltro.toLowerCase()) : true) &&
      (mensagemFiltro ? alerta.descricao.toLowerCase().includes(mensagemFiltro.toLowerCase()) : true)
    )
  })).filter(location => location.alerts.length > 0);


  return (
    <div className='container'>
      <Sidebar />
      <div>
        <div className="title-box">
          <h2 className='title-text'>Alertas cadastrados</h2>
        </div>
        <div className="content">
          <div className='filter-box'>
            <div className="filter-container">
              <input
                className="input-full-size"
                type="text"
                placeholder="Filtrar por Estação"
                value={estacaoFiltro}
                onChange={(e) => setEstacaoFiltro(e.target.value)}
              />
              <input
                className="input-full-size"
                type="text"
                placeholder="Filtrar por Parâmetro"
                value={parametroFiltro}
                onChange={(e) => setParametroFiltro(e.target.value)}
              />
              <input
                className="input-full-size"
                type="text"
                placeholder="Filtrar por Mensagem"
                value={mensagemFiltro}
                onChange={(e) => setMensagemFiltro(e.target.value)}
              />
              <select value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)} className="input-full-size" style={{marginTop: '13px'}}>
                <option value="">Todos os Tipos</option>
                <option value="Perigo">Perigo</option>
                <option value="Atenção">Atenção</option>
              </select>
            </div>
            {isUserAdmin() && (
              <Link className="btn" to='/alerta/cadastro'>
                Adicionar Alerta
              </Link>
            )}
          </div>
          {loading ? (
            <p>Carregando alertas...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : (
            filteredAlerts.length === 0 ? (
              <p className="no-alert-text">Nenhum alerta cadastrado no momento.</p>
            ) : (
              filteredAlerts.map((location, index) => (
                <div className="alert-container" key={index}>
                  <h2 className="alert-title-text">{location.nomeEstacao}</h2>
                  {location.alerts.length === 0 ? (
                    <p className="no-alert-text">Sem alertas na região</p>
                  ) : (
                    location.alerts.map((alerta) => (
                      <AlertaCard
                        alerta={alerta}
                        key={alerta.id}
                        idEstacao={location.idEstacao}
                        idParametro={location.idParametro}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                      />
                    ))
                  )}
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Alertas;
