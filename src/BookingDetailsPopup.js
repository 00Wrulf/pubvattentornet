import React, {Component, useEffect, useState} from 'react'
import ConfirmBookings from './ConfirmBookings';
import { appendErrors, useForm } from "react-hook-form"
import TutorialDataService from "./tutorial.service";
import { useAuthState } from "react-firebase-hooks/auth";

export default function BookingDetailsPopup({selectedBooking, closePopup}) {    
    const {register, handleSubmit, errors} = useForm();
    const [requestSuccessful, setRequestSuccessful] = useState(false);
    const [requestError, setRequestError] = useState(false);
    const [editForm, setEditForm] = useState(false);

    const onSubmit = (data) => {
        if (editForm)
        TutorialDataService.updateBookingRequest(
            data.email, 
            data.name, 
            data.apartmentnr, 
            data.description,
            data.bookpub,
            new Date()
        ).then(() => {setRequestSuccessful(true)})
        .catch(() => {setRequestError(true)})
        else {
            TutorialDataService.confirmBookingRequest(selectedBooking.id)
        }
        }

if(!requestSuccessful && !requestError)
return (
    <div className="popup">
        <p className="popupHeader">Bokningsförfrågan för {selectedBooking.name}</p>
        <hr></hr>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
                Mail *
                <input type="email" placeholder="Din epostadress" disabled={!editForm}
                {...register("email", {
                    required: "Obligatoriskt", value: selectedBooking.email,
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Ogiltig emailadress"
                    }
                })} 
            />
            </label>
            <label>
                Ditt namn *
                <input type="text" placeholder="För- och efternamn" disabled={!editForm}
                {...register("name", {
                    required: "Obligatoriskt", value: selectedBooking.name
                })}/>
            </label>
            <label>
                Lägenhetsnummer
                <input type="text" placeholder="Ditt lägenhetsnummer" disabled={!editForm} 
                {...register("apartmentnr", {value: selectedBooking.apartmentnr})}/>
            </label>
            <label>
                Beskrivning *
                <input type="text" placeholder="Vad skall du göra? Hur många är ni? Vilka är ni?" disabled={!editForm}
                {...register("description", {
                    required: "Obligatoriskt", value: selectedBooking.description
                })}/>
            </label>
            <label>
                Boka puben? (Kryssa i denna om du vill ha pub-personal, till exempel för sektionspub)
                <input type="checkbox" disabled={!editForm} checked={selectedBooking.bookpub}
                {...register("bookpub",)}/>
            </label>
            <button type="button" className="popupButton" onClick={() => setEditForm(true)}>Redigera bokning</button>
            <input type="submit" value={!editForm ? "Bekräfta bokning" : "Uppdatera och bekräfta bokning"}/>
        </form>
    </div>
)}