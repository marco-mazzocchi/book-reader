<template>
  <div
    :class="{
      player: true,
      'q-px-lg': true,
      'bg-white': true,
      'q-py-lg': fullScreen,
      'q-py-sm': !fullScreen,
      'full-screen': fullScreen
    }"
    v-if="audioIsReady"
  >
      <div class="text-center column full-height">

        <div v-show="fullScreen" class="col-6">
          <div class="cover full-height">
            <img
              src="images/annie-spratt-OKDSByxXA6I-unsplash.jpg"
              class="shadow-10 full-height"
            />
            <q-spinner-audio
              v-show="isPlaying"
              color="white"
              size="100px"
              class="spinner-audio"
            />
          </div>
        </div>

        <div v-show="fullScreen" class="col column justify-center">
          <div class="boook-header">
            <div class="book-title">Il conformista</div>
            <div class="book-author">Alberto Moravia</div>
          </div>
        </div>

        <div v-show="fullScreen" class="col column justify-center">
          <div class="slider">
            <q-slider
              :value="currentTime"
              @change="handleTimeChange"
              :min="0"
              :max="duration"
              :step="1"
              color="accent"
            />
            <div class="flex justify-between">
              <div>
                {{currentTimeInMinutes}}
              </div>
              <div>
                {{durationInMinutes}}
              </div>
            </div>
          </div>
        </div>

        <div class="col column justify-end">
          <player-controls
            :fullScreen="fullScreen"
            :isPlaying="isPlaying"
            @toggleFullScreen="toggleFullScreen"
            @togglePlaying="togglePlay"
          />
        </div>

      </div>

  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { digitalClockFormat } from '../utils/time'
import PlayerControls from './player-controls'

const { mapState, mapMutations, mapActions } = createNamespacedHelpers('player')

export default {
  name: 'Player',
  components: { 'player-controls': PlayerControls },
  data: function () {
    return {
      fullScreen: false
    }
  },
  methods: {
    ...mapMutations(['setPlaying', 'setAudioIsReady']),
    ...mapActions(['togglePlay', 'setCurrentTime']),
    handleTimeChange (value) {
      this.setCurrentTime(value)
    },
    toggleFullScreen () {
      this.fullScreen = !this.fullScreen
    }
  },
  computed: {
    ...mapState(['isPlaying', 'audioIsReady', 'activeAudio', 'currentTime']),
    duration () {
      return this.activeAudio.duration
    },
    durationInSeconds () {
      return Math.round(this.activeAudio.duration)
    },
    durationInMinutes () {
      return digitalClockFormat(this.durationInSeconds)
    },
    currentTimeInSeconds () {
      return Math.round(this.currentTime)
    },
    currentTimeInMinutes () {
      return digitalClockFormat(this.currentTimeInSeconds)
    }
  }
}
</script>

<style lang="scss">
.player {
  position: fixed;
  top: auto;
  height: 58px;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  transition: all .2s ease-in-out;
  &.full-screen {
    height: calc(100% - 50px);
  }
  .cover {
    position: relative;
    margin: 0 auto;
    img {
      max-width: 200px;
      border-radius: 20px;
    }
    .spinner-audio {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -50px;
      margin-left: -50px;
      opacity: .2;
    }
  }
  .book-title {
    font-size: 1.5rem;
  }
  .book-author {
    color: $grey-6;
    font-weight: 500;
  }
}
</style>
