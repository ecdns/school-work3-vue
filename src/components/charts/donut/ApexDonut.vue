<template>
  <div id="chart">
    <Apexchart height="300" type="donut" :options="chartOptions" :series="series"></Apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import {useAuthStore} from "stores/auth";
import {useResource} from "src/composables/resources";

export default {
  components: {
    Apexchart: VueApexCharts,
  },
  setup() {
    const auth = useAuthStore();

    return {
      auth,
    }
  },
  data() {
    return {
      productFamilyList: [],
      chartOptions: {},
      series: []
    };
  },
  async created() {
    const productFamilyResource = useResource('productFamily/company/' + this.auth.me.company);

    try {
      const response = await productFamilyResource.listWithoutAll();
      const promises = [];

      response.data.forEach((item) => {
        this.productFamilyList.push(item.name);
        const productFamilyResource = useResource('product/productFamily/' + item.id);
        const promise = productFamilyResource.listWithoutAll().then((response) => {
          let totalProducts = 0;
          response.data.forEach((item) => {
            totalProducts += item.quantity;
          });
          return totalProducts;
        });
        promises.push(promise);
      });

      const seriesData = await Promise.all(promises);
      this.series = seriesData;
      this.updateChartOptions();
    } catch (error) {
      // Gérer les erreurs ici
    }

    console.log(this.productFamilyList)
    console.log(this.series)
  },

  methods: {
    updateChartOptions() {
      this.chartOptions = {
        title: {
          text: 'Stock par Famille de Produit',
          align: 'center'
        },
        labels: this.productFamilyList,
        chart: {
          type: 'donut',
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: '100%',
              height: '100%'
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };
    },
  }
}
</script>
