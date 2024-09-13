export interface DropdownProps<T> {
  options: T[]; // Lista de opções a serem exibidas no dropdown
  value: T | null; // Valor atualmente selecionado no dropdown
  onChange: (value: T) => void; 
  labelExtractor: (option: T) => string;
  keyExtractor: (option: T) => string;
  placeholder?: string; 
  label?: string; 
}
