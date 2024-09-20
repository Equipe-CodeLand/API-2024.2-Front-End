import React, { useState } from 'react';
import { Sidebar } from '../../components/sidebar/sidebar';
import Dropdown from '../../components/dropdown';

interface State {
  name: string;
  abbreviation: string;
}

interface City {
  name: string;
  code: string;
}

const states: State[] = [
  { name: 'São Paulo', abbreviation: 'SP' },
  { name: 'Rio de Janeiro', abbreviation: 'RJ' },
];

const cities: City[] = [
  { name: 'São Paulo', code: 'SP01' },
  { name: 'Rio de Janeiro', code: 'RJ01' },
];

const DropdownExample: React.FC = () => {
  const [selectedState, setSelectedState] = useState<State | null>(null); // Inicialmente null
  const [selectedCity, setSelectedCity] = useState<City | null>(null); //inicialmente null

  return (
    <div className='container'>
      {/* <Navbar /> */}
      <Sidebar />
      <div>
        <div className="title-box">
          <h2 className='title-text'>Exemplo Implementado</h2>
          <p className='text'>pode apagar depois essa pagina quando for integrar o backend</p>
          <p className='text'>só criei ela para ficar mais facil de entender ccomo implementa o dropdown</p>
        </div>
        <div className="content">
          <div className="dropdown-section">
            <h4 className='text'>Selecionar Estado</h4>
            <Dropdown<State>
              options={states}
              value={selectedState} // Valor inicial é o placeholder
              onChange={setSelectedState}
              labelExtractor={(option) => option.name}
              keyExtractor={(option) => option.abbreviation}
              placeholder="Selecione um estado"
            />
            {selectedState && <p>Estado: {selectedState.name}</p>}
          </div>

          <div className="dropdown-section">
            <h4 className='text'>Selecionar Cidade</h4>
            <Dropdown<City>
              options={cities}
              value={selectedCity} // Valor inicial é o placeholder
              onChange={setSelectedCity}
              labelExtractor={(option) => option.name}
              keyExtractor={(option) => option.code}
              placeholder="Selecione uma cidade"
            />
            {selectedCity && <p>Cidade: {selectedCity.name}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownExample;