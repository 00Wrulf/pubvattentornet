import React, { useRef } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from './Home'
import Booking from './Booking'
import Faq from './pages/Faq'
import Beer from './pages/Beer'
import Work from './pages/Work'
import About from './pages/About'
import logo from '../images/logo/placeholder.jpeg'
import Footer from './Footer'
import Popup from 'reactjs-popup'
import LoginPopup from './popups/Login'
import LogoutPopup from './popups/Logout'
import VattentornetDataService from '../services/vattentornet.service'
import { useAuthState } from 'react-firebase-hooks/auth'

function Header () {
  const [user] = useAuthState(VattentornetDataService.auth)
  const loginPopup = useRef()
  const logoutPopup = useRef()

  // Stänger popup när inloggad eller utloggad. Detta kan göras direkt i knappen istället
  // Som i deleteBooking knappen i ShowBookingDetails. Då går det också att göra en "STÄNG" knapp
  // för login/logout-rutan.
  const openPopup = () => {
    !user ? loginPopup.current.open() : logoutPopup.current.open()
  }

  const closePopup = () => {
    user ? loginPopup.current.close() : logoutPopup.current.close()
  }
  return (
    <Router>
      <div className='header'>
        {/* <Link to='/Home'><img className='hlogo' src={logo} alt='Home' /></Link> */}
        <ul>
          <li><Link to='/Home'>HOME</Link></li>
          <br />
          <li><Link to='/About'>OM OSS</Link></li>
          <br />
          <li><Link to='/Faq'>FAQ</Link></li>
          <br />
          <li><Link to='/Beer'>ÖLEN</Link></li>
          <br />
          <li><Link to='/Work'>JOBBA</Link></li>
          <br />
          {user ? <li><Link to='/Booking' style={{ color: 'orange' }}>ADMIN</Link></li>
            : <li><Link to='/Booking'>BOKA</Link></li>}
          <br />

          <li><Link to='/Contact'>KONTAKT</Link></li>
        </ul>
      </div>
      <div className='headerContent'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/Home' component={Home} />
          <Route path='/About' component={About} />
          <Route path='/Faq' component={Faq} />
          <Route path='/Beer' component={Beer} />
          <Route path='/Work' component={Work} />
          <Route path='/Booking' component={Booking} />
          {user
            ? <>
              <Route path='/Booking' component={Booking} />
            </> : <p> Unauthorized </p>}
          <Route render={() => <h1>Oops, denna sida finns ej..</h1>} />
        </Switch>
      </div>

      <div className='fotnot'>
        <Popup ref={loginPopup}><LoginPopup closePopup={closePopup} /></Popup>
        <Popup ref={logoutPopup}><LogoutPopup closePopup={closePopup} /></Popup>

        <Footer openPopup={openPopup} />
      </div>

    </Router>
  )
}

export default Header
