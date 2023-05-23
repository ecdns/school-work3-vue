<template>
  <div class="text-h6">Facture ({{ invoices.length }})</div>
  <div v-if="invoices.length !== 0">
    <div class="q-pa-md">
      <q-table title="" :rows="invoices" :columns="columns" row-key="name" />
    </div>
  </div>

  <div v-else>
    <div class=" flex flex-center">
      <q-icon size="10rem" name="block"></q-icon>
    </div>
    <div class="text-h4 q-my-md" style="text-align: center">Aucune facture n'est associée à ce client</div>
  </div>
</template>

<script>
export default {
  data() {
    return {

      columns: [
        {
          name: 'reference',
          required: true,
          label: 'Référence',
          align: 'left',
          field: 'reference',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'creation_date', align: 'center', label: "Date d'émission", field: 'creation_date', sortable: true },
        { name: 'status', label: 'Statut', field: 'status' },
        { name: 'payment_date', align: 'center', label: 'Payé le', field: 'payment_date', sortable: true },

      ],

      invoices: [
        {
          reference: 'FAC79',
          creation_date: "20-05-2023",
          status: "Payé",
          payment_date: "25-05-2023",

        },
        {
          reference: 'FAC79',
          creation_date: "20-05-2023",
          status: "Payé",
          payment_date: "25-05-2023",

        },
        {
          reference: 'FAC79',
          creation_date: "20-05-2023",
          status: "Payé",
          payment_date: "25-05-2023",

        },

      ]
    }
  }
}
</script>

<style></style>
