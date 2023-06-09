<template>
  <div class="row flex justify-end"> <q-icon v-close-popup name="close" size="1.5rem" style="cursor:pointer" />
  </div>

  <div class="row flex flex-center">
    <div class="col-10 ">
      <p class="text-h6 col-10">Nouveau client </p>

      <q-separator color="primary" class="q-my-md" />
      <div class="row justify-around q-my-sm">
        <q-input outlined v-model="lastName" :rules="inputRules" name="lastName" label="Nom" class=" col-5" />
        <q-input outlined v-model="firstName" :rules="inputRules" name="firstName" label="Prénom" class=" col-5" />
      </div>
      <div class="row justify-around  q-my-sm">
        <q-input outlined v-model="name" :rules="inputRules" name="name" label="Société" class="  col-5" />
        <q-input outlined v-model="job" :rules="inputRules" name="job" label="Rôle" class="  col-5" />
      </div>
      <div class="row justify-around  q-my-sm">
        <q-select filled v-model="status" use-chips label="Statut" :options="statusList" style="width: 92%"
          option-label="name" option-value="id" class=" col-10">
        </q-select>
      </div>
      <div class="row justify-around q-my-sm">
        <q-input outlined v-model="phone" :rules="inputRules" name="phone" label="Téléphone" class="  col-5" />
        <q-input outlined v-model="email" :rules="inputRules" name="email" label="Email" class="  col-5" />
      </div>
      <div class="row justify-around q-my-sm">
        <q-input outlined v-model="address" :rules="inputRules" name="address" label="Adresse" class="  col-5" />
        <q-input outlined v-model="country" :rules="inputRules" name="country" label="Pays" class="  col-5" />
      </div>
      <div class="row justify-around q-my-sm">
        <q-input outlined v-model="zipCode" :rules="inputRules" name="zipCode" label="Code Postal" class="  col-3" />
        <q-input outlined v-model="city" :rules="inputRules" name="city" label="Ville" class="  col-7" />
      </div>


      <div class="flex flex-center">
        <q-btn class="" outlined ripple label="Valider" type="submit" color="primary" />

      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue';
import { useResource } from 'src/composables/resources';
export default {

  data() {

    return {
      lastName: '',
      firstName: '',
      name: '',
      email: '',
      job: '',
      city: '',
      zipCode: '',
      phone: '',
      status: '',

      statusList: [],
      customerStatus: useResource('customerStatus'),
      inputRules: [
        val => (val && val.length > 0) || "Une information est manquante"
      ],

    }
  },
  methods: {
    reloadData() {
      this.customerStatus.list().then((res) => {
        res.data.forEach(element => {
          this.statusList.push(element);
        });
      }).catch((err) => {
        console.log(err)
      })
      // console.log(this.statusList)
    }
  },
  created() {
    this.reloadData()
  }
}
</script>

<style></style>
