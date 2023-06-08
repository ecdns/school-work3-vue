<template>
  <q-form action="" method="post" @submit.prevent.stop="onSubmit">
    <q-icon @click="updateCustomerIcon" :name="updateDataIcon" size="2em" color="primary" class="q-ml-lg"></q-icon>
    <div class="row flex flex-center">
      <div class="col-10 ">

        <div class="row justify-around q-my-sm">
          <q-input :rules="inputRules" outlined :readonly="readOnlyData" v-model="name" name="name" label="Nom"
            class=" col-5" />
          <q-select :options="productFamilyList" outlined :readonly="readOnlyData" v-model="productFamily"
            option-label="name" name="productFamily" label="Famille de produit" class=" col-5" />
        </div>
        <div class="row justify-around  q-my-sm">
          <q-input type="number" outlined :readonly="readOnlyData" v-model="buyPrice" name="buyPrice" label="Prix d'achat"
            class="col-5" suffix="€" />
          <q-input type="number" outlined :readonly="readOnlyData" v-model="sellPrice" name="sellPrice"
            label="Prix de vente" class="  col-5" suffix="€" />
        </div>
        <div class="row justify-around q-my-sm">
          <q-input type="number" outlined :readonly="readOnlyData" v-model="quantity" name="quantity" label="Quantité"
            class="col-5" />
          <q-select outlined :readonly="readOnlyData" :options="quantityUnitList" v-model="quantityUnit"
            option-label="name" name="quantityUnit" label="Unité" class=" col-5" />
        </div>
        <div class="row justify-around q-my-sm">
          <q-select :options="supplierList" outlined :readonly="readOnlyData" v-model="supplier" option-label="name"
            name="supplier" label="Fournisseur" class="  col-5" />
          <q-select outlined :readonly="readOnlyData" :options="vatList" v-model="vatName" option-label="name"
            name="vatName" label="TVA" class="  col-5" />
        </div>
        <div class="row justify-around q-my-sm">
          <q-checkbox keep-color v-model="isDiscount" label="Promotion" color="cyan" class="col-5" />
          <q-input outlined :readonly="readOnlyData" type="number" v-model="discount" :disable="!isDiscount"
            name="discount" label="Promotion" suffix="%" class="col-5" />
        </div>

        <div class="row justify-around q-my-sm">
          <q-input :rules="inputRules" outlined :readonly="readOnlyData" v-model="description" type="textarea"
            name="description" label="Description" class="col-11" />
        </div>
        <div class="flex flex-center">
          <q-btn class="" outlined :readonly="readOnlyData" ripple :disable="!areDataUpdated" label="Mettre à jour"
            type="submit" color="primary" />
        </div>
      </div>

    </div>
  </q-form>
</template>

<script>
import _ from 'lodash';
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { useResource } from 'src/composables/resources'
import { useAuthStore } from 'src/stores/auth'
import { useQuasar } from 'quasar';
export default {
  props: {
    dialogVisible: Boolean
  },
  setup() {
    const auth = useAuthStore();
    const route = useRoute()
    const q = useQuasar()
    return {
      tab: ref("details"),
      route,
      auth,
      q

    };
  },
  data() {
    return {
      productsFamily: useResource(`productFamily/company/${this.auth.me.company}`),
      vats: useResource('vat'),
      quantityUnits: useResource('quantityUnit'),
      suppliers: useResource(`supplier/company/${this.auth.me.company}`),
      productFamilyList: [],
      vatList: [],
      quantityUnitList: [],
      supplierList: [],
      updatedData: {},
      nonObjectKeys: ["name", "buyPrice", "sellPrice", "quantity", "isDiscount", "discount", "description"],
      inputRules: [
        val => (val && val.length > 0) || "Une information est manquante"
      ],
      product: useResource('product'),
      readOnlyData: true,
      updateDataIcon: "lock",
      copyData: {},

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
  computed: {
    areDataUpdated() {
      if (this.copyData.name !== this.name ||
        this.copyData.productFamily.name !== this.productFamily ||
        this.copyData.buyPrice !== this.buyPrice ||
        this.copyData.sellPrice !== this.sellPrice ||
        this.copyData.quantity !== this.quantity ||
        this.copyData.quantityUnit !== this.quantityUnit ||
        this.copyData.supplier !== this.supplier ||
        this.copyData.vat.rate !== this.vatName.rate ||
        this.copyData.isDiscount !== this.isDiscount ||
        this.copyData.discount !== this.discount ||
        this.copyData.description !== this.description
      ) {
        return true;
      }
      return false;
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
      this.product.get(this.route.params.id).then((res) => {
        this.copyData = {
          ...res
        }
        this.name = res.name
        this.productFamily = res.productFamily.name
        this.buyPrice = res.buyPrice
        this.sellPrice = res.sellPrice
        this.quantity = res.quantity
        this.quantityUnit = res.quantityUnit
        this.supplier = res.supplier
        this.vatName = res.vat
        this.isDiscount = res.isDiscount
        this.discount = res.discount
        this.description = res.description

      })
    },
    updateCustomerIcon() {
      this.readOnlyData = !this.readOnlyData,
        this.readOnlyData ? this.updateDataIcon = "lock" : this.updateDataIcon = "lock_open"

    },


    onSubmit() {
      this.product.update(this.route.params.id, {
        name: this.name,
        productFamily: this.productFamily.id,
        buyPrice: parseFloat(this.buyPrice),
        sellPrice: parseFloat(this.sellPrice),
        quantity: parseFloat(this.quantity),
        quantityUnit: this.quantityUnit.id,
        supplier: this.supplier.id,
        vat: this.vatName.id,
        isDiscount: this.isDiscount,
        description: this.description,
        company: this.auth.me.company
      }).then(() => {
        this.q.notify({
          position: "top",
          type: "positive",
          message: `Le produit a bien été mis à jour`,
          timeout: 2000
        })
        setTimeout(() => {
          window.location.reload()
        }, 3000)

      })
    }
  },
  created() {
    this.reloadData()

  },
}


</script>

<style></style>
