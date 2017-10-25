import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyD7aKO4CZIzCNSRLTmhRJ6-MVLCR_coOE4",
  authDomain: "tasktrack-98d4b.firebaseapp.com",
  databaseURL: "https://tasktrack-98d4b.firebaseio.com",
  projectId: "tasktrack-98d4b",
  storageBucket: "",
  messagingSenderId: "732626559825"
};
const fire = firebase.initializeApp(config);

export default fire;