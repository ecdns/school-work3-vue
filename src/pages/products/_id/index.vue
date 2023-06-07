<template>
  <q-page class="fit">
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6">Jhon Doe</div>
        <div class="text-subtitle2">Manager, Carrefour</div>

      </q-card-section>
      <q-tabs v-model="tab" dense class="bg-grey-3 text-grey-7" active-color="primary" indicator-color="purple"
        align="justify">
        <q-tab name="details" label="Détails" />
        <q-tab name="action" label="Action" />
        <q-tab name="project" label="Projet" />
        <q-tab name="bill" label="Facture" />
        <q-tab name="documents" label="Documents" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated class="bg-white text-black">
        <q-tab-panel name="details">
          <ProductCreateForm />
        </q-tab-panel>

        <q-tab-panel name="action">
          <CustomerAction />
        </q-tab-panel>

        <q-tab-panel name="project">
          <CustomerProject />
        </q-tab-panel>

        <q-tab-panel name="bill">
          <CustomerBill />
        </q-tab-panel>

        <q-tab-panel name="documents">
          <CustomerFiles />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import ProductCreateForm from '../../../components/ProductCreateForm.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  props: {
    id: {
      type: String,
    },
    name: String,
    reference: String,
    supplier: String
  },

  setup(props) {
    const route = useRoute();
    const projectId = ref(route.params.id);

    onMounted(() => {
      let data = route.params.data;
    });
    return {
      tab: ref("details"),
      route,
      projectId
    };
  },
  components: { ProductCreateForm, },





}

</script>
