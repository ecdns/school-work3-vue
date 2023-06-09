<template>
  <Apexchart height="300" type="bar" :options="chartOptions" :series="chartSeries"></Apexchart>
</template>

<script>
import { defineComponent } from 'vue';
import { getCssVar } from 'quasar';
import VueApexCharts from "vue3-apexcharts";
import { useResource } from "src/composables/resources";

export default {
  components: {
    Apexchart: VueApexCharts,
  },
  async created() {
    this.userRole = [];
    this.chartOptions = {};
    this.chartSeries = [];

    const userRole = useResource('role');

    try {
      const response = await userRole.list();
      const promises = [];

      response.data.forEach((item) => {
        this.userRole.push(item.name);
        const userResource = useResource('user/role/' + item.id);
        const promise = userResource.listWithoutAll().then((response) => {
          let totalUser = 0;
          response.data.forEach((item) => {
            totalUser ++;
          });
          this.chartSeries.push(totalUser);
          return totalUser;
        });

      });
      this.updateChartOptions();
    } catch (error) {
      // Gérer les erreurs ici
    }

    console.log(this.userRole);
    console.log(this.chartSeries);
  },
  methods: {
    updateChartOptions() {
      this.chartOptions = {
        title: {
          text: 'Utilisateurs par Rôle',
          align: 'center'
        },
        chart: {
          id: 'apex-column'
        },
        xaxis: {
          categories: this.userRole
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        series: this.chartSeries
      };
    },
  }
}
</script>
