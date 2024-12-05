<script setup lang="ts">
import Home from '../../../components/Home.vue';
import { ref, computed } from 'vue';
import Pagination from '../../../components/Pagination.vue';
import Card from '../../../components/Card.vue';

interface Production {
  id: number;
  product_id: number;
  product_name: string;
  user_id: number;
  user_name: string;
  factory_id: number;
  factory_name: string;
  unit_id: number;
  unit_name: string;
  amount: number;
  created_at: string;
}

interface Product {
  id: number;
  name: string;
}

interface Unit {
  id: number;
  name: string;
}

const productions = ref<Production[]>([]);
const products = ref<Product[]>([]);
const units = ref<Unit[]>([]);

// Sample data
productions.value.push({
  id: 1,
  product_id: 1,
  product_name: "Rokok A",
  user_id: 1,
  user_name: "Operator 1",
  factory_id: 1,
  factory_name: "Pabrik A",
  unit_id: 1,
  unit_name: "Bungkus",
  amount: 1000,
  created_at: new Date().toISOString(),
});

// Sample products and units
products.value.push(
  { id: 1, name: "Rokok A" },
  { id: 2, name: "Rokok B" }
);

units.value.push(
  { id: 1, name: "Bungkus" },
  { id: 2, name: "Slop" },
  { id: 3, name: "Pack" }
);

const showAddProductionModal = ref(false);
const newProduction = ref({
  product_id: 0,
  unit_id: 0,
  amount: 0
});

const searchQuery = ref('');
const filterLimit = ref(10);
const dateFilter = ref(new Date().toISOString().split('T')[0]);

const filteredProductions = computed(() => {
  return productions.value
    .filter(production => 
      production.product_name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      production.created_at.includes(dateFilter.value)
    )
    .slice(0, filterLimit.value);
});

function addProduction() {
  if (newProduction.value.product_id && newProduction.value.amount > 0) {
    const selectedProduct = products.value.find(p => p.id === newProduction.value.product_id);
    const selectedUnit = units.value.find(u => u.id === newProduction.value.unit_id);
    
    productions.value.push({
      id: productions.value.length + 1,
      ...newProduction.value,
      product_name: selectedProduct?.name || '',
      user_id: 1, // Should come from auth
      user_name: 'Current User',
      factory_id: 1, // Should come from user's assigned factory
      factory_name: 'Current Factory',
      unit_name: selectedUnit?.name || '',
      created_at: new Date().toISOString()
    });

    // Reset form
    newProduction.value = {
      product_id: 0,
      unit_id: 0,
      amount: 0
    };
    showAddProductionModal.value = false;
  }
}

// Add cards data
const cards = [
  {
    title: "Total Produksi Hari Ini",
    icon: "bx bx-package",
    value: filteredProductions.value.length
  },
  {
    title: "Total Jumlah Produksi",
    icon: "bx bx-bar-chart",
    value: filteredProductions.value.reduce((sum, p) => sum + p.amount, 0)
  }
];
</script>

<template>
  <Home>
    <!-- Add cards section -->
    <div class="row">
      <div class="col-xl-6" v-for="item in cards">
        <Card :title="item.title" :icon="item.icon" :value="item.value" />
      </div>
    </div>
    
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Laporan Produksi</h4>
            <p class="card-title-desc">
              Laporan produksi harian (maksimal 2 kali per hari).
            </p>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-md-auto">
                <select v-model="filterLimit" class="form-select">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div class="col-md-auto">
                <input type="date" v-model="dateFilter" class="form-control">
              </div>
              <div class="col-md-auto">
                <div class="input-group">
                  <input type="text" v-model="searchQuery" class="form-control" placeholder="Cari Produk">
                  <button class="btn btn-primary">
                    <i class="bx bx-search"></i>
                  </button>
                </div>
              </div>
              <div class="col-auto ms-auto">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductionModal">
                  <i class="bx bx-plus"></i>
                  Tambah Laporan
                </button>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-hover table-striped table-bordered">
                <thead>
                  <tr>
                    <th class="text-center" style="width: 100px;">No.</th>
                    <th>Tanggal</th>
                    <th>Jam</th>
                    <th>Nama Produk</th>
                    <th>Jumlah</th>
                    <th>Satuan</th>
                    <th>Operator</th>
                    <th>Pabrik</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(production, index) in filteredProductions" :key="production.id">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>{{ new Date(production.created_at).toLocaleDateString('id-ID') }}</td>
                    <td>{{ new Date(production.created_at).toLocaleTimeString('id-ID') }}</td>
                    <td>{{ production.product_name }}</td>
                    <td>{{ production.amount }}</td>
                    <td>{{ production.unit_name }}</td>
                    <td>{{ production.user_name }}</td>
                    <td>{{ production.factory_name }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for adding new production report -->
    <div class="modal fade" id="addProductionModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tambah Laporan Produksi</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Produk</label>
              <select v-model="newProduction.product_id" class="form-select">
                <option value="">Pilih Produk</option>
                <option v-for="product in products" :key="product.id" :value="product.id">
                  {{ product.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Satuan</label>
              <select v-model="newProduction.unit_id" class="form-select">
                <option value="">Pilih Satuan</option>
                <option v-for="unit in units" :key="unit.id" :value="unit.id">
                  {{ unit.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Jumlah Produksi</label>
              <input type="number" v-model="newProduction.amount" class="form-control" placeholder="Jumlah Produksi">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" @click="addProduction">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </Home>
</template>
