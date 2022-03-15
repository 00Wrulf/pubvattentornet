import {firebase} from "./firebase"

const db = firebase.firestore();


const getBookings = () =>{
    return db.collection("bookings");
}

const VattentornetService = {
    getBookings
};

export default VattentornetService;