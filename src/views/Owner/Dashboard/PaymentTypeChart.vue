<template>
  <div class="card">
    <div class="card-body">
      <VueApexCharts type="donut" :options="chartOptions" :series="series"></VueApexCharts>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';


const series = ref<number[]>([44, 55, 13, 43]); // Example data for cash, credit, due, etc.
const chartOptions = ref({
  chart: {
    width: 380,
    type: 'donut',
  },
  title: {
    text: 'Grafik Metode Pembayaran di Tahun 2024',
    align: 'left',
    margin: 10,
    style: {
      fontSize: '16px',
      fontWeight: 'bold'
    }
  },
  labels: ['Cash', 'Credit', 'Due', 'Other'],
  colors: ['#1f58c7', '#3a6fd1', '#5586db', '#709de5'],
  legend: {
    position: 'bottom',
    // berikan persentasenya di legend
    formatter: function (seriesName: string, opts: any) {
      return seriesName + ': ' + opts.w.globals.series[opts.seriesIndex] + '%';
    }
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        // height: 350,
        // width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
