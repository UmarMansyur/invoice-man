<script setup lang="ts">
import Home from '../../../components/Home.vue';
import { ref, computed } from 'vue';
import Pagination from '../../../components/Pagination.vue';

interface Product {
  id: number;
  name: string;
  satuan: string;
  sale_price: number;
  production_cost: number;
  stock: number;
}

interface Unit {
  id: number;
  name: string;
}

const products = ref<Product[]>([]);
const units = ref<Unit[]>([]);

// Sample data
products.value.push({
  id: 1,
  name: "Produk A",
  satuan: "Kg",
  sale_price: 10000,
  production_cost: 8000,
  stock: 100
});

units.value.push(
  { id: 1, name: "Kg" },
  { id: 2, name: "Pcs" },
  { id: 3, name: "Lusin" }
);

const showAddProductModal = ref(false);
const newProduct = ref({
  name: '',
  satuan: '',
  sale_price: 0,
  production_cost: 0,
  stock: 0
});

const searchQuery = ref('');
const filterLimit = ref(10);

const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, filterLimit.value);
});

function addProduct() {
  if (newProduct.value.name.trim()) {
    products.value.push({
      id: products.value.length + 1,
      ...newProduct.value
    });
    // Reset form
    newProduct.value = {
      name: '',
      satuan: '',
      sale_price: 0,
      production_cost: 0,
      stock: 0
    };
    showAddProductModal.value = false;
  }
}
</script>

<template>
  <Home>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Daftar Produk</h4>
            <p class="card-title-desc">
              Berikut adalah daftar produk yang terdaftar di aplikasi.
            </p>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-md-auto">
                <select v-model="filterLimit" class="form-select">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
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
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">
                  <i class="bx bx-plus"></i>
                  Tambah Produk
                </button>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-hover table-striped table-bordered">
                <thead>
                  <tr>
                    <th class="text-center" style="width: 100px;">No.</th>
                    <th>Nama Produk</th>
                    <th>Satuan</th>
                    <th>Harga Jual</th>
                    <th>Biaya Produksi</th>
                    <th>Stok</th>
                    <th class="text-center" style="width: 250px;">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, index) in filteredProducts" :key="product.id">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.satuan }}</td>
                    <td>Rp {{ product.sale_price.toLocaleString() }}</td>
                    <td>Rp {{ product.production_cost.toLocaleString() }}</td>
                    <td>{{ product.stock }}</td>
                    <td class="text-center d-flex gap-2 justify-content-center">
                      <router-link to="/owner/products/edit" class="btn btn-sm btn-warning">
                        <i class="bx bx-pencil"></i>
                      </router-link>
                      <button class="btn btn-sm btn-danger">
                        <i class="bx bx-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for adding new product -->
    <div class="modal fade" id="addProductModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tambah Produk Baru</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Nama Produk</label>
              <input type="text" v-model="newProduct.name" class="form-control" placeholder="Nama Produk">
            </div>
            <div class="mb-3">
              <label class="form-label">Satuan</label>
              <select v-model="newProduct.satuan" class="form-select">
                <option value="">Pilih Satuan</option>
                <option v-for="unit in units" :key="unit.id" :value="unit.name">
                  {{ unit.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Harga Jual</label>
              <input type="number" v-model="newProduct.sale_price" class="form-control" placeholder="Harga Jual">
            </div>
            <div class="mb-3">
              <label class="form-label">Biaya Produksi</label>
              <input type="number" v-model="newProduct.production_cost" class="form-control" placeholder="Biaya Produksi">
            </div>
            <div class="mb-3">
              <label class="form-label">Stok</label>
              <input type="number" v-model="newProduct.stock" class="form-control" placeholder="Stok">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" @click="addProduct">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </Home>
</template>
