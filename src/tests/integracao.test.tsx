import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Alertas from '../pages/Alertas';

// Mockando a API e funções externas
jest.mock('../config', () => ({
  api: {
    get: jest.fn(() =>
      Promise.resolve({
        data: [],
      })
    ),
  },
}));

jest.mock('../components/sidebar/sidebar', () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>,
}));

jest.mock('../pages/Login/privateRoutes', () => ({
  isUserAdmin: jest.fn(() => true),
}));

jest.mock('../components/alertaCard/index', () => ({
  default: () => <div data-testid="alerta-card">AlertaCard</div>,
}));

describe('Alertas Component', () => {
  it('renderiza a página Alertas sem quebrar', async () => {
    render(
      <BrowserRouter>
        <Alertas />
      </BrowserRouter>
    );

    // Verifica se os principais elementos da página são renderizados
    expect(screen.getByText(/Alertas cadastrados/i)).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Filtrar por Estação/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Filtrar por Parâmetro/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Filtrar por Mensagem/i)).toBeInTheDocument();
  });

  it('exibe uma mensagem de carregamento inicialmente', () => {
    render(
      <BrowserRouter>
        <Alertas />
      </BrowserRouter>
    );

    expect(screen.getByText(/Carregando alertas.../i)).toBeInTheDocument();
  });
});
