<template>
  <q-form action="" method="post" @submit.prevent.stop="onSubmit">
    <q-icon @click="updateCustomerIcon" :name="updateDataIcon" size="2em" color="primary" class="q-ml-lg"></q-icon>
    <div class="row flex flex-center">
      <div class="col-10 ">
        <div class="row justify-around q-my-sm">
          <q-input outlined :readonly="readOnlyData" v-model="item.lastName" name="lastName" label="Nom"
            class=" input col-5" />
          <q-input outlined :readonly="readOnlyData" v-model="item.firstName" name="firstName" label="Prénom"
            class=" input col-5" />
        </div>
        <div class="row justify-around  q-my-sm">
          <q-input outlined :readonly="readOnlyData" v-model="item.name" name="customerCompanyName" label="Société"
            class="  input col-5" />
          <q-input outlined :readonly="readOnlyData" v-model="item.job" name="post" label="Rôle" class="  input col-5" />
        </div>
        <div class="row justify-around q-my-sm">
          <q-input outlined :readonly="readOnlyData" v-model="item.phone" name="phone" label="Téléphone"
            class="  input col-5" />
          <q-input outlined :readonly="readOnlyData" v-model="item.email" name="email" label="Email"
            class="  input col-5" />
        </div>
        <div class="row justify-around q-my-sm">
          <q-input outlined :readonly="readOnlyData" v-model="item.address" name="address" label="Adresse"
            class="  input col-5" />
          <q-input outlined :readonly="readOnlyData" v-model="item.country" name="country" label="Pays"
            class="  input col-5" />
        </div>
        <div class="row justify-around q-my-sm">
          <q-input outlined :readonly="readOnlyData" v-model="item.zipCode" name="zipCode" ref="zipCodeRef"
            label="Code Postal" class=" input col-3" />
          <q-input outlined :readonly="readOnlyData" v-model="item.city" name="city" label="Ville" class="input col-7" />
        </div>

        <div class="flex flex-center q-py-md">
          <q-btn class="" outlined ripple label="Mettre à jour" :disable="!areDataUpdated" color="primary"
            @click="updateCustomer" />
        </div>
      </div>

    </div>
  </q-form>
</template>

<script>
import { useResource } from "../composables/resources.js"
import { useRoute } from 'vue-router';



export default {
  setup() {
    const route = useRoute()
    return {
      route,
    }
  },

  data() {
    return {

      readOnlyData: true,
      updateDataIcon: "lock",
      customer: useResource('customer'),
      item: {},
      copyItem: {},
      updatedData: {},

      customerCompanyName: 'Carrefour',
      post: 'Manager',
    }
  },

  computed: {
    areDataUpdated() {
      if (this.copyItem.lastName !== this.item.lastName ||
        this.copyItem.firstName !== this.item.firstName ||
        this.copyItem.email !== this.item.email ||
        this.copyItem.address !== this.item.address ||
        this.copyItem.city !== this.item.city ||
        this.copyItem.country !== this.item.country ||
        this.copyItem.zipCode !== this.item.zipCode ||
        this.copyItem.phone !== this.item.phone ||
        this.copyItem.name !== this.item.name ||
        this.copyItem.job !== this.item.job
      ) {
        return true;
      }
      return false;
    }
  },


  methods: {
    getUpdatedData() {
      for (const property in this.item) {
        if (this.copyItem[property] !== this.item[property]) {
          this.updatedData[property] = this.item[property]
        }
      }
      return JSON.stringify(this.updatedData)
    },


    updateCustomerIcon() {
      this.readOnlyData = !this.readOnlyData,
        this.readOnlyData ? this.updateDataIcon = "lock" : this.updateDataIcon = "lock_open"

    },

    updateCustomer() {
      this.customer.update(this.route.params.id, this.getUpdatedData())
        .then((res) => console.log(res))
      // console.log(this.getUpdatedData())
    },

    getOneCustomer() {
      this.customer.get(this.route.params.id)
        .then((res) => {
          this.item = res
          this.copyItem = {
            ...this.item
          }
          this.$emit('loadHeader', `${this.item.firstName}, ${this.item.lastName},${this.item.job}, ${this.item.name}  `)
        })
        .catch((err) => {
          console.log(err)
        })
    },


  },
  created() {
    this.getOneCustomer();

  },
}
</script>

<style></style>

