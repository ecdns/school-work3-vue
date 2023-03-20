<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <BarChart />
      <DoughnutChart />
    </q-page-container>
  </q-layout>
</template>

<script>
import BarChart from 'src/components/BarChart.vue';
import DoughnutChart from 'src/components/DoughnutChart.vue';

export default {
  components: {
    BarChart,
    DoughnutChart
  }
}
</script>