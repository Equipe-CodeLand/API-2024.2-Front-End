import React from 'react';
import { InputComando, Input } from '..';
import "./forms.css"
import InputCampo from '../../interface/InputCampo';

interface FormProps {
    titulo: string;
    inputs: InputCampo[];
    handleSubmit: (e: React.FormEvent) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/* Para utilizar este componente, envie o título do forms, uma lista de inputs
 e uma função handle submit para fazer verificações de campos e enviar dados ao back-end */
const Forms: React.FC<FormProps> = ({ titulo, inputs, handleSubmit, handleChange }) => {
    return (
        <>
            <h3 className="titulo">{titulo}</h3>
            <div className='forms-container'>
                <form onSubmit={handleSubmit} className='forms'>
                    <div className='forms-group'>
                        {inputs.map((input, index) => (
                            <div key={index}>
                                {
                                    input.type === 'select' ? (
                                        <InputComando
                                            label={input.label}
                                            key={input.name}
                                            type={input.type}
                                            name={input.name}
                                            placeholder={input.placeholder}
                                            onChange={handleChange}
                                            options={input.options}
                                            height={input.height}
                                            width={input.width}
                                        />
                                    ) : (
                                        <Input
                                            key={input.name}
                                            label={input.label}
                                            type={input.type}
                                            name={input.name}
                                            placeholder={input.placeholder}
                                            onChange={handleChange}
                                            height={input.height}
                                            width={input.width}
                                        />
                                    )
                                }
                            </div>
                        ))}
                    </div >
                    <button className='botao-enviar' type='submit'> Enviar </button>
                </form>
            </div >
        </>
    )
}

export default Forms;