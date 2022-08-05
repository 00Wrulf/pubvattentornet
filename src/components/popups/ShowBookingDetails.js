import React, { useState } from 'react'
import format from "date-fns/format"
import { useForm } from "react-hook-form"
import VattentornetDataService from "../../services/vattentornet.service";

export default function BookingDetails({selectedBooking, closePopup}) {    
    const {register, handleSubmit} = useForm();
    const [requestSuccessful] = useState(false);
    const [requestError] = useState(false);
    const [editForm, setEditForm] = useState(false);

    const onSubmit = (data) => {
        // Tillåt bara förändringar om 'redigera' knappen har tryckts
        if (editForm){
            let bookpub = data.bookpub ? true : false; // Ful-lösning för att få en unchecked checkbox att vara 'false' och inte undefined
            VattentornetDataService.updateBookingRequest(
                selectedBooking.id,
                data.email, 
                data.name, 
                data.apartmentnr, 
                data.description,
                bookpub,
                new Date(data.date),
                )
        }
        else {
            VattentornetDataService.confirmBookingRequest(selectedBooking.id)
        }
    }

    // Visa ej form om request har skickats iväg och är successful
    if(!requestSuccessful && !requestError)
    return (
        <div className="popup">
            <p className="popupHeader">Bokningsförfrågan för {selectedBooking.name}</p>
            <hr></hr>
            <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Datum *
                <input type="text" placeholder="Önskat datum" disabled={!editForm}
                {...register("date", {
                    required: "Obligatoriskt", value: format(new Date(selectedBooking.date.toDate()), "yyyy-MM-dd")
                })}/>
            </label>
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
                <input type="checkbox" disabled={!editForm} defaultChecked={selectedBooking.bookpub}
                {...register("bookpub", {value: selectedBooking.bookpub})}/>
            </label>
            {!editForm && <button type="button" className="popupButton" onClick={() => setEditForm(true)}>Redigera bokning</button>}
            {editForm && <input type="submit" value={"Uppdatera och bekräfta bokning"}/>}
            <button type="button" className="popupButton" onClick={() => {VattentornetDataService.deleteBooking(selectedBooking.id); closePopup()}}>Ta bort bokning</button>
            </form>
            <button type="button" className="popupButton" onClick={() => closePopup()}>Stäng</button>
        </div>
    )
}