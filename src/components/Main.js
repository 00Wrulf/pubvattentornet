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

  const closePopup = () => {
    user ? loginPopup.current.close() : logoutPopup.current.close()
  }
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
    <div className='reno'>
      <h1>Hej alla tornetentusiaster!</h1>
      <p> Vi håller just nu på med en välbehövd renovering av Vattentornet och därmed kommer allrummet inte vara bokbart mellan 1-31 januari! Om ni har några frågor skicka gärna ett mail till <a href='mailto: info@vattentor.net'>info@vattentor.net</a></p>
      <br />
      <p> Vi hoppas att ni kommer tillbaka snart för att se vad vi har gjort! </p>
    </div>
  )
};

export default Main
