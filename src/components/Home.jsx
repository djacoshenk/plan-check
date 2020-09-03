import React from 'react';

import svg from '../images/pencil.svg';

function Home() {
  return (
    <div className='home-container'>
      <div className='icon-container'>
        <img src={svg} alt='pencil-icon' width='30px' height='30px' />
      </div>
      <h1 className='home-main-title'>Welcome to We Plan Check</h1>
      <h3 className='home-sub-title'>
        Online plan check services for architects, developers, and engineers.
      </h3>
    </div>
  );
}

export default Home;
