import React, { useState } from 'react';
import { Command, Input } from '..';
import "./forms.css"
import InputField from '../../interface/InputField';

interface FormProps {
    titulo: String,
    inputs: InputField[],
    handleSubmit: (e: React.FormEvent) => void;
}

/* Para utilizar este componente, envie o título do forms, uma lista de inputs
 e uma função handle submit para fazer verificações de campos e enviar dados ao back-end */
const Form: React.FC<FormProps> = ({ titulo, inputs, handleSubmit }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className='forms'>
            <h2 className="titulo">{titulo}</h2>
            <form onSubmit={handleSubmit} className="">
                <div className='forms-input'>
                    {inputs.map(input => (
                        <>
                            {
                                input.type === 'select' ? (
                                    <Command
                                        label={input.label}
                                        key={input.name}
                                        type={input.type}
                                        name={input.name}
                                        placeholder={input.placeholder}
                                        onChange={handleChange}
                                        options={input.options}
                                    />
                                ) : (
                                    <Input
                                        key={input.name}
                                        label={input.label}
                                        type={input.type}
                                        name={input.name}
                                        placeholder={input.placeholder}
                                        onChange={handleChange}
                                    />
                                )
                            }
                        </>
                    ))}
                </div>
            </form>
            <button className='botao-enviar' onClick={handleSubmit}> Enviar </button>
        </div>
    )
}

export default Form

