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
