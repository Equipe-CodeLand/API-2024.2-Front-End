import { useState } from 'react';
import "./input-comando.css";
import "./input.css";
import InputField from '../../interface/InputCampo';

const InputComando: React.FC<InputField> = ({ label, placeholder, options, width, height }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Filtra as opções com base na consulta do usuário
  const filteredOptions = options?.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((selected) => selected !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    setQuery('');
    setIsOpen(false);
  };

  const handleRemoveSelected = (option: string) => {
    setSelectedOptions(selectedOptions.filter((selected) => selected !== option));
  };

  return (
    <div>
      {label && (
        <label>
          <p>{label}:</p>
        </label>
      )}

      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClick={() => setIsOpen(true)}
        style={{
          backgroundColor: '#ffffff',
          width: width,
          height: height,
          borderRadius: 10,
          padding: 1,
          margin: 3,
          border: "#00000 1px solid",
          gap: 5
      }
        }
      />

      {/* Mostra todas as opções dentro da pesquisa do usuário */}
      {isOpen && (
        <div className="dropdown">
          {filteredOptions?.map((option, index) => (
            <p
              key={index}
              style={{
                backgroundColor: '#ffffff',
                width: width,
                height: height,
                borderRadius: 10,
                padding: 1,
                border: "1px solid #000"
              }}
              onClick={() => handleSelect(option)}
            >
              {option}
            </p>
          ))}
        </div>

      )}

      {/* Mostra as opções selecionadas como tags */}
      <div className="selected-options">
        {selectedOptions.map((option, index) => (
          <span key={index} className="selected-option">
            <b> {option} </b>
            <button type='button' onClick={() => handleRemoveSelected(option)}><b> x </b></button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default InputComando;
