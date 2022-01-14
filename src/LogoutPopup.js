import React, {Component, useEffect, useState} from 'react'

import TutorialDataService from "./tutorial.service";
import { useAuthState } from "react-firebase-hooks/auth";


export default function LogoutPopup({closeToolTip}) {    
   
    const [user, loading, error] = useAuthState(TutorialDataService.auth);

    useEffect(() => {
        if (loading) {
            //Trigger loading anim?
            return;
        }
        if(!user) {
            closeToolTip();
        }
    }, [user, loading]);
    
    return (
        <div className="popup">
            <p className="popupHeader">Vill du logga ut?</p>
            <hr></hr>
            <button type="button" className="popupButton" onClick={() => {TutorialDataService.logout()}}>Logga ut</button>
        </div>
    )
}