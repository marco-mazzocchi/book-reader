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

      <div
        v-show="fullScreen"
        class="col-6"
      >
        <div class="cover full-height">
          <img
            :src="book.cover"
            class="shadow-10 full-height"
          />
          <!-- <q-spinner-audio
            v-show="isPlaying"
            color="white"
            size="100px"
            class="spinner-audio"
          /> -->
        </div>
      </div>

      <div
        v-show="fullScreen"
        class="col column justify-center"
      >
        <div class="boook-header">
          <div class="book-title">{{ book.title }}</div>
          <div class="row">
            <div class="col">
              <div class="book-author">{{ book.author }}</div>
            </div>
            <div class="col">
              <div class="track-title">Traccia {{ trackId }}</div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-show="fullScreen"
        class="col column justify-center"
      >
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

      <div
        v-show="fullScreen"
        class="col"
      >
        <div class="row justify-between">
          <q-btn
            size="xl"
            flat
            round
            color="primary"
            icon="replay_30"
            @click="replay(30)"
          />
          <q-btn
            size="xl"
            flat
            round
            color="primary"
            icon="forward_30"
            @click="forward(30)"
          />
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
const { mapGetters: mapBookGetters } = createNamespacedHelpers('books')

export default {
  name: 'Player',
  components: { 'player-controls': PlayerControls },
  methods: {
    ...mapMutations(['setPlaying', 'setAudioIsReady', 'setFullScreen']),
    ...mapActions(['togglePlay', 'setCurrentTime']),
    handleTimeChange (value) {
      this.setCurrentTime(value)
    },
    toggleFullScreen () {
      this.setFullScreen(!this.fullScreen)
    },
    replay (seconds) {
      this.setCurrentTime(this.currentTime - seconds)
    },
    forward (seconds) {
      this.setCurrentTime(this.currentTime + seconds)
    }
  },
  computed: {
    ...mapState(['fullScreen', 'isPlaying', 'audioIsReady', 'activeAudio', 'currentTime', 'bookId', 'trackId']),
    ...mapBookGetters(['getBook']),
    duration () {
      return this.activeAudio.duration
    },
    durationInSeconds () {
      return Math.round(this.activeAudio.duration)
    },
    durationInMinutes () {
      return digitalClockFormat(this.durationInSeconds, { showHours: false })
    },
    currentTimeInSeconds () {
      return Math.round(this.currentTime)
    },
    currentTimeInMinutes () {
      return digitalClockFormat(this.currentTimeInSeconds, { showHours: false })
    },
    book () {
      return this.getBook(this.bookId)
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
  z-index: 2000;
  transition: all 0.2s ease-in-out;
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
      opacity: 0.2;
    }
  }
  .book-title {
    font-size: 1.5rem;
  }
  .book-author {
    color: $grey-6;
    font-weight: 500;
    text-align: left;
  }
  .track-title {
    color: $grey-6;
    text-align: right;
  }
}
</style>
