<template>
  <q-page>
    <div class="q-pt-lg q-pr-md row justify-end">
      <q-btn class="col-2 " push outline rounded color="primary" icon="add" label="NOUVEAU CLIENT"
        @click="dialogVisible = true">
      </q-btn>
    </div>
    <q-dialog v-model="dialogVisible" position="absolute" transition-show="slide-down" transition-hide="slide-up"
      class="flex flex-center column">
      <q-card style="min-width: 60vw" @click="getCustomers">
        <q-card-section>
          <q-form action="" method="post" @submit.prevent.stop="onSubmit">
            <CustomerForm ref="CustomerForm" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <CustomerListing :customers=items></CustomerListing>
  </q-page>
</template>


<script>

import CustomerListing from 'src/components/CustomerListing.vue';
import CustomerForm from 'src/components/CustomerForm.vue';
import { useResource } from "../../composables/resources.js"
import { useAuthStore } from 'src/stores/auth.js';
import { useQuasar } from 'quasar'






export default {
  components: {
    CustomerListing,
    CustomerForm,
  },
  data() {
    return {
      dialogVisible: false,
      customers: useResource('customer'),
      items: [],
      postData: {},
      auth: useAuthStore(),
      q: useQuasar(),

    }
  },

  methods: {
    onSubmit() {
      this.postData = {
        ... {
          lastName: this.$refs.CustomerForm.lastName,
          firstName: this.$refs.CustomerForm.firstName,
          email: this.$refs.CustomerForm.email,
          name: this.$refs.CustomerForm.name,
          job: this.$refs.CustomerForm.job,
          address: this.$refs.CustomerForm.address,
          city: this.$refs.CustomerForm.city,
          zipCode: this.$refs.CustomerForm.zipCode,
          country: this.$refs.CustomerForm.country,
          phone: this.$refs.CustomerForm.phone,
          status: this.$refs.CustomerForm.status.id,
          company: this.auth.me.company,
          user: this.auth.me.email
        }
      }
      this.customers.create(JSON.stringify(this.postData)).then((res) => {
        window.location.reload();
        this.q.notify({
          position: "top",
          type: "positive",
          message: `Le client a bien été créé`,
          timeout: 3500
        })
      }).catch(() => {
        this.q.notify({
          position: "top",
          type: "negative",
          message: `Erreur lors de la création du projet`,
        });
      })
    },

    getCustomers() {
      this.customers.list()
        .then(response => {
          this.items = response.data
          this.items.forEach(customer => {
            if (customer.status.name === "Client") {
              customer.backgroundColor = "#DDFFBC"
            } else if (customer.status.name === "Prospect") {
              customer.backgroundColor = "#FFF4D2"
            } else {
              customer.backgroundColor = "#DDDDDD"
            }
          })
        })
        .catch(error => {
          console.log(error);
        });
    },

  },

  created() {
    this.getCustomers();
  }
}


</script>

<style></style>
