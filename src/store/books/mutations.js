export function setDownloads (state, payload) {
  state.downloads = payload
}

export function addDownload (state, payload) {
  state.downloads.push(payload)
}

export function setFiles (state, payload) {
  state.files = payload
}
