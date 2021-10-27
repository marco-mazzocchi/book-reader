import { LocalStorage, throttle } from 'quasar'

function store (key, value) {
  try {
    LocalStorage.set(key, value)
  } catch (e) {
    // TODO emit error action
  }
}

export function setTrack (context, payload) {
  return new Promise((resolve) => {
    const { bookId, trackId, autoplay } = payload
    const track = context.rootGetters['books/getTrack'](bookId, trackId)
    const { src } = track
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
      context.dispatch('playNextTrack')
    }

    const throttleTimeUpdate = throttle(() => {
      store('player/currentTime', Math.round(activeAudio.currentTime))
    }, 3000)

    if (context.state.isPlaying) context.dispatch('pause')

    // if activeAudio already exist reset listeners
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

    context.commit('setActiveAudio', activeAudio)

    context.dispatch('setBookId', bookId)
    context.dispatch('setTrackId', trackId)

    activeAudio.addEventListener('canplay', handleCanPlay)
    activeAudio.addEventListener('timeupdate', handleTimeUpdate)
    activeAudio.addEventListener('timeupdate', throttleTimeUpdate)
    activeAudio.addEventListener('ended', handleAudioEnded)

    resolve(activeAudio)
  })
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

export function setCurrentTime (context, value) {
  context.state.activeAudio.currentTime = value
  context.commit('setCurrentTime', value)
}

export function playBook (context, payload) {
  context.dispatch('setTrack', {
    bookId: payload.id,
    trackId: '1',
    autoplay: true
  })
}

export function setBookId (context, bookId) {
  store('player/bookId', bookId)
  context.commit('setBookId', bookId)
}

export function setTrackId (context, track) {
  store('player/trackId', track)
  context.commit('setTrackId', track)
}

export function restoreLastSession (context) {
  const bookId = LocalStorage.getItem('player/bookId')
  const trackId = LocalStorage.getItem('player/trackId')
  const audioCurrentTime = LocalStorage.getItem('player/currentTime')
  if (bookId && trackId) {
    context.dispatch('setTrack', {
      bookId,
      trackId
    }).then(() => {
      if (audioCurrentTime) {
        context.dispatch('setCurrentTime', audioCurrentTime)
      }
    })
  }
}

export function playPreviousTrack (context) {
  const { bookId, trackId } = context.state
  const previousTrackId = parseInt(trackId) - 1
  if (previousTrackId > 0) {
    context.dispatch('setTrack', {
      bookId,
      trackId: previousTrackId + '',
      autoplay: true
    })
  }
}

export function playNextTrack (context) {
  const { bookId, trackId } = context.state
  const book = context.rootGetters['books/getBook'](bookId)
  const trackTotal = Object.keys(book.tracks).length
  const nextTrackId = parseInt(trackId) + 1
  if (nextTrackId <= trackTotal) {
    context.dispatch('setTrack', {
      bookId,
      trackId: nextTrackId + '',
      autoplay: true
    })
  }
}
