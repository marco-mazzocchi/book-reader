export function setDownloads (state, payload) {
  state.downloads = payload
}

export function addDownload (state, payload) {
  state.downloads.push(payload)
}

export function setBooks (state, payload) {
  state.books = payload
}
