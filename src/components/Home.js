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
        <div className='welcome'>
          <h1>Pub Vattentornet</h1>

          <hr />

          <p>Finöl till fulölspriser vid Lennings gata 2, Norrköping!</p>
        </div>
      </div>
    )
  }
}

export default Home
