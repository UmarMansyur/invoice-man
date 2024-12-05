<template>
  <Home>
    <div class="row">
      <!-- Kartu Ringkasan -->
      <div class="col-md-3 mb-4">
        <StatisticsCard
          title="Total Bahan Baku"
          :count="150"
          description="Jumlah keseluruhan bahan baku"
          icon="bx bx-box"
        />
      </div>
      <div class="col-md-3 mb-4">
        <StatisticsCard
          title="Bahan Baku Menipis"
          :count="8"
          description="Bahan baku yang perlu diperhatikan"
          icon="bx bx-error-circle"
        />
      </div>
      <div class="col-md-3 mb-4">
        <StatisticsCard
          title="Penggunaan Hari Ini"
          :count="25"
          description="Total penggunaan bahan hari ini"
          icon="bx bx-trending-up"
        />
      </div>
      <div class="col-md-3 mb-4">
        <StatisticsCard
          title="Total Penggunaan Bulan Ini"
          :count="487"
          description="Akumulasi penggunaan bulan ini"
          icon="bx bx-calendar"
        />
      </div>

      <!-- Grafik Penggunaan -->
      <div class="col-md-8 mb-4">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Grafik Penggunaan Bahan Baku</h4>
            <p class="card-title-desc">Grafik penggunaan bahan baku harian. </p>
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

      <!-- Bahan Baku Menipis -->
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Bahan Baku Menipis</h4>
            <p class="card-title-desc">Bahan baku yang perlu diperhatikan</p>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Nama Bahan</th>
                    <th>Stok</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in lowStockItems" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.stock }}</td>
                    <td>
                      <span :class="getStatusClass(item.status)">
                        {{ item.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- buatkan keterangan disini misal kritis kurang dari sama dengan 10 -->
             <div class="row">
              <div class="col-md-12">
                <p class="text-muted">Keterangan: Bahan baku yang stoknya kurang dari sama dengan 10 dikategorikan sebagai kritis.</p>
              </div>
             </div>
          </div>
        </div>
      </div>

      <!-- Laporan Harian -->
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Laporan Penggunaan Harian</h4>
            <p class="card-title-desc">Laporan penggunaan bahan baku harian.</p>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-borderedtable-nowrap">
                <thead class="table-light">
                  <tr>
                    <th>Tanggal</th>
                    <th>Nama Bahan</th>
                    <th>Jumlah Penggunaan</th>
                    <th>Operator</th>
                    <th>Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="report in dailyReports" :key="report.id">
                    <td>{{ report.date }}</td>
                    <td>{{ report.materialName }}</td>
                    <td>{{ report.amount }}</td>
                    <td>{{ report.operator }}</td>
                    <td>{{ report.notes }}</td>
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
import { ref} from 'vue';
import Home from '../../../components/Home.vue';
import VueApexCharts from 'vue3-apexcharts';
import StatisticsCard from './StatisticsCard.vue';

// Add ApexCharts configuration
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
  }
});

const series = ref([
  {
    name: 'Penggunaan Bahan Baku',
    data: [65, 59, 80, 81, 56, 55, 40]
  }
]);

// Data dummy untuk bahan baku menipis
const lowStockItems = ref([
  { id: 1, name: 'Tepung Terigu', stock: 10, status: 'Kritis' },
  { id: 2, name: 'Gula Pasir', stock: 15, status: 'Menipis' },
  { id: 3, name: 'Mentega', stock: 8, status: 'Kritis' },
  { id: 4, name: 'Telur', stock: 20, status: 'Menipis' },
]);

// Data dummy untuk laporan harian
const dailyReports = ref([
  {
    id: 1,
    date: '2024-03-20',
    materialName: 'Tepung Terigu',
    amount: 5,
    operator: 'John Doe',
    notes: 'Produksi Roti',
  },
  {
    id: 2,
    date: '2024-03-20',
    materialName: 'Gula Pasir',
    amount: 3,
    operator: 'Jane Smith',
    notes: 'Produksi Kue',
  },
]);

// Fungsi untuk menentukan class status
const getStatusClass = (status: string) => {
  return {
    'badge bg-danger': status === 'Kritis',
    'badge bg-warning': status === 'Menipis',
  };
};
</script>
