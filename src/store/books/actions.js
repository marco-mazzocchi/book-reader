/* eslint no-unused-vars: 'off' */

import { firebaseStorage, firebaseDb } from 'boot/firebase'

export function fetchBookList (context) {
  firebaseDb.collection('books').orderBy('title').get().then((querySnapshot) => {
    const books = []
    querySnapshot.forEach((doc) => {
      books.push(doc.data())
    })
    context.commit('setBooks', books)
  })
    .catch((error) => {
      console.log('Error getting documents: ', error)
    })
}

export function getDownloadList (context) {
  // TODO remove this line
  if (context.state.downloads.length > 0) return false
  const ref = firebaseStorage.ref()

  ref
    .listAll()
    .then(function (res) {
      res.items.forEach(item => {
        item.getDownloadURL().then(url => {
          const file = {
            item: item,
            path: item.location.path_,
            url: url
          }
          context.commit('addDownload', file)
        })
      })
    })
    .catch(function (error) {
      console.error(error)
    })
}
