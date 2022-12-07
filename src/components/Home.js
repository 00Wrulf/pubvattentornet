import React, { Component } from 'react'
import VattentornetDataService from '../services/vattentornet.service'
// import bg from '../images/background/home.jpeg'

class Home extends Component {
  componentDidMount () {
    VattentornetDataService.userAuthorization()
    this.setState({
      content: {
        display: 'none'
      }
    })
  }

  render () {
    return (
      <div className='welcomeContainer'>
        {/* <img className='bg' src={bg} /> */}
        <div className='welcome'>
          <h1>Pub Vattentornet</h1>
          <hr />
          <p>Finöl til fulöls-priser!</p>
        </div>
      </div>
    )
  }
}

export default Home
