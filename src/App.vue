<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted () {
    const audioSrc = this.$q.localStorage.getItem('player/src')
    const audioCurrentTime = this.$q.localStorage.getItem('player/currentTime')

    if (audioSrc) {
      this.$store.dispatch('player/setTrack', {
        src: audioSrc
      })
    }

    if (audioCurrentTime) {
      this.$store.dispatch('player/setCurrentTime', audioCurrentTime)
    }
  }
}
</script>
