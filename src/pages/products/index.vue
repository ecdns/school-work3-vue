<template>
  <q-page>
    <div class="q-pt-lg q-px-lg row justify-between">
      <div class="text-h6">Produit/service ({{ items.length }})</div>

      <q-btn class="col-2 " push outline rounded color="primary" icon="add" label="NOUVEAU PRODUIT"
        @click="dialogVisible = true">
      </q-btn>
    </div>
    <q-dialog v-model="dialogVisible" position="absolute" transition-show="slide-down" transition-hide="slide-up"
      class="flex flex-center column">
      <q-card style="min-width: 60vw">
        <q-card-section>
          <q-form action="" method="post" @submit.prevent.stop="onSubmit">
            <div class="row flex justify-end"> <q-icon v-close-popup name="close" size="1.5rem" style="cursor:pointer" />
            </div>

            <p class="text-h6">Nouveau produit </p>
            <q-separator color="primary" class="q-my-md" />
            <ProductCreateForm ref="ProductCreateForm" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <ProductList :products="items" />
  </q-page>
</template>


<script>
import ProductList from '../../components/ProductList.vue'
import ProductCreateForm from 'src/components/ProductCreateForm.vue';
import { useResource } from '../../composables/resources.js'
import { useAuthStore } from 'src/stores/auth';
import { useQuasar } from 'quasar';
export default {
  components: { ProductList, ProductCreateForm, },

  data() {
    return {
      q: useQuasar(),
      auth: useAuthStore(),
      dialogVisible: false,
      products: useResource('product'),
      postData: [],
      items: [],

    }

  },

  methods: {

    reloadData() {
      this.products.list()
        .then((res) => {
          this.items = res.data
        })
    },
    getPostData() {
      this.postData = {
        ...{
          name: this.$refs.ProductCreateForm.name,
          productFamily: this.$refs.ProductCreateForm.productFamily.id,
          buyPrice: parseFloat(this.$refs.ProductCreateForm.buyPrice),
          sellPrice: parseFloat(this.$refs.ProductCreateForm.sellPrice),
          quantity: parseFloat(this.$refs.ProductCreateForm.quantity),
          quantityUnit: this.$refs.ProductCreateForm.quantityUnit.id,
          supplier: this.$refs.ProductCreateForm.supplier.id,
          vat: this.$refs.ProductCreateForm.vatName.id,
          isDiscount: this.$refs.ProductCreateForm.isDiscount,
          description: this.$refs.ProductCreateForm.description,
          company: this.auth.me.company
        }
      }

      if (this.$refs.ProductCreateForm.isDiscount === false) {
        this.postData.discount = 0
      } else {
        this.postData.discount = parseFloat(this.$refs.ProductCreateForm.discount)
      }
      return JSON.stringify(this.postData)
    },
    onSubmit() {

      this.products.create(this.getPostData()).then(() => {
        this.q.notify({
          position: "top",
          type: "positive",
          message: `Le produit a bien été créé`,
          timeout: 3000
        })
        setTimeout(() => {
          window.location.reload()
        }, 3000)
          ;
      }).catch((err) => {
        this.q.notify({
          position: "top",
          type: "negative",
          message: `Erreur lors de la création du produit, verifiez bien tout les champs`,
        });
      })
    },

  },
  created() {
    this.reloadData()
  }
}
</script>

<style></style>
