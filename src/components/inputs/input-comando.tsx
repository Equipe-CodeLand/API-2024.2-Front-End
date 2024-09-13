import { useState } from 'react';
import "./input-comando.css";
import "./input.css";
import InputField from '../../interface/InputCampo';

const InputComando: React.FC<InputField> = ({ label, placeholder, options }) => {
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
        className="input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClick={() => setIsOpen(true)}
      />

      {/* Mostra todas as opções dentro da pesquisa do usuário */}
      {isOpen && (
        <div className="dropdown">
          {filteredOptions?.map((option, index) => (
            <p
              key={index}
              className={`option ${selectedOptions.includes(option) ? 'selected' : ''}`}
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
            <button onClick={() => handleRemoveSelected(option)}><b> x </b></button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default InputComando;
