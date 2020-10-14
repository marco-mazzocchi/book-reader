<template>
  <q-page padding>
    <h4 class="text-center">Downloads</h4>
  </q-page>
</template>

<script>
import { Plugins, FilesystemDirectory } from '@capacitor/core'

const { Filesystem } = Plugins

export default {
  name: 'Downloads',
  methods: {
    getFileList () {
      const dir = FilesystemDirectory.Documents
      Filesystem.readdir(dir).then(ReaddirResult => {
        console.log(ReaddirResult)
      })
    }
  },
  mounted () {
    this.getFileList()
  }

}
</script>
