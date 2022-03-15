import React, { Component, useState, useEffect, useLayoutEffect, useRef, useReducer } from "react";
import Calendar from "react-calendar";
import isBefore from "date-fns/isBefore";
import isSameDay from "date-fns/isSameDay";
import differenceInMonths from "date-fns/differenceInMonths";
import format from "date-fns/format";
import './calendar.css'
import { parseISO } from "date-fns";
import axios from "axios";
import Popup from 'reactjs-popup';
import CreateBookingPopup from "./CreateBookingPopup";
import ConfirmBookings from "./ConfirmBookings";
import 'reactjs-popup/dist/index.css';
import './popup.css';
import TutorialDataService from "./tutorial.service";
import { useAuthState } from "react-firebase-hooks/auth";
import VattentornetService from "./vattentornet.service";


import { useCollection } from "react-firebase-hooks/firestore"
import { BarChartRounded } from "@material-ui/icons";

function Booking() {

  function isAuthenticated() {
    return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now();
  }

  const [user, loading, error] = useAuthState(TutorialDataService.auth);
  const [, fU] = useState(0);

  let isLoaded = false;

  const ref = useRef();
  const openTooltip = () => ref.current.open();


  // React hooks med variabler och setters.
  const [date, setDate] = useState(new Date());
  const [confirmedBookedDates, setConfirmedBookedDates] = useState([]);
  const [unconfirmedBookedDates, setUnconfirmedBookedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  var yesterday = new Date();
  yesterday.setHours(-24);
  yesterday.setDate(yesterday.getDate()-1); 
  const [confirmedBookings, loadingConfirmedBookings, errorLoadingConfirmedBookings] = useCollection(
  VattentornetService.getBookings().where("confirmed", "==", true).orderBy("date"));



  const reload = () => {
    setIsLoading(true);
  }

  //const [formData, setFormData] = useState('')

  // Call add booking
  // Skapa en rimlig form på detta att skicka till databasen.
  const receiveFormData = (popupFormData) => {
    //setFormData(popupFormData);
    console.log(popupFormData)
    console.log("DATUM: " + date)
    //addBooking(popupFormData);
  }

    //create your forceUpdate hook
    function useForceUpdate(){
      const [value, setValue] = useState(0); // integer state
      return () => setValue(value => value + 1); // update the state to force render
    }

    const forceUpdate = useForceUpdate();
  // Setter för datumvärden
  function onChange(nextDate) {
    setDate(nextDate);
  }

  // Använder axios inuti React hooks för att hämta bokade calenderdatum från databasen
  useEffect(() => {
    const result = TutorialDataService.getConfirmedBookings();
    setConfirmedBookedDates(result);
  }, [])



  // Funktion för att markera redan bokade datum i kalendern.
  // Jämför varje kalenderdatum med bokningsdatum från databasen
  // Ger vid träff den rutan ett klassnamn som kan nås via css.
  function markBookedDates({ date }) {

    if (barray.find(e => isSameDay(e.date, date))){
      return 'dateIsBooked'
    }
}

  useEffect(() => {
    const getAdminBookings = () => {
      /*
      const response = 
      await axios('/unconfirmedBookings', { params: { 'x-access-token': localStorage.getItem('x-access-token')} })
      .then(response => setUnconfirmedBookedDates(response.data))
      .catch(err => Promise.reject('Request Not Authenticated!'));
      */
     //setUnconfirmedBookedDates(getUnconfirmedBookings);
     setUnconfirmedBookedDates(TutorialDataService.getUnconfirmedBookings())
    };
    if(user) {
      getAdminBookings();
    }
  }, [user])

  /*
  useEffect(() => {
    setTimeout(() => {
      forceUpdate();
    }, 1000)
  }, [isLoading]);
*/
  

  // Lägger till valt datum i bokningen. useRef för att förhindra att denna körs vid första
  // renderingen.
  const firstRender = useRef(true);
  useEffect(() => {
   if (firstRender.current) {
     firstRender.current = false;
     return;
   } 
   //addBooking(date);
   console.log(format(date, "yyyy-MM-dd"));
   openTooltip();
}, [date])

  // Lägger till en ny bokning
  function addBooking (inBooking) {
    let newBooking = JSON.stringify({
      "email": inBooking.email, 
      "name": inBooking.name,
      "apartmentnr": inBooking.apartmentnr,
      "description": inBooking.description,
      "bookpub": inBooking.bookpub,
      "date": format(date, "yyyy-MM-dd")
    });

    const headers = {
      headers: { 
        'Content-Type': 'application/json'
      },
    };

    axios.post("https://vattentornet-server.herokuapp.com/addbooking", newBooking, headers)
      .then(response => {
        console.log("Status: " + response.status);
        console.log("Message: " + response.data);
      }).catch(error => {
        console.error("ERROR:", error);
      });
    }
    
    function tileDisabled({ date }) {
      // Disable tiles in month view only
        // Check if a date React-Calendar wants to check is on the list of disabled dates
        if (date < Date.now()) return date; // Kan inte boka datum innan idag
        if (date.getDay() == 4) return date; // Kan inte boka torsdagar
        if(differenceInMonths(date, Date.now()) > 2) return date; // Kan inte boka längre än 2 månader fram i tiden
        if (barray.find(e => isSameDay(e.date, date))) return date;

        //return ((date < Date.now()) || (differenceInMonths(Date.now(), date) > 1));
    }

    const barray = []
    
    return (
      <div className="content">
        {!loadingConfirmedBookings &&
        confirmedBookings.docs.map((doc) => 
        { barray.push({
          "email": doc.data().email, 
          "name": doc.data().name,
          "apartmentnr": doc.data().apartmentnr,
          "description": doc.data().description,
          "bookpub": doc.data().bookpub,
          "date": new Date(doc.data().date.toDate())
          })}
        )
      }
        <Popup ref={ref}>
          <CreateBookingPopup clickedDate={format(date, "yyyy-MM-dd")} receiveFormData={receiveFormData}/>
        </Popup>
        {user ? <h1>Hantera bokningar</h1> : <h1>Skicka bokningsförfrågan</h1>}
        <div className="calendar">
        <Calendar
          onChange={onChange}
          value={date}
          tileClassName={markBookedDates}
          tileDisabled={tileDisabled}
        />
        </div>
        {user && <ConfirmBookings confirmedBookings={confirmedBookings}/>}
    </div>
      )

}
export default Booking;
