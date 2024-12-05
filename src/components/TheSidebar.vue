<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div data-simplebar class="sidebar-menu-scroll">
    <div id="sidebar-menu">
      <ul class="metismenu list-unstyled" id="side-menu">
        <!-- Admin -->
        <div v-if="$route.path.startsWith('/admin')">
          <li class="menu-title" data-key="t-menu">Main Menu</li>
          <li>
          <RouterLink to="/admin">
            <i class="bx bx-home icon nav-icon"></i>
            <span class="menu-item" data-key="t-filemanager">Beranda</span>
          </RouterLink>
        </li>
        <li class="menu-title" data-key="t-menu">Data Master</li>
        <li>
          <RouterLink to="/admin/users">
            <i class="bx bx-user icon nav-icon"></i>
            <span class="menu-item" data-key="t-filemanager">Pengguna</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/factories">
            <i class="bx bx-building icon nav-icon"></i>
            <span class="menu-item" data-key="t-filemanager">Pabrik</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/units">
            <i class="bx bx-ruler icon nav-icon"></i>
            <span class="menu-item" data-key="t-filemanager">Satuan</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/materials">
            <i class="bx bxl-dropbox icon nav-icon"></i>
            <span class="menu-item" data-key="t-filemanager">Bahan Baku</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/material-units">
            <i class='bx bxs-analyse icon nav-icon'></i>
            <span class="menu-item" data-key="t-filemanager">Satuan Bahan Baku</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/roles">
            <i class="bx bx-lock icon nav-icon"></i>
            <span class="menu-item" data-key="t-filemanager">Hak Akses</span>
          </RouterLink>
        </li>
        <li class="menu-title" data-key="t-menu">Transaksi</li>
        <li>
          <RouterLink to="/admin/invoices">
            <i class="bx bx-chart icon nav-icon"></i>
            <span class="menu-item" data-key="t-filemanager">Daftar Invoice</span>
          </RouterLink>
        </li>
        <li class="menu-title" data-key="t-menu">Setting</li>
        <li>
          <a href="javascript: void(0);" class="has-arrow">
            <i class="bx bx-cog icon nav-icon"></i>
            <span class="menu-item" data-key="t-dashboard">Pengaturan</span>
          </a>
          <ul class="sub-menu" aria-expanded="false">
            <li>
              <RouterLink to="/admin/settings/payment-method" data-key="t-pengaturan-mobil">
                Metode Pembayaran
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/admin/settings/ppn" data-key="t-pengaturan-aula">
                PPN
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/admin/settings/account" data-key="t-pengaturan-sopir">
                Pengaturan Akun
              </RouterLink>
            </li>
          </ul>
        </li>
        </div>
        <!-- Operator -->
        <div v-if="!$route.path.startsWith('/owner') && !$route.path.startsWith('/admin')">
          <li>
            <RouterLink to="/">
              <i class="bx bx-home icon nav-icon"></i>
            <span class="menu-item" data-key="t-filemanager">Beranda</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/produksi">
            <i class="bx bx-box icon nav-icon"></i>
            <span class="menu-item" data-key="t-filemanager">Produksi</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/manajemen-bahan-baku">
            <i class="bx bxl-dropbox icon nav-icon"></i>
            <span class="menu-item" data-key="t-filemanager">Bahan Baku</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/transaksi">
            <i class="bx bx-cart icon nav-icon"></i>
            <span class="menu-item" data-key="t-filemanager">Transaksi</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/report-penjualan">
            <i class="bx bx-bar-chart-alt icon nav-icon"></i>
            <span class="menu-item" data-key="t-filemanager">Report Penjualan</span>
          </RouterLink>
        </li>
      </div>
        <!-- Owner -->
         <div v-if="$route.path.startsWith('/owner')">
           <li>
             <RouterLink to="/owner">
               <i class="bx bx-home icon nav-icon"></i>
               <span class="menu-item" data-key="t-filemanager">Dashboard</span>
             </RouterLink>
           </li>
           <li>
             <RouterLink to="/owner/product">
               <i class="bx bx-box icon nav-icon"></i>
               <span class="menu-item" data-key="t-filemanager">Data Produk</span>
             </RouterLink>
           </li>
           <li>
             <RouterLink to="/owner/material">
               <i class="bx bxl-dropbox icon nav-icon"></i>
               <span class="menu-item" data-key="t-filemanager">Stok Bahan Baku</span>
             </RouterLink>
           </li>
           <li>
             <RouterLink to="/owner/operator">
               <i class="bx bx-user icon nav-icon"></i>
               <span class="menu-item" data-key="t-filemanager">Manajemen Operator</span>
             </RouterLink>
           </li>
           <li>
             <RouterLink to="/owner/report-material-used">
               <i class="bx bx-line-chart icon nav-icon"></i>
               <span class="menu-item" data-key="t-filemanager">Laporan Penggunaan Bahan Baku</span>
             </RouterLink>
           </li>
           <li>
             <RouterLink to="/owner/report-production">
               <i class="bx bx-bar-chart-alt icon nav-icon"></i>
               <span class="menu-item" data-key="t-filemanager">Laporan Produksi</span>
             </RouterLink>
           </li>
           <li>
             <RouterLink to="/owner/invoice-report">
               <i class="bx bx-cart icon nav-icon"></i>
               <span class="menu-item" data-key="t-filemanager">Laporan Invoice</span>
             </RouterLink>
           </li>
         </div>
      </ul>
      <!-- buatkan saya sebuah tombol untuk switcher antara owner dan admin -->
      
    </div>

  </div>
</template>

<style scoped>
.sidebar-menu-scroll {
  padding-bottom: 120px; /* Add space for the fixed switchers */
}
</style>
