<template>
  <q-page padding>
    <h4 class="text-center">Downloads</h4>
    <q-banner v-if="error" class="text-white bg-red">
      {{error}}
    </q-banner>

    <h6 class="text-center">count {{downloads.length}}</h6>

    <div v-if="downloads.length > 0">
      <q-list>
        <q-item v-for="file in downloads" :key="file.path">
          <q-item-section>{{file.path}}</q-item-section>
          <q-item-section side>
            <q-icon color="primary" name="delete" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div v-if="files.length > 0">
      <q-btn color="danger" rounded class="q-my-md">Elimina tutti</q-btn>
      <q-list>
        <q-item v-for="file in files" :key="file">
          <q-item-section>{{file}}</q-item-section>
          <q-item-section side>
            <q-icon color="primary" name="delete" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
// import { mapActions, mapState, mapGetters } from 'vuex'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('books')

export default {
  name: 'Downloads',
  data: () => {
    return {
      error: null
    }
  },
  computed: {
    ...mapState(['files', 'downloads'])
  },
  methods: {
    ...mapActions(['getDownloadList', 'getFileList'])
  },
  created () {
    this.getDownloadList()
    // this.getFileList()
  }
}
</script>
