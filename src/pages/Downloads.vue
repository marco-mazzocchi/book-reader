<template>
  <q-page padding>
    <h4 class="text-center">Downloads</h4>
    <q-banner v-if="error" class="text-white bg-red">
      {{ error }}
    </q-banner>

    <h6 class="text-center">Local ({{ files.length }})</h6>

    <div v-if="files.length > 0">
      <q-btn color="red" rounded class="q-my-md">Elimina tutti</q-btn>
      <q-list>
        <q-item v-for="file in files" :key="file">
          <q-item-section>{{ file }}</q-item-section>
          <q-item-section side>
            <q-icon color="primary" name="delete" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <h6 class="text-center">Online ({{ downloads.length }})</h6>

    <div v-if="downloads.length > 0">
      <q-list>
        <q-item v-for="file in downloads" :key="file.path">
          <q-item-section>{{ file.path }}</q-item-section>
          <q-item-section side>
            <q-icon
              color="primary"
              name="get_app"
              @click="downloadFile(file)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { Plugins, FilesystemDirectory, Capacitor } from '@capacitor/core'
import { mapState, mapActions } from 'vuex'

const { Filesystem } = Plugins

export default {
  name: 'Downloads',
  data: () => {
    return {
      error: null
    }
  },
  computed: {
    ...mapState('files', ['files']),
    ...mapState('books', ['downloads'])
  },
  methods: {
    ...mapActions('files', ['getFileList', 'downloadFile']),
    ...mapActions('books', ['getDownloadList']),
    ...mapActions('player', ['setTrack'])
  },
  created () {
    this.getDownloadList()
    this.getFileList()
  },
  mounted () {
    Filesystem.getUri({
      path: 'books/il-conformista-moravia-10.mp3',
      directory: FilesystemDirectory.Data
    }).then(result => {
      const src = Capacitor.convertFileSrc(result.uri)

      this.setTrack({ src: src, autoplay: true })
    })
  }
}
</script>
