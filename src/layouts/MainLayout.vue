<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="text-grey-6 bg-white">
        <q-btn @click="goBack" flat round dense icon="chevron_left" v-ripple />
        <q-toolbar-title class="text-center text-uppercase">
          Book Reader
        </q-toolbar-title>
        <q-btn flat round dense icon="more_vert" v-ripple />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerIsOpen" side="left">
      <q-list padding class="menu-list">
          <q-item clickable v-ripple to="/books">
            <q-item-section avatar>
              <q-icon name="book" />
            </q-item-section>

            <q-item-section>
              Books
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple to="/downloads">
            <q-item-section avatar>
              <q-icon name="cloud_download" />
            </q-item-section>

            <q-item-section>
              Downloads
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple to="/credits">
            <q-item-section avatar>
              <q-icon name="loyalty" />
            </q-item-section>

            <q-item-section>
              Credits
            </q-item-section>
          </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <player />
    </q-page-container>
  </q-layout>
</template>

<script>
import player from '../components/player'

export default {
  name: 'MainLayout',
  components: {
    player
  },
  computed: {
    drawerIsOpen: {
      get () {
        return this.$store.state.app.drawerIsOpen
      },
      set (value) {
        this.$store.commit('app/setDrawerIsOpen', value)
      }
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>
