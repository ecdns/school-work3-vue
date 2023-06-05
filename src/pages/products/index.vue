<template>
  <q-page>
      <div class="q-pt-lg q-px-lg row justify-between">
    <div class="text-h6">Produit/service ({{ products.length }})</div>

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
  <ProductList :products="products" />
  </q-page>

</template>


<script>
import ProductList from '../../components/ProductList.vue'
import ProductCreateForm from 'src/components/ProductCreateForm.vue';
export default {
  components: { ProductList, ProductCreateForm, },

  data() {
    return {
      dialogVisible: false,
      products: [
        {
          id: 1,
          name: 'Béton armé',
          reference: "P874FSDF",
          supplier: "BETON FRANCE",
          quantity: "541",
          quantityUnit: "unité"

        },
        {
          id: 2,
          name: 'Béton armé',
          reference: "P854kSDF",
          supplier: "BETON FRANCE",
          quantity: "541",
          quantityUnit: "unité"

        },
        {
          id: 3,
          name: 'Béton armé',
          reference: "P854eSDF",
          supplier: "BETON FRANCE",
          quantity: "541",
          quantityUnit: "unité"

        },
      ],
    }

  },

  methods: {
    onSubmit() {
      console.log("button clicked")
      this.products.unshift(
        {
          id: 4,
          name: this.$refs.ProductCreateForm.name,
          productFamily: this.$refs.ProductCreateForm.productFamily,
          buyPrice: this.$refs.ProductCreateForm.buyPrice,
          sellPrice: this.$refs.ProductCreateForm.sellPrice,
          quantity: this.$refs.ProductCreateForm.quantity,
          quantityUnit: this.$refs.ProductCreateForm.quantityUnit,
          supplier: this.$refs.ProductCreateForm.supplier,
          vat: this.$refs.ProductCreateForm.vat,
          discCheckbox: this.$refs.ProductCreateForm.discCheckbox,
          discount: this.$refs.ProductCreateForm.discount,
          description: this.$refs.ProductCreateForm.description,

        }
      )
    }
  }
}
</script>

<style></style>
