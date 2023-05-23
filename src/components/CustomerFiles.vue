<template>
  <div class="text-h6 q-mr-lg">Documents ({{ files.length }})</div>
  <div><q-uploader url="http://localhost:4444/upload" style="max-width: 300px" /></div>
  <div v-if="files.length !== 0">

  </div>
  <div v-else>
    <div class=" flex flex-center">
      <q-icon size="10rem" name="block"></q-icon>
    </div>
    <div class="text-h4 q-my-md" style="text-align: center">Aucun document n'est associée à ce client</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: []
    }
  }
}
</script>

<style></style>
