import React from 'react';
// import { Navbar } from '../../components';
import { Sidebar } from '../../components/sidebar/sidebar'; 

const Home: React.FC = () => {

  return (
    <div className="container">
      {/* <Navbar /> */}
      <Sidebar />
      <div> 
        <div className="title-box">
          <h2 className="title-text">Default Page</h2>
          <p className="text">Essa é uma tela default.</p>
          <p className="text">Construa sua pagina dentro da classe Content.</p>
        </div>
        <div className="content">
          Content
        </div>
      </div>
    </div>
  );
}

export default Home;
