<template>
  <q-page class="fit">
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6">{{ project.name }}</div>
        <div class="text-subtitle2">{{ project.description }}</div>
      </q-card-section>
      <q-tabs v-model="tab" dense class="bg-grey-3 text-grey-7" active-color="primary" indicator-color="purple"
        align="justify">
        <q-tab name="details" label="Détails" />
        <q-tab name="bill" label="Facture" />
        <q-tab name="documents" label="Documents" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="details">
          <q-form @submit.prevent.stop="onSubmit">
            <div class="row flex flex-center">
              <div class="col-10 ">
                <div class="row justify-around q-my-sm">
                  <q-input outlined v-model="project.name" name="name" label="Nom" class=" input col-5" />
                  <q-input outlined v-model="project.description" name="description" label="Description"
                    class=" input col-5" />
                </div>
                <div class="row justify-around q-my-sm">
                  <q-input :disable="true" outlined :v-model="auth.me.company" name="company" label="Entreprise"
                    class=" input col-5" />
                  <q-input :disable="true" outlined v-model="auth.me.firstName" name="creator" label="Créateur"
                    class=" input col-5" />
                </div>
                <div class="row justify-around q-my-sm">
                  <q-select filled v-model="project.customer" :options="customersList" option-label="name"
                    label="Client" />
                  <q-select filled v-model="project.projectStatus" :options="statusList" option-label="name"
                    label="Statut" />
                </div>
                <div class="flex flex-center q-py-md">
                  <q-btn class="" outlined ripple label="Mettre à jour" type="submit" color="primary" />
                </div>
              </div>
            </div>
          </q-form>
        </q-tab-panel>

        <q-tab-panel name="bill">
          <div class="text-h6">Ma liste de factures</div>
          <invoice-list :invoices="items" />
        </q-tab-panel>

        <q-tab-panel name="documents">
          <div class="text-h6">Déposer un fichier</div>
          <div class="q-pa-md">
            <div class="q-gutter-md row items-start">
              <q-input @update:model-value="val => { file = val[0] }" filled type="file" hint="Déposer ici !" />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>

import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { useResource } from 'src/composables/resources';
import useQuasar from 'quasar/src/composables/use-quasar';
// import jsPDF from 'jspdf';
import InvoiceList from 'src/components/InvoiceList.vue';
import { useAuthStore } from 'src/stores/auth';

export default {
  components: {
    InvoiceList
  },
  setup() {
    const projects = useResource("project");
    const invoices = useResource("invoice");
    const customers = useResource("customer")
    const companies = useResource("company");
    const status = useResource("projectStatus");
    const route = useRoute();
    const projectId = ref(route.params.id);
    const q = useQuasar();
    const auth = useAuthStore();

    return {
      tab: ref("details"),
      route,
      projectId,
      projects,
      invoices,
      customers,
      companies,
      status,
      q,
      auth
    };
  },
  created() {
    this.reloadData();
  },
  data() {
    return {
      project: {},
      readOnlyData: true,
      updateDataIcon: "lock",
      file: ref(null),
      files: ref(null),
      items: [],
      statusList: [],
      customersList: []
    };
  },

  methods: {
    reloadData() {
      this.status.list().then((res) => {
        this.statusList = res.data
      })
      this.customers.list().then((res) => {
        this.customersList = res.data
      })
      this.projects.get(this.route.params.id).then((res) => {
        this.project = res
        this.project.name = res.name;
        this.project.description = res.description;
        this.project.customer = res.customer;
        this.project.projectStatus = res.projectStatus;
      });
      this.invoices.listWithoutAll().then((res) => {
        this.items = res.data
      })
    },
    onSubmit() {
      this.project.customer = this.project.customer.id
      this.project.projectStatus = this.project.projectStatus.id
      this.project.company = this.project.company.id
      this.project.creator = this.auth.me.id
      this.projects.update(this.route.params.id, this.project).then(() => {
        this.q.notify({
          position: "top",
          type: "positive",
          message: `Le projet a bien été modifié`,
        });
        this.reloadData();
      }).catch(() => {
        this.q.notify({
          position: "top",
          type: "negative",
          message: `Erreur lors de la modification du projet`,
        });
      });
    },
    exportToPDF() {
      const doc = new jsPDF();
      doc.text("Contenu du PDF", 10, 10);
      doc.save("mon-fichier.pdf");
    },
  },
}

</script>
