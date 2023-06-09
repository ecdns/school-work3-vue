<template>
  <Apexchart height="300" type="donut" :options="chartOptions" :series="series"></Apexchart>
</template>

<script>
import { defineComponent } from 'vue'
import { getCssVar } from 'quasar'
import {useAuthStore} from "stores/auth";
import VueApexCharts from "vue3-apexcharts";
import {useResource} from "src/composables/resources";

export default {
  components: {
    Apexchart: VueApexCharts,
  },
  setup() {
    const auth = useAuthStore();
    const projetStatusResource = useResource('projectStatus');

    return {
      auth,
      projetStatusResource
    }
  },
  data() {
    return {
      chartOptions: {},
      projetStatus : [],
      series: []
    };
  },
  async created()  {
    try {
      const response = await this.projetStatusResource.list();

      for (const item of response.data) {
        this.projetStatus.push(item.name);

        const project = useResource('project/projectStatus/' + item.id);
        const projectResponse = await project.listWithoutAll();

        let totalProjects = projectResponse.data.length;
        this.series.push(totalProjects);
      }

      this.updateChartOptions();
    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    updateChartOptions() {
      this.chartOptions = {
        title: {
          text: 'Avencement des projets',
          align: 'center'
        },
        labels: this.projetStatus,
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
