import { useState } from 'react';
import "./command.css"
import InputField from '../../interface/InputField';

const Command: React.FC<InputField> = ({ label, placeholder, options }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const filteredOptions = options?.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (option: string) => {
    setQuery(option);
    setIsOpen(false);
    setSelectedOption(selectedOption);
  };

  return (
    <div className="relative max-w-sm">
      {label && (
        <label>
          <p>
            {label}:
          </p>
        </label>
      )}
      <input
        type="text"
        className="command-input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <>
          {filteredOptions?.map((option, index) => (
            <p
              key={index}
              className="option"
              onClick={() => handleSelect(option)}
            >
              <b>
                {option}
              </b>
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default Command;
