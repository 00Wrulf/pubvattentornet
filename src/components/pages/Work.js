import React, { Component } from 'react'

class Work extends Component {
  render () {
    return (
      <div className='work'>
        <h1>Jobba hos oss</h1>
        <p>Är du intresserad av att arbeta i puben för gött häng och schyssta förmåner? Släng iväg en ansökan via formuläret nedanför!</p>
        <iframe title='Arbeta' id='arbetaForm' src='https://docs.google.com/forms/d/e/1FAIpQLScpWXw5iyqYpv5O9gaCW8nI3UG3p0wEo1r6YHSpx2vSFArNuw/viewform' />
      </div>
    )
  }
}

export default Work
