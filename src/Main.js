import React, {Component, useRef, useState} from "react"
import Header from "./Header"
import BackgroundSlider from "react-background-slider"
import Footer from "./Footer";
import Popup from "reactjs-popup";
import LoginPopup from "./LoginPopup"
import LogoutPopup from "./LogoutPopup";

import useForceUpdate from 'use-force-update';
import TutorialDataService from "./tutorial.service";
import { useAuthState } from "react-firebase-hooks/auth";

function importBackgrounds(r){
    return r.keys().map(r);
  }

  const backgrounds = importBackgrounds(require.context("./images/background", false, /\.(png|jpg|jpeg)$/))
  const randomIndex = Math.floor(Math.random() * backgrounds.length)
    
    // Call add booking
    // Skapa en rimlig form på detta att skicka till databasen.
  const recieveFormData = (loginFormData) => {
    alert(loginFormData)
  }

function setToken(userToken) {
  localStorage.setItem('x-access-token', userToken.token);
  localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
}

function isAuthenticated() {
  return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now();
}
 
function Main() {
  const [user, loading, error] = useAuthState(TutorialDataService.auth);
  const forceUpdate = useForceUpdate();
  let isAuth = isAuthenticated();

  const loginPopup = useRef();
  const logoutPopup = useRef();

  const openPopup = () => {
    !user ? loginPopup.current.open() : logoutPopup.current.open();
    }
  const closePopup = React.useCallback(() => {
    user ? loginPopup.current.close() : logoutPopup.current.close();
  });
      const bg = {
          height: '101vh',
          backgroundColor: 'blue',
          backgroundImage: 
          `linear-gradient(rgba(255, 255, 255, 0) 20vh, rgba(0, 0, 0, 1.0) 100%), url(${backgrounds[randomIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '90vh',
          width: '-2vw'
      }
  return (
      <div style={bg} className = "bg">
      <Header/>
      <Popup ref={loginPopup}><LoginPopup setToken={setToken} closePopup={closePopup}/></Popup>
      <Popup ref={logoutPopup}><LogoutPopup setToken={setToken} closeToolTip={closePopup}/></Popup>
      <Footer openPopup={openPopup}/>
      </div>
  );
};

export default Main;