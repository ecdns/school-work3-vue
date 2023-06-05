<template>
  <router-view />
</template>

<script>
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar()

    return { $q }
  },
}


</script>
