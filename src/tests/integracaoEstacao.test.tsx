import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DropdownEstacao } from "../pages/Estacao"

test('Testando conexão com backend da estação', async () => {
    render(<DropdownEstacao />);

    expect(screen.getByText('Carregando...')).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText(/Estação Meteorológica Central/i)).toBeInTheDocument();
    });
})