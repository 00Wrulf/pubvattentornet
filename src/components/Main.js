import React, { useRef } from 'react'
import Header from './Header'
import Footer from './Footer'
import Popup from 'reactjs-popup'
import LoginPopup from './popups/Login'
import LogoutPopup from './popups/Logout'
import VattentornetDataService from '../services/vattentornet.service'
import { useAuthState } from 'react-firebase-hooks/auth'

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

  const closePopup = () => {
    user ? loginPopup.current.close() : logoutPopup.current.close()
  }
  // Linje ovan tar bort varning för missing dependency för user

  return (
    <div className='container'>
      <div className='hwrapper'>
        <Header />
      </div>
      <div className='fotnot'>
        <Popup ref={loginPopup}><LoginPopup closePopup={closePopup} /></Popup>
        <Popup ref={logoutPopup}><LogoutPopup closePopup={closePopup} /></Popup>

        <Footer openPopup={openPopup} />
      </div>
    </div>
  )
};

export default Main
