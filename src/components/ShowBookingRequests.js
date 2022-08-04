import React, { useState, useRef } from 'react'
import format from 'date-fns/format'
import VattentornetDataService from '../services/vattentornet.service'
import Popup from 'reactjs-popup'
import BookingDetails from './popups/ShowBookingDetails'
import VattentornetService from '../services/vattentornet.service'
import { useCollection } from 'react-firebase-hooks/firestore'
import emailjs from '@emailjs/browser'

// TODO: Två imports till dataservice ATM. Ta bort ena.

function ShowBookingRequests ({ confirmedBookings }) {
  const [selectedBooking, setSelectedBooking] = useState([])
  const bookingDetailsPopup = useRef()

  // Lite av en fuling som kör databas requesten rätt i hooken, men lite busig får man väl vara. (jk, gör detta helst i firebase.js)
  const [unConfirmedBookings, loadingUnconfirmedBookings] = useCollection(
    VattentornetService.getBookings().where('confirmed', '!=', true).orderBy('confirmed').orderBy('date'))

  // Functionalitet för att stänga popupfönstret
  const closePopup = React.useCallback(() => {
    bookingDetailsPopup.current.close()
  }, [])

  // Ändrar bokningens status i databasen till confirmed och mailar den som bokade att bokningen är godkänd
  const confirmBooking = (inId, inName, inEmail, inDate) => {
    var emailTemplateParameters = {
      name: inName,
      email: inEmail,
      date: format(inDate.toDate(), 'yyyy-MM-dd')
    }
    VattentornetDataService.confirmBookingRequest(inId)
    emailjs.send('service_y6c7ucc', 'template_7wuv8yn', emailTemplateParameters, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
  }

  const displayBookingDetails = (inDate, inName, inApartmentnr, inDescription, inBookpub, inEmail, inId, inConfirmed) => {
    setSelectedBooking({
      date: inDate,
      name: inName,
      apartmentnr: inApartmentnr,
      description: inDescription,
      bookpub: inBookpub,
      email: inEmail,
      id: inId,
      confirmed: inConfirmed
    })
    bookingDetailsPopup.current.open()
  }

  // Flyttar ut konstanter för att minska kod-klutter i return()
  const tableHeadings = () => {
    return (
      <tr>
        <th>Bokningen avser</th>
        <th>Förfrågan skapades</th>
        <th>Namn</th>
        <th>Lägenhetsnr</th>
        <th>Beskrivning</th>
        <th>Bokat pub?</th>
        <th>Email</th>
        <th />
        <th />
      </tr>
    )
  }

  return (
    <div className='confirmBookings'>
      <h1> Bokningsförfrågningar </h1>
      <table className='bookingsTable'>
        <caption><h3>Obekräftade bokningar</h3></caption>
        <thead>
          {tableHeadings()}
        </thead>
        <tbody>
          {/* Fyller tabell med OBEKRÄFTADE bokningar */}
          {!loadingUnconfirmedBookings &&
            unConfirmedBookings.docs.map((booking) => (
              <tr key={booking.id}>
                <td>{format(new Date(booking.data().date.toDate()), 'yyyy-MM-dd')}</td>
                <td>{format(new Date(booking.data().dateCreated.toDate()), 'yy-MM-dd HH:mm')}</td>
                <td>{booking.data().name}</td>
                <td>{booking.data().apartmentnr}</td>
                <td>{booking.data().description}</td>
                <td>{booking.data().bookpub ? <input type='checkbox' checked disabled /> : <input type='checkbox' disabled />}</td>
                <td>{booking.data().email}</td>
                <td><button onClick={() => displayBookingDetails(booking.data().date, booking.data().name, booking.data().apartmentnr, booking.data().description, booking.data().bookpub, booking.data().email, booking.id, booking.data().confirmed)}>Visa bokning</button></td>
                {!booking.data().confirmed && <td><button onClick={() => { confirmBooking(booking.id, booking.data().name, booking.data().email, booking.data().date) }}>Bekräfta bokning</button></td>}
              </tr>
            ))}
        </tbody>
      </table>
      <table className='bookingsTable'>
        <caption><h3>Bekräftade bokningar</h3></caption>
        <thead>
          {tableHeadings()}
        </thead>
        <tbody>
          {/* Fyller tabell med BEKRÄFTADE bokningar */}
          {confirmedBookings &&
            confirmedBookings.docs.map((booking) => (
              <tr key={booking.id}>
                <td>{format(new Date(booking.data().date.toDate()), 'yyyy-MM-dd')}</td>
                <td>{format(new Date(booking.data().dateCreated.toDate()), 'yy-MM-dd HH:mm')}</td>
                <td>{booking.data().name}</td>
                <td>{booking.data().apartmentnr}</td>
                <td>{booking.data().description}</td>
                <td>{booking.data().bookpub ? <input type='checkbox' checked disabled /> : <input type='checkbox' disabled />}</td>
                <td>{booking.data().email}</td>
                <td><button onClick={() => displayBookingDetails(booking.data().date, booking.data().name, booking.data().apartmentnr, booking.data().description, booking.data().bookpub, booking.data().email, booking.id, booking.data().confirmed)}>Visa bokning</button></td>
              </tr>
            ))}
        </tbody>
      </table>
      <Popup ref={bookingDetailsPopup}><BookingDetails selectedBooking={selectedBooking} closePopup={closePopup} /></Popup>
    </div>
  )
}

export default ShowBookingRequests
