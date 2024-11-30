import { render, screen, waitFor } from '@testing-library/react';  // Importa funções da Testing Library para renderizar componentes e interagir com a UI
import '@testing-library/jest-dom'; // Importa matchers adicionais para facilitar as asserções em testes
import axios from 'axios'; // Importa o axios para comunicação com a API (não é utilizado diretamente neste teste, mas pode ser relevante para mocks)
import Alertas from '../pages/Alertas'; // Importa o componente que será testado
import { MemoryRouter } from 'react-router-dom'; // Importa o MemoryRouter, necessário para emular o roteamento sem servidor

// Descrição do teste
test('renderiza a página Alertas sem quebrar', async () => {
  // Renderiza o componente "Alertas" dentro de um MemoryRouter para simular navegação sem servidor
  render(
    <MemoryRouter>
      <Alertas />
    </MemoryRouter>
  );

  // Espera que o título "Alertas cadastrados" seja exibido corretamente na página
  // waitFor aguarda até que o elemento seja encontrado ou o timeout seja atingido
  await waitFor(() => {
    // Verifica se o texto "Alertas cadastrados" está presente na tela
    expect(screen.getByText(/Alertas cadastrados/i)).toBeInTheDocument();
  });

  // Verifica se o sidebar foi renderizado corretamente na tela
  // getByTestId busca o elemento com o data-testid="sidebar"
  expect(screen.getByTestId('sidebar')).toBeInTheDocument();
});
