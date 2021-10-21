export function setFiles (state, payload) {
  state.files = payload
}

export function addFile (state, payload) {
  state.files.push(payload)
}
