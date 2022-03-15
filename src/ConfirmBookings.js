import React, {useState, useRef, useEffect, useReducer} from 'react'
import format from "date-fns/format"
import axios from "axios";
import TutorialDataService from './tutorial.service';
import Popup from 'reactjs-popup';
import BookingDetailsPopup from './BookingDetailsPopup';
import Booking from './Booking';
import VattentornetService from "./vattentornet.service";
import { useCollection } from "react-firebase-hooks/firestore"
import emailjs from '@emailjs/browser';


function ConfirmBookings( {confirmedBookings} ) {

    const [selectedBooking, setSelectedBooking] = useState([])
    const bookingDetailsPopup = useRef();
    const [unConfirmedBookings, loadingUnconfirmedBookings, errorLoadingUnconfirmedBookings] = useCollection(
        VattentornetService.getBookings().where("confirmed", "!=", true).orderBy("confirmed").orderBy("date"));
      
    const closePopup = React.useCallback(() => {
        bookingDetailsPopup.current.close();

      });
    
    const confirmBooking = (inId, inName, inEmail, inDate) => {
        var emailTemplateParameters = {
            name: inName,
            email: inEmail,
            date: format(inDate.toDate(), "yyyy-MM-dd")
        };
        TutorialDataService.confirmBookingRequest(inId);
        emailjs.send('service_3hcqn6k', 'template_7wuv8yn', emailTemplateParameters, 'user_513JMnPUY4q9AaYbHnntm')
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
        });
        bookingDetailsPopup.current.open();
    }
    /*
    const DisplayData = bookings.unconfirmedBookedDates.map(
        (booking)=>{
            return(
                <tr key={booking.id}>
                        <td>{format(new Date(booking.date), "yyyy-MM-dd")}</td>
                        <td>{booking.name}</td>
                        <td>{booking.apartmentnr}</td>
                        <td>{booking.description}</td>  
                        <td>{booking.bookpub ? <p>heej</p> : <p>neej</p>}</td>
                        <td>{booking.email}</td>
                        <td><button onClick={() => {confirmBooking(booking.id)}}>Bekräfta</button></td>
                        <td><button onClick={() => displayBookingDetails(booking.name, booking.apartmentnr, booking.description, booking.bookpub, booking.email, booking.id)}>Visa bokning</button></td>
                </tr>
            )
        }
    )
    */

    const tableHeadings = () => {
        return(
            <tr>
            <th>Bokningen avser</th>
            <th>Förfrågan skapades</th>
            <th>Namn</th>
            <th>Lägenhetsnr</th>
            <th>Beskrivning</th>
            <th>Bokat pub?</th>
            <th>Email</th>
            <th></th>
            <th></th>
        </tr>
        )
    }

    return(
        <div className="confirmBookings">
        <h1> Bokningsförfrågningar </h1>
        <table className="bookingsTable">
            <caption><h3>Obekräftade bokningar</h3></caption>
            <thead>
                {tableHeadings()}
            </thead>
        <tbody>
            {!loadingUnconfirmedBookings
            && unConfirmedBookings
            && unConfirmedBookings.docs.map((booking) => (
                <tr key={booking.id}>
                <td>{format(new Date(booking.data().date.toDate()), "yyyy-MM-dd")}</td>
                <td>{format(new Date(booking.data().dateCreated.toDate()), "yy-MM-dd HH:mm")}</td>
                <td>{booking.data().name}</td>
                <td>{booking.data().apartmentnr}</td>
                <td>{booking.data().description}</td>  
                <td>{booking.data().bookpub ? <p>heej</p> : <p>neej</p>}</td>
                <td>{booking.data().email}</td>
                <td><button onClick={() => displayBookingDetails(booking.data().date, booking.data().name, booking.data().apartmentnr, booking.data().description, booking.data().bookpub, booking.data().email, booking.id, booking.data().confirmed)}>Visa bokning</button></td>
                {!booking.data().confirmed && <td><button onClick={() => {confirmBooking(booking.id, booking.data().name, booking.data().email, booking.data().date)}}>Bekräfta bokning</button></td>}
                </tr>
            ))
            }
        </tbody>
    </table>
    <table className="bookingsTable">
            <caption><h3>Bekräftade bokningar</h3></caption>
            <thead>
                {tableHeadings()}
            </thead>
        <tbody>
            {confirmedBookings
            && confirmedBookings.docs.map((booking) => (
                <tr key={booking.id}>
                <td>{format(new Date(booking.data().date.toDate()), "yyyy-MM-dd")}</td>
                <td>{format(new Date(booking.data().dateCreated.toDate()), "yy-MM-dd HH:mm")}</td>
                <td>{booking.data().name}</td>
                <td>{booking.data().apartmentnr}</td>
                <td>{booking.data().description}</td>  
                <td>{booking.data().bookpub ? <p>heej</p> : <p>neej</p>}</td>
                <td>{booking.data().email}</td>
                <td><button onClick={() => displayBookingDetails(booking.data().date, booking.data().name, booking.data().apartmentnr, booking.data().description, booking.data().bookpub, booking.data().email, booking.id, booking.data().confirmed)}>Visa bokning</button></td>
                </tr>
            ))
            }
        </tbody>
    </table>
    <Popup ref={bookingDetailsPopup}><BookingDetailsPopup selectedBooking={selectedBooking} closePopup={closePopup}/></Popup>
        </div>
    )
 }
/*


    return (
        <div className="ConfirmBookings">
            <table>
                <thead>
                    <tr>
                        <th colspan="2"> Obekräftade bokningar </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Email</td>
                        <td>Name</td>
                        <td>Lägenhetsnr</td>
                        <td>Beskrivning</td>
                        <td>Bokat pub</td>
                        <td>Beskrivning</td>
                    </tr>
                {bookings.unconfirmedBookedDates.map((booking) =>
                        <td>{booking.email}</td> +
                        <td>{booking.name}</td> +
                        <td>{booking.apartmentnr}</td> +
                        <td>{booking.description}</td> +
                        <td>{booking.bookpub}</td> +
                        <td>{booking.date}</td>
                        )}
                </tbody>
            </table>
        </div>
    )

}
*/
export default ConfirmBookings;