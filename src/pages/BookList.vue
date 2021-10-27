<template>
  <q-page padding>
    <q-list padding>
      <q-item
        clickable
        :to="'book/' + id"
        v-for="id in Object.keys(books)"
        :key="id"
      >
        <q-item-section avatar>
          <q-avatar rounded>
            <img :src="books[id].cover">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ books[id].title }}</q-item-label>
          <q-item-label
            caption
            lines="2"
          >{{ books[id].author }}, {{ bookDuration(id) }} ore</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn
            v-show="isBookPlaying(id)"
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
            v-show="!isBookPlaying(id)"
            round
            color="primary"
            flat
            icon="play_arrow"
            @click.prevent="playBook({id})"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { digitalClockToSeconds, digitalClockFormat } from '../utils/time'

const { mapState, mapActions } = createNamespacedHelpers('books')
const { mapActions: mapPlayerActions, mapState: mapPlayerState } = createNamespacedHelpers('player')

export default {
  name: 'BookList',
  computed: {
    ...mapState(['books']),
    ...mapPlayerState({
      isPlaying: 'isPlaying',
      playingBookId: 'bookId'
    })
  },
  methods: {
    ...mapActions(['fetchBookList']),
    ...mapPlayerActions(['playBook']),
    bookDuration (bookId) {
      // duration in seconds
      let duration = 0
      const { tracks } = this.books[bookId]
      if (!tracks) return '00:00'
      for (const trackId in this.books[bookId].tracks) {
        const track = tracks[trackId]
        duration += digitalClockToSeconds(track.duration)
      }
      return digitalClockFormat(duration, { showSeconds: false })
    },
    isBookPlaying (bookId) {
      return this.isPlaying && bookId === this.playingBookId
    }
  }
}
</script>
