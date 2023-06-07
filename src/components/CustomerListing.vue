<template>
  <q-page>
    <div v-if="selected.length > 0">
      <q-btn flat color="red" label="SUPPRIMER" @click="confirm = true" />
    </div>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Voulez-vous vraiment supprimer le/les client(s) selectioné(s) ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup />
          <q-btn flat label="OUI" color="red" @click="deleteAction(clickedActionIndex)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="q-pa-md" @click="deleteCustomer">

      <q-table flat bordered title="Clients" :rows="customers" :columns="columns" row-key="email"
        :selected-rows-label="getSelectedString" selection="multiple" v-model:selected="selected"
        @row-click="handleRowClick" />


    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import useQuasar from 'quasar/src/composables/use-quasar.js'
import { useRouter } from 'vue-router';


const columns = [
  {
    name: 'lastName',
    required: true,
    label: 'Nom',
    align: 'left',
    field: "lastName",
    format: val => val,
    sortable: true
  },
  { name: 'firstName', align: 'center', label: 'Prénom', field: 'firstName', sortable: true },
  { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
  { name: 'company', align: 'center', label: 'Société', field: 'name', sortable: true },
  { name: 'job', align: 'center', label: 'Rôle', field: 'job' },

]

const selected = ref([])
export default {
  props: {
    customers: ref(Array),
  },
  setup() {
    const router = useRouter();

    return {
      router
    }
  },
  data() {
    return {

      dialogVisible: ref(false),
      confirm: false,
      selected,
      columns,

      lastName: '',
      firstName: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
      phone: '',
      customerCompanyName: '',
      post: '',
    }
  },
  methods: {

    handleRowClick(_, row) {
      this.router.push(`/customers/${row.id}`)
    },

    deleteCustomer() {
      selected.value.map((customerRow) => {
        let selectedCustomerEmail = customerRow.email
        console.log(selectedCustomerEmail)
      })
    }

  },
  components: {}
}
</script>
