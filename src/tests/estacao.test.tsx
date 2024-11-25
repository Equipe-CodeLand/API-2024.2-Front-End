import React from 'react';  
import { render, screen, fireEvent, waitFor } from '@testing-library/react';  
import '@testing-library/jest-dom';  
import axios from 'axios';  
import MockAdapter from 'axios-mock-adapter';  
import { MemoryRouter } from 'react-router-dom';  
import CadastroEstacao from '../pages/CadastroEstação';  

// Configura um mock para o Axios  
const mock = new MockAdapter(axios);  

describe('CadastroEstacao Component', () => {  
    let warnMock;  

    beforeAll(() => {  
        warnMock = jest.spyOn(console, 'warn').mockImplementation(jest.fn());  
    });  

    afterAll(() => {  
        warnMock.mockRestore();  // Restaura a implementação original  
    });  

    beforeEach(() => {  
        mock.reset();  
    });  

    it('deve realizar o cadastro com sucesso', async () => {  
        // Mock da resposta para os parâmetros  
        mock.onGet('/parametros').reply(200, [  
            { id: '1', nome: 'Temperatura', unidade: '°C' },  
            { id: '2', nome: 'Umidade', unidade: '%' },  
        ]);  

        // Mock da requisição de cadastro  
        mock.onPost('/estacao/cadastro').reply(201, {  
            id: '123',  
            nome: 'Estação Exemplo',  
        });  

        render(  
            <MemoryRouter>  
                <CadastroEstacao />  
            </MemoryRouter>  
        );  

        // Preenche os campos do formulário  
        fireEvent.change(screen.getByPlaceholderText(/ex: Estação exemplo/i), {  
            target: { value: 'Estação Exemplo' },  
        });  
        fireEvent.change(screen.getByPlaceholderText(/ex: abc123/i), {  
            target: { value: 'abc123' },  
        });  
        fireEvent.change(screen.getByPlaceholderText(/ex: 12345-678/i), {  
            target: { value: '12345-678' },  
        });  
        fireEvent.change(screen.getByPlaceholderText(/ex: Rua exemplo/i), {  
            target: { value: 'Rua Exemplo' },  
        });  
        fireEvent.change(screen.getAllByPlaceholderText(/ex: 123/i)[0], {  
            target: { value: '123' },  
        });  
        fireEvent.change(screen.getByPlaceholderText(/ex: Bairro exemplo/i), {  
            target: { value: 'Bairro Exemplo' },  
        });  
        fireEvent.change(screen.getByPlaceholderText(/ex: Cidade exemplo/i), {  
            target: { value: 'Cidade Exemplo' },  
        });  

        // Seleciona um parâmetro  
        fireEvent.change(screen.getByLabelText(/Parâmetros:/i), {  
            target: { value: '1' },  
        });  

        // Submete o formulário  
        fireEvent.submit(screen.getByText(/Cadastrar/i));  
    });  
});