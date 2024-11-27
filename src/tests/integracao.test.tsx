import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Alertas from '../pages/Alertas';
import { MemoryRouter } from 'react-router-dom'; // Importando o MemoryRouter

test('renderiza a página Alertas sem quebrar', async () => {
  // Renderiza o componente Alertas dentro de um MemoryRouter
  render(
    <MemoryRouter>
      <Alertas />
    </MemoryRouter>
  );

  // Espera pela renderização do título
  await waitFor(() => {
    expect(screen.getByText(/Alertas cadastrados/i)).toBeInTheDocument();
  });

  // Verifica se o sidebar foi renderizado
  expect(screen.getByTestId('sidebar')).toBeInTheDocument();
});
