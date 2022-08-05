import React from 'react'
import { ImFacebook2, ImInstagram } from 'react-icons/im'

import { FiLogIn, FiLogOut } from 'react-icons/fi'

import VattentornetDataService from '../services/vattentornet.service'
import { useAuthState } from 'react-firebase-hooks/auth'

function Footer (props) {
  // Använder state för att refresha footern när man är inloggad. Funkar ej perfekt.
  const [user] = useAuthState(VattentornetDataService.auth)

  const { openPopup } = props

  return (
    <footer className='footer'>
      <h1>Har du en fråga? Maila oss på <a href='mailto: info@vattentor.net'>info@vattentor.net</a>!</h1>
      <h4>© Pub Vattentornet {new Date().getFullYear()}</h4>
      <a href='https://www.facebook.com/Pub.Vattentornet' target='_blank' rel='noopener noreferrer' className='socialSymbol'><ImFacebook2 color='#DB8C7B' size={25} /></a>
      <a href='https://www.instagram.com/pubvattentornet/' target='_blank' rel='noopener noreferrer' className='socialSymbol'><ImInstagram color='#DB8C7B' size={25} /></a>
      {!user
        ? <a onClick={openPopup} target='_blank' className='loginSymbol'><FiLogIn color='black' size={25} /></a>
        : <a onClick={openPopup} target='_blank' className='loginSymbol'><FiLogOut color='red' size={25} /></a>}
    </footer>
  )
}

export default Footer
