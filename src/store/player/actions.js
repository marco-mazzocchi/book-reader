import { LocalStorage, throttle } from 'quasar'

function store (key, value) {
  try {
    LocalStorage.set(key, value)
  } catch (e) {
    // TODO emit error action
  }
}

export function setTrack (context, payload) {
  // TODO: get track from book store
  const { src, autoplay } = payload
  if (!src) throw new Error('src is not defined')

  function handleCanPlay () {
    context.commit('setAudioIsReady', true)
    if (autoplay) context.dispatch('play')
  }

  function handleTimeUpdate () {
    context.commit('setCurrentTime', activeAudio.currentTime)
  }

  function handleAudioEnded () {
    context.commit('setPlaying', false)
    context.commit('setCurrentTime', 0)
  }

  const throttleTimeUpdate = throttle(() => {
    store('player/currentTime', Math.round(activeAudio.currentTime))
  }, 3000)

  if (context.state.isPlaying) context.dispatch('pause')
  if (context.state.activeAudio) {
    context.commit('setAudioIsReady', false)
    // remove old event listener
    context.state.activeAudio.removeEventListener('canplay', handleCanPlay)
    context.state.activeAudio.removeEventListener(
      'timeupdate',
      handleTimeUpdate
    )
    context.state.activeAudio.removeEventListener(
      'timeupdate',
      throttleTimeUpdate
    )
    context.state.activeAudio.removeEventListener('ended', handleAudioEnded)
  }

  const activeAudio = new Audio(src)

  store('player/src', src)

  context.commit('setActiveAudio', activeAudio)

  context.commit('setTrackId', activeAudio)

  activeAudio.addEventListener('canplay', handleCanPlay)

  activeAudio.addEventListener('timeupdate', handleTimeUpdate)

  activeAudio.addEventListener('timeupdate', throttleTimeUpdate)

  activeAudio.addEventListener('ended', handleAudioEnded)
}

export function play (context) {
  context.state.activeAudio.play()
  context.commit('setPlaying', true)
}

export function pause (context) {
  if (context.state.activeAudio) context.state.activeAudio.pause()
  context.commit('setPlaying', false)
}

export function togglePlay (context) {
  if (context.state.isPlaying) {
    context.dispatch('pause')
  } else {
    context.dispatch('play')
  }
}

export function setCurrentTime (context, payload) {
  context.state.activeAudio.currentTime = payload
  context.commit('setCurrentTime', payload)
}

export function playBook (context, payload) {
  const book = context.rootGetters['books/getBook'](payload.id)
  const { tracks } = book
  // TODO: manage error?
  if (!tracks) return false

  const firstTrack = tracks['1']
  context.dispatch('setTrack', {
    src: firstTrack.src,
    autoplay: true
  })
}
