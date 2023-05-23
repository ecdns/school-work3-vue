<template>
  <q-form action="" method="post" @submit.prevent.stop="onSubmit">
    <q-icon @click="UpdateCustomer" :name="updateDataIcon" size="2em" color="primary" class="q-ml-lg"></q-icon>
    <div class="row flex flex-center">
      <div class="col-10 ">
        <div class="row justify-around q-my-sm">
          <q-input outlined :readonly="readOnlyData" v-model="lastName" name="lastName" label="Nom"
            class=" input col-5" />
          <q-input outlined :readonly="readOnlyData" v-model="firstName" name="firstName" label="Prénom"
            class=" input col-5" />
        </div>
        <div class="row justify-around  q-my-sm">
          <q-input outlined :readonly="readOnlyData" v-model="customerCompanyName" name="customerCompanyName"
            label="Société" class="  input col-5" />
          <q-input outlined :readonly="readOnlyData" v-model="post" name="post" label="Rôle" class="  input col-5" />
        </div>
        <div class="row justify-around q-my-sm">
          <q-input outlined :readonly="readOnlyData" v-model="phone" name="phone" label="Téléphone"
            class="  input col-5" />
          <q-input outlined :readonly="readOnlyData" v-model="email" name="email" label="Email" class="  input col-5" />
        </div>
        <div class="row justify-around q-my-sm">
          <q-input outlined :readonly="readOnlyData" v-model="address" name="address" label="Adresse"
            class="  input col-5" />
          <q-input outlined :readonly="readOnlyData" v-model="country" name="country" label="Pays"
            class="  input col-5" />
        </div>
        <div class="row justify-around q-my-sm">
          <q-input outlined :readonly="readOnlyData" v-model="zipCode" name="zipCode" ref="zipCodeRef" label="Code Postal"
            class=" input col-3" />
          <q-input outlined :readonly="readOnlyData" v-model="city" name="city" label="Ville" class="input col-7" />
        </div>

        <div class="flex flex-center q-py-md">
          <q-btn class="" outlined ripple label="Mettre à jour" :disable="!areDataUpdated" type="submit"
            color="primary" />
        </div>
      </div>

    </div>
  </q-form>
</template>

<script>
export default {
  data() {
    return {
      readOnlyData: true,
      updateDataIcon: "lock",

      lastName: 'Jhon',
      firstName: 'Doe',
      customerCompanyName: 'Carrefour',
      post: 'Manager',
      phone: '0785458487',
      email: 'jhon.doe@carrefour.fr',
      address: '12 rue saint honoré',
      country: 'France',
      zipCode: '78 410',
      city: 'Paris',


    }
  },

  computed: {
    areDataUpdated() {
      if (this.lastName !== "Jhon") {
        return true;
      }
      return false;
    }
  },


  methods: {


    UpdateCustomer() {
      this.readOnlyData = !this.readOnlyData,
        this.readOnlyData ? this.updateDataIcon = "lock" : this.updateDataIcon = "lock_open"

    },
  }

}
</script>

<style></style>
