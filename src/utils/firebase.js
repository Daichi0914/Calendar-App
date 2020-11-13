import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD32tF_n1zfE2RzLxIqeU97gJPMiJ7QzcE",
  authDomain: "calendar-app-b6b14.firebaseapp.com",
  databaseURL: "https://calendar-app-b6b14.firebaseio.com",
  projectId: "calendar-app-b6b14",
  storageBucket: "calendar-app-b6b14.appspot.com",
  messagingSenderId: "271077511296",
  appId: "1:271077511296:web:8cbb80fe7660262cd41665",
  measurementId: "G-1V62G4EHG6"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export const auth = firebase.auth();
export const db = firebase.firestore();