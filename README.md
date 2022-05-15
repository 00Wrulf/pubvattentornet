# Pub Vattentornet
Ny hemsida för [Pub Vattentornet](http://vattentor.net) i Norrköping.
Skriven i React. Hosting och databas via Firebase.

## Kom igång
Börja med att installera [NodeJS](https://nodejs.org/en/).
Clona sedan repot, navigera till och kör sedan följande kommandon i terminal of choice:
``` shell
# Installera modulerna som krävs för att köra projektet
npm install
# Starta react-appen
npm start
```
Nu kommer du åt sidan via [`localhost:3000`](http://localhost:3000).

## Uppdatera hemsidan
Sidan hostas för tillfället på [Firebase](http://firebase.com). Den länkas via webhotellet [One](http://one.com) där en DNS-inställning vidarebefordrar besökare på adressen vattentor.net till Firebase-appen under adressen [pubvattentornet-aaf7c.web.app](https://pubvattentornet-aaf7c.firebaseapp.com/).

För att uppdatera Firebase-appen, öppna din fina terminal igen och kör följande kommandon i huvudmappen: 
``` shell
# Skapa en build av React projektet
npm run build
# Gör en deploy av builden till firebase
firebase deploy
``` 
Gör du detta för första gången så behöver du logga in med webbpostens uppgifter och... voilá! Den uppdaterade sidan nås nu via vattentor.net.

## Lägg till användare
För att kunna administrera bokningar så kan man logga in via knappen längst ner på hemsidan. För att skapa admins, lägg till de i [Firebase-consolen](https://console.firebase.google.com/u/2/project/pubvattentornet-aaf7c/overview), under fliken authentication.