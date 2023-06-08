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

export default {
  props: {
    products: Array
  },
  setup() {
    const router = useRouter();
    return {
      router
    }
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
        { name: 'supplier', align: 'center', label: 'Fournisseur', field: row => row.supplier.name },
        { name: 'quantity', align: 'center', label: 'Quantité', field: 'quantity', sortable: true },
        { name: 'quantityUnit', align: 'center', label: 'Unité', field: row => row.quantityUnit.name, sortable: true },

      ],
    }
  },

  methods: {
    handleRowClick(_, row) {
      this.router.push({
        path: `/products/${row.id}`,
      });
    },

  },

}
</script>

<style></style>
