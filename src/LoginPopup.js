import React, {Component, useEffect, useState} from 'react'
import Main from './Main'
import { Button } from 'semantic-ui-react'
import { appendErrors, useForm } from "react-hook-form"
import PropTypes from 'prop-types'
import axios from "axios";

import TutorialDataService from "./tutorial.service";
import { useAuthState } from "react-firebase-hooks/auth";


export default function LoginPopup({setToken, closePopup}) {

    const {register, handleSubmit, setError, formState: { errors } } = useForm();
    
   
    const onSubmit = (data) => {
        TutorialDataService.signInWithEmailAndPassword(data.email, data.password);
      }

    const onError = (errors) => {
        setError("customError", { type: "server side", message: "Felaktig email eller lösenord."});
        console.log("neee");
    }

    const [user, loading, error] = useAuthState(TutorialDataService.auth);

    useEffect(() => {
        if (loading) {
            //Trigger loading anim?
            return;
        }
        if(user) {
            closePopup();
        }
    }, [user, loading]);
    
    return (
        <div className="popup">
            <p className="popupHeader">Logga in</p>
            <hr></hr>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <label>
                    Email *
                    <input 
                        type="email" 
                        placeholder="Din email"
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
                    Lösenord *
                    <input 
                        type="text" 
                        placeholder="Lösenord"
                        {...register("password", {
                        required: "Obligatoriskt"
                    })}/>
                </label>
                <p style={{color: 'red'}}>{errors.customError?.message}</p>
                <input type="submit" value="Logga in"/>
            </form>

        </div>
    )
}

LoginPopup.propTypes = {
    setToken: PropTypes.func.isRequired
}
