import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import { firebaseConfig } from './firebaseConfig'

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebase.auth()
const firebaseStorage = firebaseApp.storage()
const firebaseDb = firebaseApp.firestore()

firebaseAuth.signInAnonymously().catch(function (error) {
  console.error(error)
})

export { firebaseStorage, firebaseAuth, firebaseDb }
