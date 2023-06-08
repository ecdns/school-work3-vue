<template>
  <div class="row flex justify-end">
    <q-icon v-close-popup name="close" size="1.5rem" style="cursor:pointer" />
  </div>

  <div class="row flex flex-center">
    <div class="col-10">
      <p class="text-h6 col-10">Modifier une facture</p>

      <q-separator color="primary" class="q-my-md" />

      <div class="row justify-around q-my-sm">
        <q-input outlined v-model="name" :rules="inputRules" name="name" label="Nom" class="col-5" />
      </div>

      <div class="row justify-around q-my-sm">
        <q-input outlined v-model="description" :rules="inputRules" name="description" label="Description" class="col-5" />
      </div>

      <div v-for="(product, index) in products" :key="index" class="row justify-between q-my-sm">
        <q-select outlined v-model="product.selectedLabel" :options="productOptions" :label="'Produit ' + (index + 1)" class="col-4" />
        <q-input outlined v-model="product.quantity" :rules="inputRules" :name="'quantity-' + index" :label="'Quantité ' + (index + 1)" class="col-4" />
        <q-icon name="close" size="1.5rem" style="cursor:pointer" @click="removeProduct(index)" />
      </div>

      <div class="row justify-around q-my-sm">
        <q-btn @click="addProduct" outlined ripple label="Ajouter produit" type="button" color="secondary" />
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
import {useAuthStore} from "stores/auth";
export default {
  props: {
    invoice: {
      type: Object,
    },
  },
  setup() {
    const auth = useAuthStore();
    return {
      auth
    }
  },
  created() {
    this.reloadData()
  },

  data() {
    return {
      name: '',
      description: '',
      invoiceData: {},
      quantity: 0,
      products: [],
      product: useResource('product/company/' + this.auth.me.company),
      productOptions: [],
      invoiceResource: useResource('invoice'),
      inputRules: [
        val => (val && val.length > 0) || "Une information est manquante"
      ],

    }
  },

  methods: {
    reloadData() {
      this.product.listWithoutAll().then((res) => {
        res.data.forEach(element => {
          const product = {
            label: element.name,
            value: element.id
          }
          this.productOptions.push(product);
        });
      }).catch((err) => {
        console.log(err)
      })


        this.invoiceData = this.invoice;
        this.invoiceData.name = this.invoice.name;
        this.invoiceData.description = this.invoice.description;
        this.invoiceData.invoiceProducts = this.invoice.invoiceProducts;
        console.log(this.invoiceData
        )
        this.invoiceData.invoiceProducts.forEach(element => {
          const product = {
            selectedValue: element.product.id,
            selectedLabel: element.product.name,
            quantity: element.quantity
          }
          this.products.push(product);
        });

        this.name = this.invoiceData.name;
        this.description = this.invoiceData.description;




    },
    addProduct() {
      this.products.push({ productId: '', quantity: 0 });
    },
    removeProduct(index) {
      this.products.splice(index, 1);
    }
  },

}
</script>

<style></style>
