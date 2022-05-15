import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom"
import Home from "./Home"
import Puben from "./Puben"
import Booking from "./Booking"
import Beer from "./Beer"
import logo from "../images/logo/logoRound.png"
import VattentornetDataService from "../services/vattentornet.service";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
    const [user] = useAuthState(VattentornetDataService.auth);
    return(
        <Router>
                <div className="header">
                <Link to="/"><img className="logo" src={logo} alt="Home"/></Link>
                <ul>
                    <li><Link to="/Puben">PUBEN</Link></li>
                    <li><Link to="/Beer">ÖLEN</Link></li>
                    {user ? <li><Link to="/Booking" style={{color: 'orange'}}>ADMIN</Link></li>
                    : <li><Link to="/Booking">BOKA</Link></li>}
            </ul>
                </div>
                <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/Puben" component={Puben}/>
                <Route path="/Beer" component={Beer}/>
                <Route path="/Booking" component={Booking}/>
                {user ?
                    <>
                    <Route path="/Booking" component={Booking}/>
                    </> : <p> Unathorized </p>
                }
                <Route render={() => <h1>Oops, denna sida finns ej..</h1>}/>
                </Switch>
      </Router>
    )
}

export default Header;