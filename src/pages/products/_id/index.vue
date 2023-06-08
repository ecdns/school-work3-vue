<template>
  <q-page class="fit">
    <q-card class="q-ma-md">
      <q-btn icon="arrow_back" @click="goBack" label="Retour" color="primary" class="q-mb-md" />

      <q-tabs v-model="tab" dense class="bg-grey-3 text-grey-7" active-color="primary" indicator-color="purple"
        align="justify">
        <q-tab name="details" label="Détails" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated class="bg-white text-black">
        <q-tab-panel name="details">
          <q-form method="post" @submit.prevent.stop="onSubmit">
            <ProductDetailForm />
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import ProductDetailForm from '../../../components/ProductDetailForm.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useResource } from 'src/composables/resources';

export default {
  props: {
    id: {
      type: String,
    },
    name: String,
    reference: String,
    supplier: String
  },

  setup() {
    const route = useRoute()
    return {
      tab: ref("details"),
      route,

    };
  },
  data() {
    return {
      product: useResource('product')
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },

  components: { ProductDetailForm, },





}

</script>
