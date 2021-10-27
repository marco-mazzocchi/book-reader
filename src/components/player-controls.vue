<template>
  <div class="controls row justify-between">
    <q-btn
      size="lg"
      @click="toggleDrawer"
      flat
      round
      color="primary"
      icon="menu"
    />
    <div class="audio-controls">
      <q-btn
        size="lg"
        flat
        round
        color="primary"
        icon="skip_previous"
        @click="playPreviousTrack"
      />
      <q-btn
        size="lg"
        @click="togglePlaying"
        flat
        round
        color="primary"
        :icon="playIcon"
      />
      <q-btn
        size="lg"
        flat
        round
        color="primary"
        icon="skip_next"
        @click="playNextTrack"
      />
    </div>
    <q-btn
      size="lg"
      @click="toggleFullScreen"
      flat
      round
      color="primary"
      :icon="fullScreenIcon"
    />
  </div>
</template>

<script>
import { mapMutations, createNamespacedHelpers } from 'vuex'

const { mapActions } = createNamespacedHelpers('player')

export default {
  name: 'PlayerControls',
  props: {
    fullScreen: Boolean,
    isPlaying: Boolean
  },
  methods: {
    ...mapMutations({ toggleDrawer: 'app/toggleDrawer' }),
    ...mapActions(['playPreviousTrack', 'playNextTrack']),
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
