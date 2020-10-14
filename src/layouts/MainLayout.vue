<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="text-grey-6 bg-white">
        <q-btn flat round dense icon="chevron_left" />
        <q-toolbar-title class="text-center text-uppercase">
          Book Reader
        </q-toolbar-title>
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </q-header>

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
  }
}
</script>
