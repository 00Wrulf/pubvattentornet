# Pub Vattentornet
Repo för hemsida tillhörande [Pub Vattentornet](http://vattentor.net) i Norrköping. :beer:

Kod i ReactJS.

Hosting och databas via Firebase.

## Kom igång
Börja med att installera [NodeJS](https://nodejs.org/en/).
Clona sedan repot, navigera till mappen och kör följande kommandon i terminal of choice:
```shell
# Installera modulerna som krävs för att köra projektet
npm install

# Starta react-appen
npm start
```

Ladda ner och lägg .env filen i mappen! 

(Du har väl .env filen? :smirk: ) 

Nu kommer du åt sidan via [`localhost:3000`](http://localhost:3000/).

## Deploy:a hemsidan
Sidan hostas för tillfället på [Firebase](http://firebase.com). Den länkas via webhotellet [One.com](http://one.com) där en DNS-inställning under huven vidarebefordrar adressen vattentor.net till önskad rutt. 

Det är användbart tillexempel då Firebase-appen egentligen ligger under adressen [pubvattentornet-aaf7c.web.app](https://pubvattentornet-aaf7c.firebaseapp.com/). Vilket inte riktigt rolls of the tongue.

För att uppdatera Firebase-appen, öppna din fina terminal igen och kör följande kommandon i huvudmappen: 
``` shell
# Skapa en build av React projektet
npm run build
# Deploya av builden
firebase deploy
``` 
Gör du detta för första gången så behöver du logga in med `firebase login`, ange användaruppgifterna till Firebase och... voilá!. :beer:

## Lägg till användare
För att administrera admins, gå till [Firebase-consolen](https://console.firebase.google.com/u/2/project/pubvattentornet-aaf7c/overview) och klicka på Authentication.