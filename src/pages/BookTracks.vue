<template>
  <q-page padding>
    <q-img
      :src="book.cover"
      style="height: 140px; border-radius: 20px"
    >
      <div class="absolute-full flex flex-center">
        <div>
          <h5 class="text-center q-my-sm">{{ book.title }}</h5>
          <h6 class="text-center q-my-sm">{{ book.author }}</h6>
        </div>
      </div>
    </q-img>
    <q-list
      padding
      separator
    >
      <q-item
        clickable
        v-for="id in Object.keys(book.tracks)"
        :key="id"
        @click="setTrackAndPlay(id)"
      >
        <q-item-section>
          <q-item-label>Traccia {{id}}</q-item-label>
          <q-item-label
            caption
            lines="2"
          >{{book.tracks[id].duration}} minuti</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            v-show="isTrackPlaying(id)"
            round
            color="primary"
            flat
          >
            <q-spinner-audio
              color="primary"
              size="1em"
            />
          </q-btn>
          <q-btn
            v-show="!isTrackPlaying(id)"
            round
            color="primary"
            flat
            icon="play_arrow"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('books')
const { mapActions, mapState: mapPlayerState } = createNamespacedHelpers('player')

export default {
  name: 'BookTracks',
  computed: {
    ...mapState(['books']),
    ...mapPlayerState({
      playingBookId: 'bookId',
      playingTrakId: 'trackId',
      isPlaying: 'isPlaying'
    }),
    book () {
      return this.books[this.bookId]
    },
    bookId () {
      const { id } = this.$route.params
      return id
    }
  },
  methods: {
    ...mapActions(['setTrack']),
    setTrackAndPlay (trackId) {
      this.setTrack({
        bookId: this.bookId,
        trackId: trackId,
        autoplay: true
      })
    },
    isTrackPlaying (trackId) {
      return this.isPlaying && this.bookId === this.playingBookId && trackId === this.playingTrakId
    }
  }
}
</script>
