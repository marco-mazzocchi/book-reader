import { firebaseStorage } from 'boot/firebase'
import { Plugins, FilesystemDirectory } from '@capacitor/core'

const { Filesystem } = Plugins

export function getDownloadList (context) {
  const ref = firebaseStorage.ref()

  ref
    .listAll()
    .then(function (res) {
      res.items.forEach(item => {
        item.getDownloadURL().then(url => {
          const file = {
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

export function getFileList (context) {
  const dir = FilesystemDirectory.Documents
  Filesystem.readdir(dir)
    .then(ReaddirResult => {
      console.log(ReaddirResult)
      context.commit('setFiles', ReaddirResult)
    })
    .catch(error => {
      // TODO share errors to app level
      console.error(error)
    })
}
