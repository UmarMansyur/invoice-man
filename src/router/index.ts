import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Beranda Operator',
    meta: {
      title: "Beranda"
    },
    component: () => import('../views/Operator/Dashboard/Dashboard.vue')
  },
  {
    path: '/produksi',
    name: 'Produksi',
    meta: {
      title: "Produksi"
    },
    component: () => import('../views/Operator/Produksi/ListProduksi.vue')
  },
  {
    path: '/manajemen-bahan-baku',
    name: 'Manajemen Bahan Baku',
    meta: {
      title: "Bahan Baku"
    },
    component: () => import('../views/Operator/Material/ListMaterial.vue')
  },
  {
    path: '/faktur-pengiriman',
    name: 'Faktur Pengiriman',
    meta: {
      title: "Faktur Pengiriman"
    },
    component: () => import('../views/Operator/Faktur/Invoice.vue')
  },
  {
    path: '/transaksi',
    name: 'Transaksi',
    meta: {
      title: "Transaksi"
    },
    component: () => import('../views/Operator/Transaksi/Transaction.vue')
  },
  {
    path: '/report-penjualan',
    name: 'Report Penjualan',
    meta: {
      title: "Report Penjualan"
    },
    component: () => import('../views/Operator/Faktur/Invoice.vue')
  },

  // Administrator
  {
    path: '/admin',
    name: 'Home',
    meta: {
      title: "Beranda"
    },
    component: () => import('../views/Administrator/Dashboard/Dashboard.vue')
  },
  {
    path: '/admin/users',
    name: 'Users',
    meta: {
      title: "Pengguna"
    },
    component: () => import('../views/Administrator/Users/ListUser.vue')
  },
  {
    path: '/admin/users/add',
    name: 'AddUser',
    meta: {
      title: "Tambah Pengguna"
    },
    component: () => import('../views/Administrator/Users/AddUser.vue')
  },
  {
    path: '/admin/factories',
    name: 'Factories',
    meta: {
      title: "Pabrik"
    },
    component: () => import('../views/Administrator/Factory/ListFactory.vue')
  },
  {
    path: '/admin/factories/add',
    name: 'AddFactory',
    meta: {
      title: "Tambah Pabrik"
    },
    component: () => import('../views/Administrator/Factory/AddFactory.vue')
  },
  {
    path: '/admin/units',
    name: 'Units',
    meta: {
      title: "Unit"
    },
    component: () => import('../views/Administrator/Unit/ListUnit.vue')
  },
  {
    path: '/admin/materials',
    name: 'Materials',
    meta: {
      title: "Bahan Baku"
    },
    component: () => import('../views/Administrator/Material/ListMaterial.vue')
  },
  {
    path: '/admin/roles',
    name: 'Roles',
    meta: {
      title: "Hak Akses"
    },
    component: () => import('../views/Administrator/Role/ListRole.vue')
  },
  {
    path: '/admin/invoices',
    name: 'Invoices',
    meta: {
      title: "Invoice"
    },
    component: () => import('../views/Administrator/Invoice/ListInvoice.vue')
  },
  {
    path: '/admin/settings/payment-method',
    name: 'PaymentMethod',
    meta: {
      title: "Metode Pembayaran"
    },
    component: () => import('../views/Administrator/Settings/PaymentMethod/PaymentMethod.vue')
  },
  {
    path: '/admin/settings/ppn',
    name: 'PPN',
    meta: {
      title: "PPN"
    },
    component: () => import('../views/Administrator/Settings/PPN/ListPPN.vue')
  },
  {
    path: '/admin/settings/account',
    name: 'Account',
    meta: {
      title: "Pengaturan Akun"
    },
    component: () => import('../views/Administrator/Settings/Account/PengaturanAkun.vue')
  },
  {
    path: '/admin/material-units',
    name: 'MaterialUnits',
    meta: {
      title: "Satuan Bahan Baku"
    },
    component: () => import('../views/Administrator/MaterialUnit/MaterialUnit.vue')
  },
  // Owner
  {
    path: '/owner',
    name: 'Owner',
    meta: {
      title: "Beranda"
    },
    component: () => import('../views/Owner/Dashboard/Dashboard.vue')
  },
  {
    path: '/owner/product',
    name: 'Product',
    meta: {
      title: "Data Produk"
    },
    component: () => import('../views/Owner/Produk/ListProduct.vue')
  },
  {
    path: '/owner/material',
    name: 'Material',
    meta: {
      title: "Stok Bahan Baku"
    },
    component: () => import('../views/Owner/Material/ListMaterial.vue')
  },
  {
    path: '/owner/operator',
    name: 'Operator',
    meta: {
      title: "Manajemen Operator"
    },
    component: () => import('../views/Owner/Operator/ListOperator.vue')
  },
  {
    path: '/owner/report-material-used',
    name: 'ReportMaterialUsed',
    meta: {
      title: "Laporan Penggunaan Bahan Baku"
    },
    component: () => import('../views/Owner/ReportMaterialUsed/ReportMaterial.vue')
  },
  {
    path: '/owner/report-production',
    name: 'ReportProduction',
    meta: {
      title: "Laporan Produksi"
    },
    component: () => import('../views/Owner/ReportProduction/ListReportProduction.vue')
  },
  {
    path: '/owner/invoice-report',
    name: 'InvoiceReport',
    meta: {
      title: "Laporan Invoice"
    },
    component: () => import('../views/Owner/InvoiceReport/InvoiceReport.vue')
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'mm-active',
  linkExactActiveClass: 'active'
})

export default router;