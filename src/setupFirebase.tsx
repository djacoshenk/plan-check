import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDP0wHz7z2ibKaWcTMyKEdsbO94AxksLCI',
  authDomain: 'we-plan-check.firebaseapp.com',
  projectId: 'we-plan-check',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const provider = firebase.auth.EmailAuthProvider;

export const firestore = firebase.firestore();

export default firebase;
