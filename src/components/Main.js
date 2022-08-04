import React, { useRef } from 'react'
import Header from './Header'
import Footer from './Footer'

import Popup from 'reactjs-popup'
import LoginPopup from './popups/Login'
import LogoutPopup from './popups/Logout'
import VattentornetDataService from '../services/vattentornet.service'
import { useAuthState } from 'react-firebase-hooks/auth'

// Funktionalitet som hämtar samtliga bilder i en mapp och slumpar dem som bakgrund för hemsidan
const backgrounds = importBackgrounds(require.context('../images/background', false, /\.(png|jpg|jpeg)$/))
const randomIndex = Math.floor(Math.random() * backgrounds.length)

function importBackgrounds (r) {
  return r.keys().map(r)
}

function Main () {
  const [user] = useAuthState(VattentornetDataService.auth)
  const loginPopup = useRef()
  const logoutPopup = useRef()

  // Stänger popup när inloggad eller utloggad. Detta kan göras direkt i knappen istället
  // Som i deleteBooking knappen i ShowBookingDetails. Då går det också att göra en "STÄNG" knapp
  // för login/logout-rutan.
  const openPopup = () => {
    !user ? loginPopup.current.open() : logoutPopup.current.open()
  }

  const closePopup = React.useCallback(() => {
    user ? loginPopup.current.close() : logoutPopup.current.close()
  })
  // Linje ovan tar bort varning för missing dependency för user

  // Inline CSS för att ha variabel för slumpad bakgrund. SASS eller liknande CSS extensions kan förmodligen hantera
  // detta snyggare
  const bg = {
    height: '100vh',
    backgroundColor: 'blue',
    backgroundImage:
      `linear-gradient(rgba(255, 255, 255, 0) 20vh, rgba(0, 0, 0, 1.0) 100%), url(${backgrounds[randomIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '-2vw'
  }

  return (
    <div style={bg} className='bg'>
      <Header />

      <Popup ref={loginPopup}><LoginPopup closePopup={closePopup} /></Popup>
      <Popup ref={logoutPopup}><LogoutPopup closePopup={closePopup} /></Popup>

      <Footer openPopup={openPopup} />
    </div>
  )
};

export default Main
