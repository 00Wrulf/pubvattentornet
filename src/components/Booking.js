import React, { useState, useEffect, useRef } from 'react'
import Calendar from 'react-calendar'
import isSameDay from 'date-fns/isSameDay'
import differenceInMonths from 'date-fns/differenceInMonths'
import format from 'date-fns/format'
import Popup from 'reactjs-popup'
import CreateBookingRequest from './popups/CreateBookingRequest'
import ShowBookingRequests from './ShowBookingRequests'
import VattentornetDataService from '../services/vattentornet.service'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import 'reactjs-popup/dist/index.css'
import '../styles/calendar.css'
import '../styles/popup.css'

function Booking () {
  // Array för alla bekräftade bokningar. Ska populera kalendern.
  const confirmedBookingsArray = []

  // Kollar om admin är inloggad, stöd för loading och error handling finns men används ej just nu.
  const [user] = useAuthState(VattentornetDataService.auth)

  // Hooks-functionen useRef() används för att ha koll på om det är första ggn sidan laddas
  // samt status på om popupfönster är öppet eller stängt. Se https://react-popup.elazizi.com/controlled-popup
  const bookingPopup = useRef()
  const openBookingPopup = () => bookingPopup.current.open()

  // Functionalitet för att stänga popupfönstret
  const closePopup = React.useCallback(() => {
    bookingPopup.current.close()
  }, [])

  // React hooks med variabler och setters.
  const [date, setDate] = useState(new Date())
  const [confirmedBookings, loadingConfirmedBookings] = useCollection(VattentornetDataService.getBookings().where('confirmed', '==', true).orderBy('date'))

  // Setter för datumvärden
  function onChange (nextDate) {
    setDate(nextDate)
  }

  // Funktion för att markera redan bokade datum i kalendern.
  // Jämför varje kalenderdatum med bokningsdatum från databasen
  // Ger vid träff den rutan ett klassnamn som kan nås via CSS.
  function markBookedDates ({ date }) {
    if (confirmedBookingsArray.find(e => isSameDay(e.date, date))) {
      return 'dateIsBooked'
    }
  }

  // Öppnar bokningsrutan för valt datum. useRef() används för att förhindra att denna körs vid första
  // renderingen för dagens datum pga bugg med hur react-big-calendar renderar. Se https://nikolamargit.dev/skip-useeffect-hook-on-first-render/
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    openBookingPopup()
  }, [date])

  function tileDisabled ({ date }) {
    if ((!isSameDay(Date.now(), date)) && (date < Date.now())) return date // Avaktivera bokningar för datum innan idag men inte idag
    if (date.getDay() === 4 || date.getDay() === 5) return date // Avaktivera bokningar för torsdagar och fredagar pga puben är öppen
    if (differenceInMonths(date, Date.now()) > 3) return date // Avaktivera bokningar längre än 3 månader fram i tiden
    if (confirmedBookingsArray.find(e => isSameDay(e.date, date))) return date
    if (date.getMonth() === 0) return date
  }

  return (
    <div className='bContent'>

      {
        // Ladda bekräftade bokningar och sätt in i array
        !loadingConfirmedBookings &&
        confirmedBookings.docs.map((doc) => {
          confirmedBookingsArray.push({
            email: doc.data().email,
            name: doc.data().name,
            apartmentnr: doc.data().apartmentnr,
            description: doc.data().description,
            bookpub: doc.data().bookpub,
            date: new Date(doc.data().date.toDate()) // Konvertera databas-svar till Date()
          })
          return null // Pga funktion behöver return
        }
        )
      }
      {/* Popup som aktiveras när ett datum klickas på i calender. */}
      <Popup ref={bookingPopup}>
        <CreateBookingRequest clickedDate={format(date, 'yyyy-MM-dd')} closePopup={closePopup} />
      </Popup>

      {<h1>Skapa bokningsförfrågan</h1>}

      <div className='calendar'>
        <Calendar
          onChange={onChange}
          value={date}
          tileClassName={markBookedDates}
          tileDisabled={tileDisabled}
        />
      </div>
      {/* Om inloggad som admin, rendera bokningshanterare */}
      {user && <ShowBookingRequests confirmedBookings={confirmedBookings} />}

      <div className='BoxInfo'>
        <p className='BookedBoxPub' />
        <h3>Datumet är passerat/PUB!</h3>
        <p className='BookedBoxIndivid' />
        <h3>Datumet är privat bokat</h3>
        <p className='Free' />
        <h3>Datumet är ledigt!</h3>
      </div>
    </div>
  )
}
export default Booking
