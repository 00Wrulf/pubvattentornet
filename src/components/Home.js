import React, { Component } from 'react'
import VattentornetDataService from '../services/vattentornet.service'

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
      </div>
    )
  }
}

export default Home
