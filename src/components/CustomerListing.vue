<template>
  <q-page>
    <div v-if="selected.length > 0">
      <q-btn flat color="primary" label="Créer un projet" />
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

      <div class="q-mt-md">
        Selected: {{ JSON.stringify(selected) }}
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import useQuasar from 'quasar/src/composables/use-quasar.js'
import { useRouter } from 'vue-router';


const columns = [
  {
    name: 'desc',
    required: true,
    label: 'Nom',
    align: 'left',
    field: row => row.name,
    format: val => val,
    sortable: true
  },
  { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
  { name: 'customerCompanyName', label: 'Société', field: 'customerCompanyName', sortable: true },
  { name: 'post', label: 'Rôle', field: 'post' },

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
    onSubmit() {
      customers.value.unshift(
        {
          name: lastName.value + ' ' + firstName.value,
          email: email.value,
          customerCompanyName: customerCompanyName.value,
          post: post.value,
          address: address.value,
          city: city.value,
          zipCode: zipCode.value,
          phone: phone.value
        }
      )
    },
    handleRowClick(_, row) {
      this.router.push(`/customers/${row.id}`)
    },
    getSelectedString() {
      // return selected.value.length === 0 ? '' : ${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${this.customers.length}

      // this.isCustomerSelected = true
      // console.log(selected.value[0].email)
      // console.log(this.isCustomerSelected)
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