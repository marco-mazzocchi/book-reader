<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions: mapBookActions } = createNamespacedHelpers('books')
const { mapActions: mapPlayerActions } = createNamespacedHelpers('player')

export default {
  name: 'App',
  mounted () {
    this.fetchBookList().then(() => {
      this.restoreLastSession()
    })
  },
  methods: {
    ...mapBookActions(['fetchBookList']),
    ...mapPlayerActions(['restoreLastSession'])
  }
}
</script>
