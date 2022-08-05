import React from 'react'
import {ImFacebook2} from "react-icons/im";
import {ImInstagram} from "react-icons/im";
import {FiLogIn} from "react-icons/fi"
import {FiLogOut} from "react-icons/fi"
import VattentornetDataService from "../services/vattentornet.service";
import { useAuthState } from "react-firebase-hooks/auth";


function Footer(props) {

    // Använder state för att refresha footern när man är inloggad. Funkar ej perfekt.
    const [user] = useAuthState(VattentornetDataService.auth);

    const {openPopup} = props;

    return (
        <footer className="footer">
            <h4>© Pub Vattentornet {new Date().getFullYear()}</h4>
            <a href={`https://www.facebook.com/Pub.Vattentornet`} target="_blank" rel="noopener noreferrer" className="socialSymbol"><ImFacebook2 color={"black"} size={25}/></a>
            <a href={`https://www.instagram.com/pubvattentornet/`} target="_blank" rel="noopener noreferrer" className="socialSymbol"><ImInstagram color={"black"} size={25}/></a>
            {!user
            ? <a onClick={openPopup} target="_blank" className="loginSymbol" ><FiLogIn color={"black"} size={25}/></a>
            : <a onClick={openPopup} target="_blank" className="loginSymbol" ><FiLogOut color={"red"} size={25}/></a>}
        </footer>
    )
}

export default Footer;