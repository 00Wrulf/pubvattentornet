import {firebase} from '../firebase'

const db = firebase.firestore();

//TODO: Här kan behövas lite uppstädning och nya namn för databas-calls-funktionerna

class VattentornetDataService {

    // Built-in authorization functionality within firebase.
    // Admins can be managed via the dashboard
    // Inbyggd funktionalitet för användar-authorization från Firebase.
    // Admins läggs till i dashboarden i Firebase.
    auth = firebase.auth();
    
    // Funktionalitet för att hämta alla admins. Kanske bra för något?
    // getAllUsers(){
    //     let list = [];
    //     db.collection("users").get().then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             list.push(doc.data().first);
    //         });
    //     });
    //     return list;
    // }

    async login(email, password){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            //var user = userCredential.user;
        })
        .catch((error) => {
            //var errorCode = error.code;
            //var errorMessage = error.message;
        });
    }

    async logout(){
        firebase.auth().signOut();
    }

    userAuthorization(){
        firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          //var uid = user.uid;
        } else {
          // User is signed out
        }
      });
    }

    getBookings = () =>{
        return db.collection("bookings");
    }



    getConfirmedBookings(){
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


export default new VattentornetDataService();