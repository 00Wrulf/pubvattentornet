import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from './Home'
import Booking from './Booking'
import VattentornetDataService from '../services/vattentornet.service'
import { useAuthState } from 'react-firebase-hooks/auth'

function Header () {
  const [user] = useAuthState(VattentornetDataService.auth)
  return (
    <Router>
      <div className='header'>

        <ul>
          <li><a href='#about'>PUBEN</a></li>
          <li><a href='#beer'>ÖLEN</a></li>
        </ul>
        <ul>
          {user ? <li><Link to='/Booking' style={{ color: 'orange' }}>ADMIN</Link></li>
            : <li id='boka'><Link to='/Booking'>BOKA</Link></li>}
        </ul>
      </div>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/Booking' component={Booking} />
        {user
          ? <>
            <Route path='/Booking' component={Booking} />
          </> : <p> Unathorized </p>}
        <Route render={() => <h1>Oops, denna sida finns ej..</h1>} />
      </Switch>
    </Router>
  )
}

export default Header
