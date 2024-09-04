import React from 'react'

const Home: React.FC = () => {
  return (
    <div className='container'>
      <div className="title-box">
        <h2 className='title-text'>Default Page</h2>
        <p className='text'>Essa é uma tela default.</p>
        <p className='text'>Construa sua pagina dentro da classe Content.</p>
      </div>
      <div className="content">
        Content.
      </div>
    </div>
  )
}

export default Home