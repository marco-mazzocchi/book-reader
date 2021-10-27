export function togglePlaying (state) {
  state.isPlaying = !state.isPlaying
}

export function setPlaying (state, value) {
  state.isPlaying = value
}

export function setActiveAudio (state, value) {
  state.activeAudio = value
}

export function setAudioIsReady (state, value) {
  state.audioIsReady = value
}

export function setCurrentTime (state, value) {
  state.currentTime = value
}

export function setBookId (state, value) {
  state.bookId = value
}

export function setTrackId (state, value) {
  state.trackId = value
}

export function setFullScreen (state, value) {
  state.fullScreen = value
}
