import { DropdownProps } from '../../interface/dropdown';
import './style.css';

const Dropdown = <T,>({
  options,
  value,
  onChange,
  labelExtractor,
  keyExtractor,
  placeholder,
  label,
}: DropdownProps<T> & { label?: string }): JSX.Element => {
  // Define o valor do placeholder como uma string vazia
  const placeholderValue = '';

  return (
    <div className="dropdown">
      {label && <label htmlFor="dropdown-select">{label}</label>}
      <select
        id="dropdown-select"
        value={value ? keyExtractor(value) : placeholderValue} // Define o valor do select
        onChange={(e) => {
          // Encontra a opção selecionada com base na chave
          const selectedValue = options.find(
            (option) => keyExtractor(option) === e.target.value
          );
          if (selectedValue) {
            onChange(selectedValue); // Atualiza o valor selecionado
          }
        }}
      >
        {/* Adiciona o placeholder como a primeira opção */}
        {placeholder && (
          <option value={placeholderValue} disabled>
            {placeholder}
          </option>
        )}
        {/* Mapeia as opções para elementos <option> */}
        {options.map((option) => (
          <option key={keyExtractor(option)} value={keyExtractor(option)}>
            {labelExtractor(option)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
