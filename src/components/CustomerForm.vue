<template>
  <div class="row flex flex-center">
    <div class="col-10 ">
      <p class="text-h6">Nouveau client </p>
      <q-separator color="primary" class="q-my-md" />
      <div class="row justify-around q-my-sm">
        <q-input outlined v-model="lastName" name="lastName" label="Nom" class=" col-5" />
        <q-input outlined v-model="firstName" name="firstName" label="Prénom" class=" col-5" />
      </div>
      <div class="row justify-around  q-my-sm">
        <q-input outlined v-model="customerCompanyName" name="customerCompanyName" label="Société" class="  col-5" />
        <q-input outlined v-model="post" name="post" label="Rôle" class="  col-5" />
      </div>
      <div class="row justify-around q-my-sm">
        <q-input outlined v-model="phone" name="phone" label="Téléphone" class="  col-5" />
        <q-input outlined v-model="email" name="email" label="Email" class="  col-5" />
      </div>
      <div class="row justify-around q-my-sm">
        <q-input outlined v-model="address" name="address" label="Adresse" class="  col-5" />
        <q-input outlined v-model="country" name="country" label="Pays" class="  col-5" />
      </div>
      <div class="row justify-around q-my-sm">
        <q-input outlined v-model="zipCode" name="zipCode" ref="zipCodeRef" label="Code Postal" class="  col-3" />
        <q-input outlined v-model="city" name="city" label="Ville" class="  col-7" />
      </div>


      <div class="flex flex-center">
        <q-btn class="" outlined ripple label="Valider" type="submit" color="primary" />

      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue';
export default {

  data() {
    return {
      lastName: '',
      firstName: '',
      customerCompanyName: '',
      post: '',
      city: '',
      zipCode: '',
      phone: ''

    }
  }
}
</script>

<style></style>
