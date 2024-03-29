import React from 'react'
import { FiLogIn, FiLogOut } from 'react-icons/fi'

import VattentornetDataService from '../services/vattentornet.service'
import { useAuthState } from 'react-firebase-hooks/auth'

function Footer (props) {
  // Använder state för att refresha footern när man är inloggad. Funkar ej perfekt.
  const [user] = useAuthState(VattentornetDataService.auth)

  const { openPopup } = props

  return (
    <footer className='footer'>
      <ul>
        <li>
          <h4>© Pub Vattentornet {new Date().getFullYear()}</h4>
          {!user
            ? <a onClick={openPopup} target='_blank' className='loginSymbol'><FiLogIn color='rgb(51, 69, 71)' size={25} /></a>
            : <a onClick={openPopup} target='_blank' className='loginSymbol'><FiLogOut color='red' size={25} /></a>}
        </li>

      </ul>

    </footer>
  )
}

export default Footer
