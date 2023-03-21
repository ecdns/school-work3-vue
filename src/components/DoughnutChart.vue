<template>
    <Doughnut :data="chartData" :options="config" :style="myStyles" />
</template>

<script>
import { Doughnut } from 'vue-chartjs';
import 'chart.js/auto';

const options = {
    responsive: false,
    maintainAspectRatio: false,
    animation: {
        animateRotate: false
    }
}

export default {
    components: { Doughnut },
    computed: {
        myStyles() {
            return {
                width: `200px`,
                height: `200px`,
            }
        }
    },
    data() {
        return {
            options,
            chartData: {
                labels: ['skill1'],
                datasets: [
                    {
                        backgroundColor: ["#F6795E"],
                        radius: "20%",
                        height: "50px",
                        data: [1, 2]
                    }
                ]
            }
        }
    },
    computed: {
        currentDataSet() {
            return this.chartData.datasets[0].data
        }
    },
}

</script>