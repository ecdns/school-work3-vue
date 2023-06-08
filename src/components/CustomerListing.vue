<template>
  <q-page>
    <div v-if="selected.length > 0">
      <q-btn flat color="primary" label="CHANGER le statut" @click="confirm = true" />
    </div>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="row justify-around  q-my-sm">
            <q-select filled v-model="status" use-chips label="Statut" :options="statusList" style="width: 250px"
              option-label="name" option-value="id" class=" col-10">
            </q-select>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup />
          <q-btn flat label="OUI" color="red" @click="updateCustomerStatus" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="q-pa-md">

      <q-table flat bordered title="Clients" :rows="customers" :columns="columns" row-key="email"
        :selected-rows-label="getSelectedString" selection="multiple" v-model:selected="selected"
        @row-click="handleRowClick" rows-per-page-label="Résultats par page" :pagination-label="customPaginationLabel" />


    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useResource } from 'src/composables/resources';
import { useQuasar } from 'quasar'



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
  { name: 'firstName', align: 'center', label: 'Prénom', field: 'firstName', sortable: true, },
  { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
  { name: 'status', align: 'center', label: 'Statut', field: row => row.status.name, sortable: true, style: row => `background-color: ${row.backgroundColor}` },
  { name: 'company', align: 'center', label: 'Société', field: 'name', sortable: true },
  { name: 'job', align: 'center', label: 'Rôle', field: 'job', },

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
      q: useQuasar(),
      customer: useResource('customer'),
      statusList: [],
      customerStatus: useResource('customerStatus'),
      pagination: {
        sortBy: 'column1',
        descending: false,
        page: 1,
        rowsPerPage: 10
      },

      dialogVisible: ref(false),
      confirm: false,
      selected,
      columns,
      status: '',

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
    customPaginationLabel(firstRowIndex, endRowIndex, totalRowsNumber) {
      return `${firstRowIndex}-${endRowIndex} sur ${totalRowsNumber}`;
    },

    updateCustomerStatus() {
      selected.value.map((customerRow) => {
        // console.log(this.statusList)
        this.customer.update(customerRow.id, JSON.stringify({ status: this.status }))
          .then((res) => {
            window.location.reload();
          })
      })
    },

    reloadData() {
      this.customerStatus.list().then((res) => {
        res.data.forEach(element => {
          this.statusList.push(element);
        });
      }).catch((err) => {
        console.log(err)
      })

    },

  },
  created() {
    this.reloadData();
  },
  components: {}
}
</script>
