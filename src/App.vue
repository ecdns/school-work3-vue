<template>
  <router-view />
</template>

<script>
import { useQuasar } from "quasar";
import { useAuthStore } from './stores/auth';

export default {
  setup() {
    const $q = useQuasar()
    const authStore = useAuthStore();

    return { authStore, $q }
  },
  async created() {
    if (this.authStore.isAuthenticated) {
      await this.authStore.loadUserData(false);
    }
  }
}


</script>
