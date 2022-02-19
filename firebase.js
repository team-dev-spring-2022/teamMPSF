// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBVtxdPhYN2qlsZb-cHK6ITONxrTFC_PkI',
  authDomain: 'databasempsf.firebaseapp.com',
  projectId: 'databasempsf',
  storageBucket: 'databasempsf.appspot.com',
  messagingSenderId: '155642363208',
  appId: '1:155642363208:web:8e905f19b27c4facf3077d',
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export {auth};
