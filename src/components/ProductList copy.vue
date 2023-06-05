<template>
  <q-page>
    <div v-if="products.length !== 0">
      <div class="q-pa-md">
        <q-table title="" :rows="products" :columns="columns" row-key="reference" @row-click="handleRowClick" />
      </div>
    </div>

    <div v-else>
      <div class=" flex flex-center">
        <q-icon size="10rem" name="block"></q-icon>
      </div>
      <div class="text-h4 q-my-md" style="text-align: center">Aucun produit/service disponible</div>
    </div>
  </q-page>
</template>

<script>
import { useRouter } from 'vue-router';
const router = useRouter();

export default {
  props: {
    products: Array
  },
  data() {
    return {

      columns: [
        {
          name: 'name',
          required: true,
          label: 'Produit/Service',
          align: 'left',
          field: 'name',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'reference', align: 'center', label: "Référence", field: 'reference', sortable: true },
        { name: 'supplier', label: 'Fournisseur', field: 'supplier' },
        { name: 'quantity', align: 'center', label: 'Quantité', field: 'quantity', sortable: true },
        { name: 'quantityUnit', align: 'center', label: 'Unité', field: 'quantityUnit', sortable: true },

      ],


    }
  },

  methods: {
    handleRowClick(_, row) {
      console.log('clicked')
      router.push(`/products/${row.id}`)
    },

  }
}
</script>

<style></style>
