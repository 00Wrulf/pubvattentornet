import React, { useEffect } from 'react'

import VattentornetDataService from "../../services/vattentornet.service";
import { useAuthState } from "react-firebase-hooks/auth";


export default function LogoutPopup({closePopup}) {    
   
    const [user, loading] = useAuthState(VattentornetDataService.auth);

    useEffect(() => {
        if (loading) {
            //Trigger loading anim?
            return;
        }
        // Funktionalitet för att stänga popup när utloggad
        if(!user) {
            closePopup();
        }
    }, [user, loading]);
    
    return (
        <div className="popup">
            <p className="popupHeader">Vill du logga ut?</p>
            <hr></hr>
            <button type="button" className="popupButton" onClick={() => {VattentornetDataService.logout()}}>Logga ut</button>
        </div>
    )
}