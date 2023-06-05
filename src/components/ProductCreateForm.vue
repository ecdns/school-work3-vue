<template>
  <div class="row flex flex-center">
    <div class="col-10 ">

      <div class="row justify-around q-my-sm">
        <q-input outlined v-model="name" name="name" label="Nom" class=" col-5" />
        <q-select :options="productFamilyTable" outlined v-model="productFamily" name="productFamily"
          label="Type de produit" class=" col-5" />
      </div>
      <div class="row justify-around  q-my-sm">
        <q-input type="number" outlined v-model="buyPrice" name="buyPrice" label="Prix d'achat" class="col-5"
          suffix="€" />
        <q-input type="number" outlined v-model="sellPrice" name="sellPrice" label="Prix de vente" class="  col-5"
          suffix="€" />
      </div>
      <div class="row justify-around q-my-sm">
        <q-input type="number" outlined v-model="quantity" name="quantity" label="Quantité" class="col-5" />
        <q-select outlined :options="quantityUnitTable" v-model="quantityUnit" name="quantityUnit" label="Unité"
          class=" col-5" />
      </div>
      <div class="row justify-around q-my-sm">
        <q-select :options="supplierTable" outlined v-model="supplier" name="supplier" label="Fournisseur"
          class="  col-5" />
        <q-input type="number" outlined v-model="vat" name="vat" label="TVA" suffix="%" class="  col-5" />
      </div>
      <div class="row justify-around q-my-sm">
        <q-checkbox keep-color v-model="discCheckbox" label="Promotion" color="cyan" class="col-5" />
        <q-input outlined type="number" v-model="discount" :disable="!discCheckbox" name="discount" label="Promotion"
          suffix="%" class="col-5" />
      </div>

      <div class="row justify-around q-my-sm">
        <q-input outlined v-model="description" type="textarea" name="description" label="Description" class="col-11" />
      </div>



      <div class="flex flex-center">
        <q-btn class="" outlined ripple label="Valider" type="submit" color="primary" />
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
      name: '',

      productFamily: '',
      productFamilyTable: ["Ecran", "Clavier", "Souris", " PC Portable", "Table",],

      buyPrice: '',
      sellPrice: '',

      quantity: '',
      quantityUnit: '',
      quantityUnitTable: ['m', 'L', 'Kg', , 'unité'],

      supplier: '',
      supplierTable: ['Carrefour', 'LEC', 'Boulanger', 'Amazon'],

      vat: '',

      discCheckbox: ref(false),
      discount: '',

      description: ''

    }
  }
}
</script>

<style></style>
