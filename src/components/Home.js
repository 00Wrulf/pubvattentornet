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
      <div className='home'>
        <h1>TOR: 19-SENT</h1>
        <h1>FRE: 19-SENT</h1>
        <h2>(Men senast till 01!)</h2>
        <p>Lennings Gata 2</p>
      </div>
    )
  }
}

export default Home
