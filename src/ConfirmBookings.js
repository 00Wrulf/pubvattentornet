import React, {useState, useRef, useEffect, useReducer} from 'react'
import format from "date-fns/format"
import axios from "axios";
import TutorialDataService from './tutorial.service';
import Popup from 'reactjs-popup';
import BookingDetailsPopup from './BookingDetailsPopup';
import Booking from './Booking';

function ConfirmBookings( bookings, {fU} ) {

    const [selectedBooking, setSelectedBooking] = useState([])
    const bookingDetailsPopup = useRef();


    const closePopup = React.useCallback(() => {
        bookingDetailsPopup.current.close();

      });
    
    const confirmBooking = (id) => {
        TutorialDataService.confirmBookingRequest(id);
    
    }
    

    const displayBookingDetails = (inName, inApartmentnr, inDescription, inBookpub, inEmail, inId) => {
        setSelectedBooking({
            name: inName,
            apartmentnr: inApartmentnr,
            description: inDescription,
            bookpub: inBookpub,
            email: inEmail,
            id: inId
        });
        bookingDetailsPopup.current.open();
    }
    
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
    return(
        <div className="confirmBookings">
        <h1> Bokningsförfrågningar </h1>
        <table className="bookingsTable">
            <thead>
                <tr>
                    <th>Datum</th>
                    <th>Namn</th>
                    <th>Lägenhetsnr</th>
                    <th>Beskrivning</th>
                    <th>Bokat pub?</th>
                    <th>Email</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
        <tbody>
            {DisplayData}
        </tbody>
    </table>
    <button onClick={() => {window.location.reload()}}></button>
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