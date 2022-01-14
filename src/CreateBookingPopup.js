import React, {useState} from 'react'
import Booking from './Booking'
import { Button } from 'semantic-ui-react';
import { appendErrors, useForm } from "react-hook-form"
import TutorialDataService from "./tutorial.service";

function CreateBookingPopup({clickedDate, receiveFormData}) {
    const {register, handleSubmit, errors} = useForm();
    const [requestSuccessful, setRequestSuccessful] = useState(false);
    const [requestError, setRequestError] = useState(false);

    const onSubmit = (data) => {
        TutorialDataService.addBookingRequest(
            data.email, 
            data.name, 
            data.apartmentnr, 
            data.description,
            data.bookpub,
            new Date(clickedDate)
        ).then(() => {setRequestSuccessful(true)})
        .catch(() => {setRequestError(true)})
        }

    if(!requestSuccessful && !requestError)
    return (
        <div className="popup">
            <p className="popupHeader">Bokningsförfrågan för {clickedDate}</p>
            <hr></hr>
            {console.log(clickedDate)};
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                    Mail *
                    <input type="email" placeholder="Din epostadress"
                    {...register("email", {
                        required: "Obligatoriskt",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Ogiltig emailadress"
                        }
                    })} 
                />
                </label>
                <label>
                    Ditt namn *
                    <input type="text" placeholder="För- och efternamn"
                    {...register("name", {
                        required: "Obligatoriskt"
                    })}/>
                </label>
                <label>
                    Lägenhetsnummer
                    <input type="text" placeholder="Ditt lägenhetsnummer" {...register("apartmentnr")}/>
                </label>
                <label>
                    Beskrivning *
                    <input type="text" placeholder="Vad skall du göra? Hur många är ni? Vilka är ni?"
                    {...register("description", {
                        required: "Obligatoriskt"
                    })}/>
                </label>
                <label>
                    Boka puben? (Kryssa i denna om du vill ha pub-personal, till exempel för sektionspub)
                    <input type="checkbox"
                    {...register("bookpub")}/>
                </label>
                <input type="submit" value="Skicka!"/>
            </form>
        </div>
    )
    if(requestSuccessful)
    return(
        <p style={{color: 'black'}}>Bokningsförfrågan skickad. En kopia på din förfrågan skickas till angiven mailadress och där får du även svar på din förfrågan.</p>
    )
    if(requestError)
    return(
        <p style={{color: 'red'}}>Något gick fel!</p>
    )
}

export default CreateBookingPopup;
