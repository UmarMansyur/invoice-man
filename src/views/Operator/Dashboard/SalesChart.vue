<template>
  <div class="card">
    <div class="card-body">
      <VueApexCharts type="bar" :options="chartOptions" :series="series"></VueApexCharts>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts';


const series = [{
  name: 'Sales',
  data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 130, 140, 150] // Contoh data penjualan
}];

const chartOptions = {
  chart: {
    height: 350,
    type: 'bar',
  },
  title: {
    text: 'Grafik Penjualan Tahun 2024',
    align: 'left'
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      horizontal: false,
      columnWidth: '90%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  fill: {
    opacity: 1,
    colors: ['#1f58c7'] // Warna batang
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return "$ " + val + " thousands"
      }
    }
  }
};
</script>

<style scoped>
/* Coba tambahkan lebih banyak spesifisitas jika diperlukan */
.apexcharts-bar-series .apexcharts-bar-area .apexcharts-bar {
  stroke-linecap: round; /* Pastikan ini diterapkan ke elemen yang tepat */
}
</style>