<template>
  <div>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import {Chart} from 'chart.js';
import {LocalStorage} from "quasar";

export default {
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      //get token from local storage
      const token = LocalStorage.getItem('token') || null
      console.log(token);

      const headers = {
        'Authorization': `Bearer ${token}`
      }

      fetch('http://cyber-dodo.fr:8080/api/v1/invoice/all', {headers} )
        .then(response => response.json())
        .then(invoiceData => {
          console.log(invoiceData);

// Association entre le mois/année de création et la quantité totale de produits
          const monthlyTotals = {};

          invoiceData.forEach((invoice) => {
            const createdAt = new Date(invoice.createdAt);
            const month = createdAt.getMonth() + 1; // Les mois sont indexés à partir de zéro, donc on ajoute 1 pour obtenir le mois réel
            const year = createdAt.getFullYear();

            const monthYear = `${month}/${year}`;

            if (!monthlyTotals[monthYear]) {
              monthlyTotals[monthYear] = 0;
            }

            invoice.invoiceProducts.forEach((product) => {
              monthlyTotals[monthYear] += product.quantity;
            });
          });


          const labels = Object.keys(monthlyTotals);
          const data = Object.values(monthlyTotals);

          console.log(labels);
          console.log(data);

        //   const ctx = this.$refs.chart.getContext('2d');
        //   new Chart(ctx, {
        //     type: 'bar',
        //     data : monthlyTotals,
        //     options: {
        //       scales: {
        //         y: {
        //           beginAtZero: true
        //         }
        //       }
        //     }
        //   });
        // })
        // .catch(error => {
        //   console.error("Erreur lors de la récupération des données de la facture :", error);
         });

     },
  },
};

</script>

<style>
canvas {
  max-height: 400px;
}
</style>
