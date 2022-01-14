import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNp7uhJaK9m39LaCq-K0h_0co1RcvT2eI",
  authDomain: "pubvattentornet-aaf7c.firebaseapp.com",
  projectId: "pubvattentornet-aaf7c",
  storageBucket: "pubvattentornet-aaf7c.appspot.com",
  messagingSenderId: "895605229680",
  appId: "1:895605229680:web:becdef2871930c46650cb5",
  measurementId: "G-GH103J6F7T"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export const auth = firebase.auth();

export{firebase}

/*
const entry = doc(db, 'test')

function writeDoc() {
  const docData = {
    Beer: 'Bärz'
  };
  addDoc(entry, docData);
}
*/