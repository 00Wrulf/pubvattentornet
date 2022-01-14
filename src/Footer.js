import React, {useState} from 'react'
import {ImFacebook2} from "react-icons/im";
import {ImInstagram} from "react-icons/im";
import {FiLogIn} from "react-icons/fi"
import {FiLogOut} from "react-icons/fi"
import TutorialDataService from "./tutorial.service";
import { useAuthState } from "react-firebase-hooks/auth";
import useForceUpdate from 'use-force-update';

import Popup from "reactjs-popup";
import LoginPopup from "./LoginPopup"

function Footer(props) {

    // Using state to refresh footer when logged in, does not work perfect
    const [user, loading, error] = useAuthState(TutorialDataService.auth);

    const [loggedIn, setLoggedIn] = useState('');
    const {openPopup} = props;
    const loginIconHandler = () =>{
        localStorage.removeItem("x-access-token");
        setLoggedIn('false');
    }
    return (
        <footer className="footer">
            <h4>© Pub Vattentornet {new Date().getFullYear()}</h4>
            <a href={`https://www.facebook.com/Pub.Vattentornet`} target="_blank" className="socialSymbol"><ImFacebook2 color={"black"} size={25}/></a>
            <a href={`https://www.instagram.com/pubvattentornet/`} target="_blank" className="socialSymbol"><ImInstagram color={"black"} size={25}/></a>
            {!user
            ? <a onClick={openPopup} target="_blank" className="loginSymbol" ><FiLogIn color={"black"} size={25}/></a>
            : <a onClick={openPopup} target="_blank" className="loginSymbol" ><FiLogOut color={"red"} size={25}/></a>}
        </footer>
    )
}

export default Footer;