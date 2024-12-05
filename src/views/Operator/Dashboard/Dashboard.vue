<script setup lang="ts">
import Home from '../../../components/Home.vue';
import Card from '../../../components/Card.vue';
import Card2 from './Card2.vue';
import PaymentTypeChart from './PaymentTypeChart.vue';
import SalesChart from './SalesChart.vue';

const cards = [
  {
    title: "Total Pengguna",
    icon: "bx bx-user",
    value: 12
  },
  {
    title: "Total Pabrik",
    icon: "bx bx-building",
    value: 12
  },
  {
    title: "Total Penjualan",
    icon: "bx bx-money",
    value: 12
  },
  {
    title: "Total Produksi",
    icon: "bx bx-box",
    value: 12
  }
];

const card2 = [
  {
    title: "Jumlah Hak Akses",
    count: 12,
    description: "Total Hak Akses",
    icon: "bx bx-lock"
  },
  {
    title: "Pendapatan Hari Ini",
    count: 12,
    description: "Total Pendapatan Hari Ini",
    icon: "bx bx-money"
  },
  {
    title: "Total Pemesanan Hari Ini",
    count: 12,
    description: "Total Pemesanan Hari Ini",
    icon: "bx bx-rocket"
  },
  {
    title: "Total Pengiriman Hari Ini",
    count: 12,
    description: "Total Pengiriman Hari Ini",
    icon: "bx bxs-truck"
  }
];
</script>

<template>
  <Home>
    <div class="row">
      <div class="col-xl-3" v-for="item in cards">
        <Card :title="item.title" :icon="item.icon" :value="item.value" />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <SalesChart />
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Riwayat Pemesanan Terbaru</h5>
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Kode Transaksi</th>
                      <th>Tanggal</th>
                      <th class="text-center">Status Pembayaran</th>
                      <th class="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in 8">
                      <td>INV-{{ item }}</td>
                      <td>
                        29/11/2024
                      </td>
                      <td class="text-center">
                        <span class="badge bg-primary">Cash</span>
                      </td>
                      <td class="text-end">
                        Rp 100.000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-xl-6" v-for="item in card2">
            <Card2 :title="item.title" :count="item.count" :description="item.description" :icon="item.icon" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <PaymentTypeChart />
          </div>
        </div>
      </div>
    </div>

  </Home>
</template>