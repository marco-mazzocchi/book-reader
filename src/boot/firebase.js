import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import { firebaseConfig } from './firebaseConfig'

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebase.auth()
const firebaseStorage = firebaseApp.storage()

firebaseAuth.signInAnonymously().catch(function (error) {
  console.error(error)
})

export { firebaseStorage, firebaseAuth }
