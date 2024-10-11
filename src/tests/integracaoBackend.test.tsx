import axios from 'axios';
import api from '../config';

jest.mock('../config'); // Mocka a instância `api`
const mockedApi = api as jest.Mocked<typeof api>;

test('Testando a conexão com o backend', async () => {
    // Simula uma resposta bem-sucedida do backend
    const mockData = { nome: 'Estação Meteorológica Central' };
    
    // Mockando a resposta da instância personalizada do axios
    mockedApi.get.mockResolvedValueOnce({ data: mockData });

    // Faz a chamada para o backend usando a função de API
    const response = await api.get('/estacoes');

    // Verifica se o axios.get foi chamado corretamente com o endpoint esperado
    expect(mockedApi.get).toHaveBeenCalledWith('/estacoes');

    // Verifica se a resposta retornada foi a esperada
    expect(response.data).toEqual(mockData);
});