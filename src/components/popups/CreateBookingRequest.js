import React, {useState} from 'react'
import format from "date-fns/format"
import { useForm } from "react-hook-form"
import emailjs from '@emailjs/browser';
import VattentornetDataService from "../../services/vattentornet.service";

function CreateBookingRequest({clickedDate, closePopup}) {
    const {register, handleSubmit} = useForm();
    const [requestSuccessful, setRequestSuccessful] = useState(false);
    const [requestError, setRequestError] = useState(false);

    const onSubmit = (data) => {
        // Fyller i variabler för att maila den som bokar
        var emailTemplateParameters = {
            name: data.name,
            email: data.email,
            date: format(new Date(clickedDate), "yyyy-MM-dd")
        };

        // Lägger till bokningen som obekräftat i databasen (confirmed=false, unless specified)
        VattentornetDataService.addBookingRequest(
            data.email, 
            data.name, 
            data.apartmentnr, 
            data.description,
            data.bookpub,
            new Date(clickedDate)
        ).then(() => {
            emailjs.send('service_y6c7ucc', 'template_68urrpo', emailTemplateParameters, process.env.REACT_APP_EMAILJS_PUBLIC_KEY).then(
                setRequestSuccessful(true)
            )
        })
        .catch(() => {setRequestError(true)})
        }

    // Visa ej form om request har skickats iväg och är successful
    if(!requestSuccessful && !requestError)
    return (
        <div className="popup">
            <p className="popupHeader">Bokningsförfrågan för {clickedDate}</p>
            <hr></hr>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                    Mail *
                    <input type="email" placeholder="Din epostadress"
                    {...register("email", {
                        required: "Obligatoriskt",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, //regexp används för att bestämma formen på en mailadress.
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
            <button type="button" className="popupButton" onClick={() => closePopup()}>Stäng</button>
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

export default CreateBookingRequest;
