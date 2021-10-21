/* eslint no-unused-vars: 'off' */
import axios from 'axios'

import { Plugins, FilesystemDirectory } from '@capacitor/core'

const { Filesystem } = Plugins
const booksDir = 'books'

export async function getFileList (context) {
  const rootDir = await readDir('/')
  const myDir = rootDir.files.find(file => file === booksDir)
  if (!myDir) {
    createDir(booksDir)
  }
  const result = await readDir(booksDir)

  context.commit('setFiles', result.files)
}

export async function downloadFile (context, file) {
  const { path, url } = file

  axios
    .get(url, {
      responseType: 'blob'
    })
    .then(response => {
      convertBlobToBase64(response.data).then(async data => {
        const result = await writeFile(`${booksDir}/${path}`, data)
        console.log('result', result)
        if (result) context.commit('addFile', path)
      })
    })
}

async function createDir (dir) {
  try {
    const result = await Filesystem.mkdir({
      path: dir,
      directory: FilesystemDirectory.Data,
      recursive: false // like mkdir -p
    })
    return result
  } catch (e) {
    console.error('Unable to make directory', e)
    return false
  }
}

async function readDir (dir) {
  try {
    const booksDir = await Filesystem.readdir({
      path: dir,
      directory: FilesystemDirectory.Data
    })
    return booksDir
  } catch (e) {
    console.error('Unable to read dir', e)
    return false
  }
}

async function readOrCreateDir (dir) {
  const result = readDir(dir)
  if (!result) {
    return createDir(dir)
  }
  return result
}

async function removeDir (dir) {
  try {
    await Filesystem.rmdir({
      path: dir,
      directory: FilesystemDirectory.Data,
      recursive: true
    })
  } catch (e) {
    console.error('Unable to remove directory', e)
  }
}

async function writeFile (path, data) {
  try {
    const result = await Filesystem.writeFile({
      path,
      data,
      directory: FilesystemDirectory.Data,
      recursive: true
    })
    return result
  } catch (e) {
    console.error('Unable to write file', e)
    return false
  }
}

function convertBlobToBase64 (blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onloadend = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(blob)
  })
}
