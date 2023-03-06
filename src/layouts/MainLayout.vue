<template>
  <q-layout view="lHh Lpr lFf">
    <TopBar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import TopBar from 'src/components/TopBar.vue'

export default {
  name: 'MainLayout',

  components: {
    TopBar
  },
}
</script>
