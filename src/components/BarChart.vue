<template>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" :style="myStyles" />
</template>
  
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    components: { Bar },
    computed: {
        myStyles() {
            return {
                height: `200px`,
            }
        }
    },
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March'],
                datasets: [{ data: [40, 20, 12] }]
            },
            chartOptions: {
                responsive: false
            },
        }
    }
}
</script>