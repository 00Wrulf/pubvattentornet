// Några frågor om puben:
//
// 1. När har ni öppet?
//    Vi har öppet torsdagar och fredagar 17:00-sent, men senast 01:00!
// 2. Finns det något ätbart?
//    Ja, vi har billy panpizza orginal och vegansk samt Karins lasagne som mat. Vi har även ölkorv, chips, och popcorn som snacks.
// 3. Har ni något annat än öl?
//    Ja, vi har även cider, vin, och ett brett sortiment av alkoholfritt!
// 4. Hur mycket kostar det?
//    Priset beror väldigt mycket på vad du beställer! Vi har ett brett sortiment av öl, cider, vin, och alkoholfria drycker. Du kan läsa mer om våra priser på vår meny(länka till menyn)!
// 5. Hur kan jag boka?
//    För att boka gör du en bokningsförfrågan via boka sidan(länka till boka sidan). Du får sedan ett mail med bekräftelse när din förfrågan är godkänd!
// 6. Hur kan jag betala?
//    Vi tar endast kortbetalning, dvs inga kontanter och ingen swish!
// 7. Hur gör man om man vill jobba hos er?
//    Om du vill jobba hos oss kan du svara på enkäten som finns under fliken jobba(länka till jobba sidan)! Vi kommer sedan att kontakta dig angående pass!
// 8. Vart kan jag kontakta er?
//    Du kan hitta all kontaktinformation på vår kontakt sida(länka till kontakt sidan)!

// eller

// 1. Vart?

// 2. När?

// 3. Sortiment?

// 4. Pris?

// 5. Boka?

// 6. Betala?

// 7. Jobba?

// 8. Kontakt?
import React, { Component } from 'react'

class Faq extends Component {
  render () {
    return (
      <div className='faq'>
        <h1>FAQ</h1>
        <h2>Var och När?</h2>
        <p>- Torsdagar och Fredagar <span className='colored'>19:00-sent</span> vid Lennings Gata 2, Norrköping. men senast till <span className='colored'>01:00</span>.</p>
        <br />
        <h2>Sortiment?</h2>
        <p>- <span className='colored'>Dryck</span>: Öl, Cider, Vin, och alkoholfritt.</p>
        <p>- <span className='colored'>Mat</span>: Billys panpizza och Karins lasagne.</p>
        <p>- <span className='colored'>Snacks</span>: Ölkorv, chips, och popcorn.</p>
        <br />
        <h2>Pris?</h2>
        <p>- Priset beror väldigt mycket på <span className='colored'>vad du beställer</span>! Vi har ett brett sortiment av öl, cider, vin, och alkoholfria drycker samt mat och snacks.</p>
        <br />
        <h2>Boka?</h2>
        <p>- För att boka gör du en bokningsförfrågan via <span className='colored'>boka</span> sidan. Du får sedan ett mail med bekräftelse när din förfrågan är godkänd!</p>
        <br />
        <h2>Betala?</h2>
        <p>- Vi tar <span className='colored'>endast</span> kortbetalning, dvs inga kontanter och ingen swish!</p>
        <br />
        <h2>Jobba?</h2>
        <p>- Om du vill jobba hos oss kan du svara på enkäten som finns under fliken <span className='colored'>jobba</span>. Vi kommer sedan att kontakta dig angående pass!</p>
        <br />
        <h2>Kontakt?</h2>
        <p>- Du kan hitta all kontaktinformation på vår <span className='colored'>kontakt</span> sida.</p>
      </div>
    )
  }
}

export default Faq
