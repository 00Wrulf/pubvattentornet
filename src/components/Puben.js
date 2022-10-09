import { React, useState } from 'react'
import styret from '../images/styret/styret_new.jpg'

// TODO: Infon här är möjligen lite dated

function Puben () {
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  const [show4, setShow4] = useState(false)
  const [show5, setShow5] = useState(false)
  const [show6, setShow6] = useState(false)

  return (
    <div className='content'>
      <div id='about'>
        <div className='pubInfo'>
          <ul>
            <div id='info'>
              <button class='clicker' onClick={() => setShow1(!show1)}>Om Vattentornet</button>
              {
                show1
                  ? <div class='hiddendiv'><p>Pub Vattentornet är Norrköpings äldsta studentpub. Sedan 2002 har det serverats finöl till studentpriser, med ett tillskott av diverse sprit såsom whisky, rom, och gin.</p></div>
                  : null
              }

            </div>
            <div id='info'>
              <button class='clicker' onClick={() => setShow2(!show2)}>Våra lokaler</button>
              {
                show2
                  ? <div class='hiddendiv'><p>Pub Vattentornet har den stora äran att vara inrymd inuti ett av Sveriges äldsta bevarade vattentorn! Tornet byggdes i början av 1900-talet och ägs idag av HSB, vilka också har haft vänligheten att bistå oss med lokalerna. Själva Pub Vattentornet består dels av pubdelen samt en extra allrumsdel. Puben i sig är utrustad med två tappar för fatöl, samt två rejäla kylar för flasköl, cider samt våra alkoholfria alternativ. I puben går ett 40-tal personer in om man nyttjar samtliga bord/stolar samt ståytor. Skulle inte detta räcka så får man ta till allrumsdelen där ytterligare ett 60-tal personer får plats. Allrumsdelen har dessutom ett enklare kök för tillagning eller uppvärmning av egen mat. Då vi förfogar över i stort sett hela bottenvåningen i vattentornet, så gäller även vårt alkoholtillstånd i samtliga allmänna utrymmen. P.g.a. detta får man inte ta med egen alkohol och förtära i anslutning till puben samt så får man inte ta med sig alkohol köpt i puben i hissar och upp till lägenheterna; om något sådant inträffar är vi skyldiga att ingripa, annars kan vårt tillstånd dras in. Våra fantastiska lokaler går alldeles utmärkt att boka! Här nedan kan du läsa lite vad som gäller kring en bokning. När du gjort det kan du kika in på bokningssidan och se vilka datum som är lediga.</p></div>
                  : null
              }
            </div>
            <div id='info'>
              <button class='clicker' onClick={() => setShow3(!show3)}>Bokning av allrum</button>
              {
                show3
                  ? <div class='hiddendiv'><p>Bokning av allrummet är endast till för boende i vattentornet. För att boka allrummet behöver vi ditt lägenhetsnummer i tornet samt en beskrivning av vad lokalerna skall användas till. De regler som gäller för lokalerna är väldigt enkla. Ni ser till att allting går lugnt till, samt ser till att lokalerna är nystädade senaste klockan 12 dagen efter. Ni skall alltså sopa samt MOPPA golv (glöm inte golvet vid hissarna samt utanför toaletterna!). Ni skall även tömma papperskorgarna på toaletterna, samt torka av bord och övriga ytor. Om någonting går sönder är ni ersättningsskyldiga. Är städningen inte ordentligt utförd inom sagda tider tar vi ut en avgift för att själva utföra denna. Sop och mopp finns i allrummets städskåp. Städskåpet finns i hörnet mot puben.</p></div>
                  : null
              }
            </div>
            <div id='info'>
              <button class='clicker' onClick={() => setShow4(!show4)}>Utlåning för boende</button>
              {
                show4
                  ? <div class='hiddendiv'><p>Boende i vattentornet kan låna följande saker av borådet. Projektor samt projektorduk, två biljardköer, bollar samt triangel Borrmaskin med 103 bits och borrar</p></div>
                  : null
              }
            </div>
            <div id='info'>
              <button class='clicker' onClick={() => setShow5(!show5)}>Jobba på Tornet?</button>
              {
                show5
                  ? <div class='hiddendiv3'><iframe title='Arbeta' id='arbetaForm' src='https://docs.google.com/forms/d/e/1FAIpQLScpWXw5iyqYpv5O9gaCW8nI3UG3p0wEo1r6YHSpx2vSFArNuw/viewform' /></div>
                  : null
              }
            </div>
            <div id='info'>
              <button class='clicker' onClick={() => setShow6(!show6)}>Styrelsen</button>
              {
                show6
                  ? <div class='hiddendiv2'>
                    <h1>Vattentornet 22/23</h1>
                    <img src={styret} id='styret' alt='styrelsen' />
                    <h2 id='styretInfo'>Saknar du någon information? Tveka inte att skicka ett mail till oss på <a href='mailto: info@vattentor.net'>info@vattentor.net</a>,
                                        eller om du har någon fundering till en specifik, se kontaktinfo nedan!
                    </h2>

                    <h3>Ordförande:</h3>
                    <p><a href='mailto: anna@vattentor.net'>anna@vattentor.net</a></p>

                    <h3>Event:</h3>
                    <p><a href='mailto: event@vattentor.net'>event@vattentor.net</a></p>

                    <h3>Kassör:</h3>
                    <p><a href='mailto: kassor@vattentor.net'>kassor@vattentor.net</a></p>

                    <h3>Inköp:</h3>
                    <p><a href='mailto: inkop@vattentor.net'>inkop@vattentor.net</a></p>

                    <h3>Tryck och PR:</h3>
                    <p><a href='mailto: tryckochpr@vattentor.net'>tryckochpr@vattentor.net</a></p>

                    <h3>Personal:</h3>
                    <p><a href='mailto: personal@vattentor.net'>personal@vattentor.net</a></p>

                    <h3>Webb:</h3>
                    <p><a href='mailto: webb@vattentor.net'>webb@vattentor.net</a></p>
                    </div>
                  : null
              }
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Puben
