import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from './Home'
import Booking from './Booking'
import Puben from './Puben'
import Beer from './Beer'
import VattentornetDataService from '../services/vattentornet.service'
import { useAuthState } from 'react-firebase-hooks/auth'

function Header () {
  const [user] = useAuthState(VattentornetDataService.auth)
  return (
    <Router>
      <div className='header'>
        <ul>
          <li><Link to='/Home'>HOME</Link></li>
          <li><Link to='/Puben'>PUBEN</Link></li>
          <li><Link to='/Beer'>ÖLEN</Link></li>
          {user ? <li><Link to='/Booking' style={{ color: 'orange' }}>ADMIN</Link></li>
            : <li><Link to='/Booking'>BOKA</Link></li>}
        </ul>
      </div>
      <div className='headerContent'>
        <Switch>
          <Route path='/Home' component={Home} />
          <Route path='/Puben' component={Puben} />
          <Route path='/Beer' component={Beer} />
          <Route path='/Booking' component={Booking} />
          {user
            ? <>
              <Route path='/Booking' component={Booking} />
            </> : <p> Unauthorized </p>}
          <Route render={() => <h1>Oops, denna sida finns ej..</h1>} />
        </Switch>
      </div>

    </Router>
  )
}

export default Header
