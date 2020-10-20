import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAg93j6g_FfxB3-8cQAPWH6x_BQAKTPHJA',
  authDomain: 'book-reader-46f12.firebaseapp.com',
  databaseURL: 'https://book-reader-46f12.firebaseio.com',
  projectId: 'book-reader-46f12',
  storageBucket: 'book-reader-46f12.appspot.com',
  messagingSenderId: '141703634236',
  appId: '1:141703634236:web:a60a10d037d981a8c7d239'
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebase.auth()
const firebaseStorage = firebaseApp.storage()

firebaseAuth.signInAnonymously().catch(function (error) {
  console.error(error)
})

export { firebaseStorage, firebaseAuth }
