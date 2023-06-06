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





export default {
  components: {
    CustomerListing,
    CustomerForm,
  },
  data() {
    return {
      dialogVisible: false,
      customers: useResource('customer'),
      items: []
    }
  },

  methods: {
    onSubmit() {
      this.customers.unshift(
        {
          name: this.$refs.CustomerForm.lastName + ' ' + this.$refs.CustomerForm.firstName,
          email: this.$refs.CustomerForm.email,
          customerCompanyName: this.$refs.CustomerForm.customerCompanyName,
          post: this.$refs.CustomerForm.post,
          address: this.$refs.CustomerForm.address,
          city: this.$refs.CustomerForm.city,
          zipCode: this.$refs.CustomerForm.zipCode,
          phone: this.$refs.CustomerForm.phone

        }
      )
    },

    getCustomers() {
      this.customers.list()
        .then(response => {
          this.items = response.data
          // console.log(this.items[0])
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
