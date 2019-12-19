import firebase from 'firebase'
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyAOWffdBOxjE_7xgCIi3K3QFwHQsDTq4uc",
  authDomain: "projec3-75671.firebaseapp.com",
  databaseURL: "https://projec3-75671.firebaseio.com",
  projectId: "projec3-75671",
  storageBucket: "projec3-75671.appspot.com",
  messagingSenderId: "295831245169",
  appId: "1:295831245169:web:a5472373b6d6128e5d66d0",
  measurementId: "G-0C4683TM8K"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export{
  storage,firebase as default
}
