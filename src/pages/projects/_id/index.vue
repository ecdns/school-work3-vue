<template>
  <q-page class="fit">
    <q-card class="q-ma-md">
      <q-card-section>
        <q-btn icon="arrow_back" @click="goback" class="q-mb-md" outlined ripple label="Retour" type="button"
          color="primary" />
        <div class="text-h6">{{ project.name }}</div>
        <div class="text-subtitle2">{{ project.description }}</div>
      </q-card-section>
      <q-tabs v-model="tab" dense class="bg-grey-3 text-grey-7" active-color="primary" indicator-color="purple"
        align="justify">
        <q-tab name="details" label="Détails" />
        <q-tab name="bill" label="Facture" />
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
                  <q-input :disable="true" outlined v-model="project.companyName" name="company" label="Entreprise"
                    class=" input col-5" />
                  <q-input :disable="true" outlined v-model="project.nameString" name="creator" label="Créateur"
                    class=" input col-5" />
                </div>
                <div class="row justify-around q-my-sm">
                  <q-select class="input col-5" filled v-model="project.customer" :options="customersList"
                    option-label="name" label="Client" />
                  <q-select class="input col-5" filled v-model="project.projectStatus" :options="statusList"
                    option-label="name" label="Statut" />
                </div>
                <div class="flex column flex-center q-py-md">
                  <q-btn class="q-mb-md" outlined ripple label="Mettre à jour" type="submit" color="primary" />
                </div>
              </div>
            </div>
          </q-form>
          <q-list padding bordered class="rounded-borders">
            <q-expansion-item icon="perm_identity" label="Liste des utilisateurs du projet">
              <q-card>
                <q-card-section v-for="user in usersProjectList" v-bind:key="user.id">
                  {{ user.firstName + ' ' + user.lastName }}
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
          <q-form @submit.prevent.stop="addUserToProject(user)">
            <q-select filled v-model="user" use-chips label="Choisir un utilisateur" :options="usersList"
              option-label="email" option-value="id" lazy-rules :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Veuillez sélectionner un utilisateur',
              ]">
            </q-select>
            <q-btn class="q-mb-md" outlined ripple label="Ajouter un utilisateur" type="submit" color="primary" />
          </q-form>
        </q-tab-panel>

        <q-tab-panel name="bill">
          <div class="float-right">
            <q-btn color="primary" label="Ajouter une facture" @click="dialogVisible = true" />
          </div>
          <q-dialog v-model="dialogVisible" transition-show="slide-down" transition-hide="slide-up"
            class="flex flex-center column">
            <q-card style="min-width: 60vw">
              <q-card-section>
                <q-form action="" method="post" @submit.prevent.stop="onSubmitInvoice">
                  <InvoiceForm ref="InvoiceForm" />
                </q-form>
              </q-card-section>
            </q-card>
          </q-dialog>
          <div class="text-h6 q-mt-xl">Ma liste de factures</div>
          <invoice-list :invoices="items" />
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
import InvoiceList from 'src/components/InvoiceList.vue';
import { useAuthStore } from 'src/stores/auth';
import InvoiceForm from "components/InvoiceForm.vue";

export default {
  components: {
    InvoiceList,
    InvoiceForm
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
    const users = useResource("user/company/" + auth.me.company);


    return {
      auth,
      tab: ref("details"),
      route,
      projectId,
      projects,
      invoices,
      users,
      customers,
      companies,
      status,
      q
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
      customersList: [],
      usersList: [],
      user: {},
      dialogVisible: false,
      postData: {},
      usersProjectList: []
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
      this.users.listWithoutAll().then((res) => {
        res.data.forEach(element => {
          this.usersList.push(element)
        });
      })
      this.projects.get(this.route.params.id).then((res) => {
        this.usersProjectList = res.users
        this.project = res
        this.project.name = res.name;
        this.project.description = res.description;
        this.project.customer = res.customer;
        this.project.projectStatus = res.projectStatus;
        this.project.creator = res.creator;
        this.project.nameString = this.project.creator.firstName + ' ' + this.project.creator.lastName
        this.project.companyName = res.company.name;
      });
      const invoiceByProject = useResource("invoice/project/" + this.route.params.id)
      invoiceByProject.listWithoutAll().then((res) => {
        this.items = res.data
      })
    },
    goback() {
      this.$router.go(-1);
    },
    onSubmitInvoice() {
      this.postData = {
        ... {
          name: this.$refs.InvoiceForm.name,
          description: this.$refs.InvoiceForm.description,
          project: this.project.id
        }
      }
      this.invoices.create(JSON.stringify(this.postData)).then(res => {
        console.log(res);
        this.$refs.InvoiceForm.products.forEach((product) => {
          console.log(res.id)
          console.log(product)
          console.log(product.quantity)
          const invoiceProducts = useResource("invoice/" + res.id + "/product/" + product.selectedValue.value + "/quantity/" + product.quantity)
          invoiceProducts.create().then((res) => {
            window.location.reload();
          })
        })

        this.q.notify({
          position: "top",
          type: "positive",
          message: `La facture a bien été créé`,
          timeout: 3500
        })
      }).catch(() => {
        this.q.notify({
          position: "top",
          type: "negative",
          message: `Erreur lors de la création de la facture`,
        });
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
    addUserToProject(user) {
      const projectsUser = useResource('project/' + this.route.params.id + '/addUser/' + user.id);

      projectsUser.put().then(() => {
        this.q.notify({
          position: "top",
          type: "positive",
          message: `L'utilisateur a bien été ajouté`,
        });
      }).catch(() => {
        this.q.notify({
          position: "top",
          type: "negative",
          message: `Erreur lors de l'ajout de l'utilisateur`,
        });
      })
    }
  },
}

</script>
