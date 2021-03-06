import React from 'react';
import styret from "../images/styret/styret.jpg"

//TODO: Infon här är möjligen lite dated

function Puben(){
    return(
        <div className="content">
            <div className="about">
            <div className="pubInfo">
                <h1>Om Vattentornet</h1>
                <p>
                    Pub Vattentornet är Norrköpings äldsta studentpub. Sedan 2002 serverar Vattentornets Boråd finöl till studentpriser.
                </p>
                <h2>Våra lokaler</h2>
                <p>
                    Pub Vattentornet har den stora äran att vara inrymd inuti ett av Sveriges äldsta bevarade vattentorn! Tornet byggdes i början av 1900-talet och ägs idag av HSB, vilka också har haft vänligheten att bistå oss med lokalerna.

                    Själva Pub Vattentornet består dels av pubdelen samt en extra allrumsdel. Puben i sig är utrustad med två tappar för fatöl, samt två rejäla kylar för flasköl, cider samt våra alkoholfria alternativ. I puben går ett 40-tal personer in om man nyttjar samtliga bord/stolar samt ståytor. Skulle inte detta räcka så får man ta till allrumsdelen där ytterligare ett 60-tal personer får plats. Allrumsdelen har dessutom ett enklare kök för tillagning eller uppvärmning av egen mat.

                    Då vi förfogar över i stort sett hela bottenvåningen i vattentornet, så gäller även vårt alkoholtillstånd i samtliga allmänna utrymmen. P.g.a. detta får man inte ta med egen alkohol och förtära i anslutning till puben samt så får man inte ta med sig alkohol köpt i puben i hissar och upp till lägenheterna; om något sådant inträffar är vi skyldiga att ingripa, annars kan vårt tillstånd dras in.

                    Våra fantastiska lokaler går alldeles utmärkt att boka! Här nedan kan du läsa lite vad som gäller kring en bokning. När du gjort det kan du kika in på bokningssidan och se vilka datum som är lediga.
                </p>
                <h2>Bokning av allrum</h2>
                <p>
                Bokning av allrummet är endast till för boende i vattentornet. För att boka allrummet behöver vi ditt lägenhetsnummer i tornet samt en beskrivning av vad lokalerna skall användas till.

                De regler som gäller för lokalerna är väldigt enkla. Ni ser till att allting går lugnt till, samt ser till att lokalerna är nystädade senaste klockan 12 dagen efter. Ni skall alltså sopa samt MOPPA golv (glöm inte golvet vid hissarna samt utanför toaletterna!), tömma papperskorgarna på toaletterna, samt torka av bord och övriga ytor. Om någonting går sönder är ni ersättningsskyldiga. Är städningen inte ordentligt utförd inom sagda tider tar vi ut en avgift för att själva utföra denna.

                Sop och mopp finns i allrummets städskåp. Städskåpet finns i hörnet mot puben.
                </p>

                <h2>Utlåning för boende</h2>
                <p>
                    Boende i vattentornet kan låna följande saker av borådet.
                    Projektor samt projektorduk
                    Två biljardköer, bollar samt triangel
                    Borrmaskin med 103 bits och borrar
                </p>
                </div>
                <div className ="styret">
                    <img src={styret} alt="styret"></img>
                </div>
            </div>
        </div>
    )
}

export default Puben;