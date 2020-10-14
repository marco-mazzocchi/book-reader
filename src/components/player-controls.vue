<template>
  <div class="controls row justify-between">
    <q-btn flat round color="primary" icon="volume_down" />
    <div class="audio-controls">
      <q-btn flat round color="primary" icon="skip_previous" />
      <q-btn @click="togglePlaying" flat round color="primary" :icon="playIcon" />
      <q-btn flat round color="primary" icon="skip_next" />
    </div>
    <q-btn @click="toggleFullScreen" flat round color="primary" :icon="fullScreenIcon" />
  </div>
</template>

<script>
export default {
  name: 'PlayerControls',
  props: {
    fullScreen: Boolean,
    isPlaying: Boolean
  },
  methods: {
    togglePlaying () {
      this.$emit('togglePlaying')
    },
    toggleFullScreen () {
      this.$emit('toggleFullScreen')
    }
  },
  computed: {
    playIcon () {
      return this.isPlaying ? 'pause' : 'play_arrow'
    },
    fullScreenIcon () {
      return this.fullScreen ? 'fullscreen_exit' : 'fullscreen'
    }
  }
}
</script>
