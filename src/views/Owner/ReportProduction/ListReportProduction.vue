<template>
  <Home>
    <div class="row">
      <!-- Kartu Ringkasan -->
      <div class="col-md-3 mb-4">
        <StatisticsCard
          title="Total Produksi"
          :count="2500"
          description="Total produksi hari ini"
          icon="bx bx-package"
        />
      </div>
      <div class="col-md-3 mb-4">
        <StatisticsCard
          title="Produk Terlaris"
          :count="1200"
          description="Produk paling banyak diproduksi"
          icon="bx bx-trending-up"
        />
      </div>
      <div class="col-md-3 mb-4">
        <StatisticsCard
          title="Target Harian"
          :count="3000"
          description="Target produksi hari ini"
          icon="bx bx-target-lock"
        />
      </div>
      <div class="col-md-3 mb-4">
        <StatisticsCard
          title="Total Produksi Bulan Ini"
          :count="45000"
          description="Akumulasi produksi bulan ini"
          icon="bx bx-calendar"
        />
      </div>

      <!-- Grafik Produksi -->
      <div class="col-md-8 mb-4">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Grafik Produksi Harian</h4>
            <p class="card-title-desc">Grafik jumlah produksi rokok harian</p>
          </div>
          <div class="card-body">
            <div class="mt-3">
              <vue-apex-charts
                type="line"
                height="350"
                :options="chartOptions"
                :series="series"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Status Stok Produk -->
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Status Stok Produk</h4>
            <p class="card-title-desc">Informasi stok produk terkini</p>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Nama Produk</th>
                    <th>Stok</th>
                    <th>Satuan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in productStock" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.stock }}</td>
                    <td>{{ item.unit }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Laporan Produksi Harian -->
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Laporan Produksi Harian</h4>
            <p class="card-title-desc">Detail produksi rokok harian</p>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered table-nowrap">
                <thead class="table-light">
                  <tr>
                    <th>Tanggal</th>
                    <th>Nama Produk</th>
                    <th>Jumlah Produksi</th>
                    <th>Satuan</th>
                    <th>Operator</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="report in dailyReports" :key="report.id">
                    <td>{{ report.date }}</td>
                    <td>{{ report.productName }}</td>
                    <td>{{ report.amount }}</td>
                    <td>{{ report.unit }}</td>
                    <td>{{ report.operator }}</td>
                    <td>
                      <span :class="getStatusClass(report.status)">
                        {{ report.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Home>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Home from '../../../components/Home.vue';
import VueApexCharts from 'vue3-apexcharts';
import StatisticsCard from '../ReportMaterialUsed/StatisticsCard.vue';


// Chart configuration
const chartOptions = ref({
  chart: {
    type: 'line',
    toolbar: {
      show: true
    }
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    categories: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
  },
  yaxis: {
    min: 0
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'right',
  }
});

const series = ref([
  {
    name: 'Rokok A',
    data: [800, 750, 900, 850, 800, 750, 700]
  },
  {
    name: 'Rokok B',
    data: [600, 650, 700, 680, 650, 600, 580]
  },
  {
    name: 'Rokok C',
    data: [550, 600, 650, 630, 600, 550, 500]
  },
  {
    name: 'Rokok D',
    data: [450, 500, 550, 530, 500, 450, 400]
  }
]);

// Data dummy untuk stok produk
const productStock = ref([
  { id: 1, name: 'Rokok A', stock: 1500, unit: 'Bungkus' },
  { id: 2, name: 'Rokok B', stock: 2000, unit: 'Bungkus' },
  { id: 3, name: 'Rokok C', stock: 1800, unit: 'Bungkus' },
  { id: 4, name: 'Rokok D', stock: 1200, unit: 'Bungkus' },
]);

// Data dummy untuk laporan harian
const dailyReports = ref([
  {
    id: 1,
    date: '2024-03-20',
    productName: 'Rokok A',
    amount: 800,
    unit: 'Bungkus',
    operator: 'John Doe',
    status: 'Selesai'
  },
  {
    id: 2,
    date: '2024-03-20',
    productName: 'Rokok B',
    amount: 600,
    unit: 'Bungkus',
    operator: 'Jane Smith',
    status: 'Proses'
  },
]);

// Status class helper
const getStatusClass = (status: string) => {
  return {
    'badge bg-success': status === 'Selesai',
    'badge bg-warning': status === 'Proses',
  };
};
</script>
