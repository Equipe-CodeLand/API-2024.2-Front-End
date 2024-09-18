import React from 'react';
import "./input.css"
import InputField from '../../interface/InputCampo';

const Input: React.FC<InputField> = ({ label, type, name, value, placeholder, onChange, width, height}) => {
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
                style={{ 
                    backgroundColor: '#ffffff',
                    width: width,
                    height: height,
                    borderRadius: 10,
                    padding: 1,
                    margin: 3,
                    border: "#00000 1px solid"
                }}
            />
        </div>
    );
};

export default Input;
