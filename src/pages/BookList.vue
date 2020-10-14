<template>
  <q-page padding>
    <q-list padding>
      <q-item clickable :to="'book/' + id" v-for="id in Object.keys(books)" :key="id">
        <q-item-section avatar>
          <q-avatar rounded>
            <img :src="books[id].cover">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ books[id].title }}</q-item-label>
          <q-item-label caption lines="2">{{ books[id].author }}, {{ books[id].duration }} ore</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn round color="primary" flat icon="play_arrow" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('books')

export default {
  name: 'BookList',
  computed: {
    ...mapState(['books'])
  }
}
</script>
