import React, { Component } from 'react'
import VattentornetDataService from '../services/vattentornet.service'
import Puben from './Puben'
import Beer from './Beer'

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
          <p>Lennings gata 2</p>
          <h1>Pub Vattentornet</h1>
          <div id='arrow'>
            <svg width='22' height='90' viewBox='0 0 22 90' fill='none' xmlns='http://www.w3.org/2000/svg' opacity='1'>
              <path d='M11 0L11 88' stroke='#125446' stroke-width='2' />
              <path d='M1 78L11 88L21 78' stroke='#125446' stroke-width='2' />
            </svg>
          </div>
        </div>
        <div className='about'>
          <Puben />
        </div>

        <Beer />
      </div>
    )
  }
}

export default Home
