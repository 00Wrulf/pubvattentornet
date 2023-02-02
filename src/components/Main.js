import React from 'react'
import Header from './Header'
import bg from '../images/background/bg1.jpg'

function Main () {
  return (
    <div className='container'>
      <img className='bg' src={bg} />
      <div className='hwrapper'>
        <h1 className='title'>PUB VATTENTORNET</h1>
        <Header />
      </div>
    </div>
  )
};

export default Main
