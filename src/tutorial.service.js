import { differenceInBusinessDays } from 'date-fns';
import {firebase} from './firebase'

const db = firebase.firestore();


class TutorialDataService {

    auth = firebase.auth();
    
    add(){
        db.collection("users").add({
            first: "nosse",
            last: "yobo",
            born: 1815
        });
    }

    getAll(){
        let list = [];
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                list.push(doc.data().first);
            });
        });
        return list;
    }

    async signInWithEmailAndPassword(email, password){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log("YAS!")
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("NAS!")
        });
    }

    async logout(){
        firebase.auth().signOut();
    }

    authe(){
        firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          console.log("authed!")
        } else {
          // User is signed out
          console.log("not authed!")
        }
      });
    }

    getConfirmedBookings(){
        let counter = 0;
        let confirmedBookings = [];
        db.collection("bookings").where("confirmed", "==", true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    confirmedBookings.push(
                        {
                        "email": doc.data().email, 
                        "name": doc.data().name,
                        "apartmentnr": doc.data().apartmentnr,
                        "description": doc.data().description,
                        "bookpub": doc.data().bookpub,
                        "date": new Date(doc.data().date.toDate())
                    }
                        )
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
            return confirmedBookings;
    }

    getUnconfirmedBookings(){
        let unconfirmedBookings = [];
        db.collection("bookings").where("confirmed", "!=", true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    unconfirmedBookings.push(
                        {
                        "id": doc.id,
                        "email": doc.data().email, 
                        "name": doc.data().name,
                        "apartmentnr": doc.data().apartmentnr,
                        "description": doc.data().description,
                        "bookpub": doc.data().bookpub,
                        "date": new Date(doc.data().date.toDate())
                    }
                        )
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
            return unconfirmedBookings;
    }

    async addBookingRequest(inEmail, inName, inApartmentnr, inDescription, inBookpub, inDate, inConfirmed){
        let confirmed = inConfirmed ? inConfirmed : false;
        db.collection("bookings").add({
            email: inEmail,
            name: inName,
            apartmentnr: inApartmentnr,
            description: inDescription,
            bookpub: inBookpub,
            date: inDate,
            dateCreated: new Date(),
            confirmed: confirmed
        })
    }

        /*
        .then((docRef) => {
            console.log("Booking made with ID: ", docRef.id)
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        })
    }
*/
async updateBookingRequest(inId, inEmail, inName, inApartmentnr, inDescription, inBookpub, inDate){
    console.log(inId,)
    db.collection("bookings").doc(inId)
    .update({
        email: inEmail,
        name: inName,
        apartmentnr: inApartmentnr,
        description: inDescription,
        bookpub: inBookpub,
        date: inDate,
        confirmed: true
    })
}

confirmBookingRequest(id){
    db.collection("bookings").doc(id)
    .update({
        confirmed: true
    })
}

deleteBooking(id){
    db.collection("bookings").doc(id)
    .delete();
}
    /*
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        })
    }
    */
}


export default new TutorialDataService();