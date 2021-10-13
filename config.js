import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyBSgF2R1akd4dip1_BRCU3mQWUXZ7QnpcM",
  authDomain: "booksanta-39ce6.firebaseapp.com",
  projectId: "booksanta-39ce6",
  storageBucket: "booksanta-39ce6.appspot.com",
  messagingSenderId: "908942516793",
  appId: "1:908942516793:web:fb3c35f4c3fc0b29bc23e8"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
