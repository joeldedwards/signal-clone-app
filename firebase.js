// import * as firebase from 'firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB81-HLtRqu9pyixuY5er5XxYAm4w_pGBo",
  authDomain: "signal-clone-app-d4e29.firebaseapp.com",
  projectId: "signal-clone-app-d4e29",
  storageBucket: "signal-clone-app-d4e29.appspot.com",
  messagingSenderId: "1091300243716",
  appId: "1:1091300243716:web:b59656a618587a83faf851"
};

let app;

if(firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
}
else {
  app = firebase.app();  
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };