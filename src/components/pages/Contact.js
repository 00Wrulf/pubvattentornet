import React, { Component } from 'react'
import { ImFacebook2, ImInstagram } from 'react-icons/im'

class Contact extends Component {
  render () {
    return (
      <div className='contact'>
        <h1>Kontakt</h1>
        <h3>Generellt: <a href='mailto: info@vattentor.net'>info@vattentor.net</a></h3>
        <br />
        <p />
        <br />
        <h3>Ordförande: <a href='mailto: anna@vattentor.net'>anna@vattentor.net</a></h3>
        <h3>Event: <a href='mailto: event@vattentor.net'>event@vattentor.net</a></h3>
        <h3>Kassör: <a href='mailto: kassor@vattentor.net'>kassor@vattentor.net</a></h3>
        <h3>Inköp: <a href='mailto: inkop@vattentor.net'>inkop@vattentor.net</a></h3>
        <h3>Tryck och PR: <a href='mailto: tryckochpr@vattentor.net'>tryckochpr@vattentor.net</a></h3>
        <h3>Personal: <a href='mailto: personal@vattentor.net'>personal@vattentor.net</a></h3>
        <h3>Webb: <a href='mailto: webb@vattentor.net'>webb@vattentor.net</a></h3>

        <br />
        <p />
        <br />
        <br />
        <p />
        <br />

        <p><a href='https://www.facebook.com/Pub.Vattentornet' target='_blank' rel='noopener noreferrer'><ImFacebook2 className='fIcon' /></a> <a href='https://www.instagram.com/pubvattentornet/' target='_blank' rel='noopener noreferrer'><ImInstagram className='iIcon' /></a></p>

      </div>
    )
  }
}

export default Contact
