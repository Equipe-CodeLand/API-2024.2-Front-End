import React from 'react';
import "./input.css"
import InputField from '../../interface/InputCampo';

const Input: React.FC<InputField> = ({ label, type, name, value, placeholder, onChange }) => {
    return (
        <div>
            {label && (
                <label>
                    <p>
                        {label}:
                    </p>
                </label>
            )}
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="input"
            />
        </div>
    );
};

export default Input;
