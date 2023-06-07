<template>
  <q-page class="fit">
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6">{{ headerFirstName }} {{ headerLastName }}</div>
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
          <CustomerDetailForm @loadHeader="setHeader($event)" />
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

import CustomerDetailForm from '../../../components/CustomerDetailForm.vue';
import CustomerAction from '../../../components/CustomerAction.vue';
import CustomerProject from '../../../components/CustomerProject.vue';
import CustomerBill from '../../../components/CustomerBill.vue';
import CustomerFiles from '../../../components/CustomerFiles.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const projectId = ref(route.params.id);
    return {
      tab: ref("details"),
      route,
      projectId
    };
  },

  data() {
    return {
      headerFirstName: "",
      headerLastName: "doe"
    }
  },
  methods: {
    setHeader(event) {
      this.headerFirstName = event.split(',')[0]
      this.headerLastName = event.split(',')[1]
    },
  },
  components: { CustomerDetailForm, CustomerAction, CustomerProject, CustomerBill, CustomerFiles },

  mounted() {
    // this.setHeader($event)
  }
}

</script>
