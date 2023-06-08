<template>
  <div class="row flex flex-center">
    <div class="col-10 ">

      <div class="row justify-around q-my-sm">
        <q-input :rules="inputRules" outlined v-model="name" name="name" label="Nom" class=" col-5" />
        <q-select :options="productFamilyList" outlined v-model="productFamily" option-label="name" name="productFamily"
          label="Famille de produit" class=" col-5" />
      </div>
      <div class="row justify-around  q-my-sm">
        <q-input type="number" outlined v-model="buyPrice" name="buyPrice" label="Prix d'achat" class="col-5"
          suffix="€" />
        <q-input type="number" outlined v-model="sellPrice" name="sellPrice" label="Prix de vente" class="  col-5"
          suffix="€" />
      </div>
      <div class="row justify-around q-my-sm">
        <q-input type="number" outlined v-model="quantity" name="quantity" label="Quantité" class="col-5" />
        <q-select outlined :options="quantityUnitList" v-model="quantityUnit" option-label="name" name="quantityUnit"
          label="Unité" class=" col-5" />
      </div>
      <div class="row justify-around q-my-sm">
        <q-select :options="supplierList" outlined v-model="supplier" option-label="name" name="supplier"
          label="Fournisseur" class="  col-5" />
        <q-select outlined :options="vatList" v-model="vatName" option-label="name" name="vatName" label="TVA"
          class="  col-5" />
      </div>
      <div class="row justify-around q-my-sm">
        <q-checkbox keep-color v-model="isDiscount" label="Promotion" color="cyan" class="col-5" />
        <q-input outlined type="number" v-model="discount" :disable="!isDiscount" name="discount" label="Promotion"
          suffix="%" class="col-5" />
      </div>

      <div class="row justify-around q-my-sm">
        <q-input :rules="inputRules" outlined v-model="description" type="textarea" name="description" label="Description"
          class="col-11" />
      </div>



      <div class="flex flex-center">
        <q-btn class="" outlined ripple label="Valider" type="submit" color="primary" />
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import { useResource } from 'src/composables/resources'
import { useAuthStore } from 'src/stores/auth'
export default {
  props: {
    dialogVisible: Boolean
  },
  setup() {
    const auth = useAuthStore();

    return { auth }
  },
  data() {
    return {
      inputRules: [
        val => (val && val.length > 0) || "Une information est manquante"
      ],
      productsFamily: useResource(`productFamily/company/${this.auth.me.company}`),
      vats: useResource('vat'),
      quantityUnits: useResource('quantityUnit'),
      suppliers: useResource(`supplier/company/${this.auth.me.company}`),
      productFamilyList: [],
      vatList: [],
      quantityUnitList: [],
      supplierList: [],

      name: '',
      productFamily: '',
      buyPrice: '',
      sellPrice: '',
      quantity: '',
      quantityUnit: '',
      supplier: '',
      vatName: '',
      isDiscount: ref(false),
      discount: '',
      description: ''

    }
  },
  methods: {
    reloadData() {
      this.productsFamily.listWithoutAll().then((res) => {
        this.productFamilyList = res.data
      })
      this.vats.list().then((res) => {
        this.vatList = res.data
      })
      this.quantityUnits.list().then((res) => {
        this.quantityUnitList = res.data
      })
      this.suppliers.listWithoutAll().then((res) => {
        this.supplierList = res.data
      })
    },
  },
  created() {
    this.reloadData();
  }

}
</script>

<style></style>
