<script setup lang="ts">
import Home from '../../../components/Home.vue';
import { ref, computed } from 'vue';
import Pagination from '../../../components/Pagination.vue';
import Card from '../../../components/Card.vue';

interface Material {
  id: number;
  name: string;
  satuan: string;
  stock: number;
}

interface Unit {
  id: number;
  name: string;
}

const materials = ref<Material[]>([]);
const units = ref<Unit[]>([]);

// Sample data
materials.value.push({
  id: 1,
  name: "Tepung Terigu",
  satuan: "Kg",
  stock: 100
});

units.value.push(
  { id: 1, name: "Kg" },
  { id: 2, name: "Gram" },
  { id: 3, name: "Liter" }
);

const showAddMaterialModal = ref(false);
const newMaterial = ref({
  name: '',
  satuan: '',
  stock: 0
});

const searchQuery = ref('');
const filterLimit = ref(10);

const filteredMaterials = computed(() => {
  return materials.value.filter(material =>
    material.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, filterLimit.value);
});

function addMaterial() {
  if (newMaterial.value.name.trim()) {
    materials.value.push({
      id: materials.value.length + 1,
      ...newMaterial.value
    });
    // Reset form
    newMaterial.value = {
      name: '',
      satuan: '',
      stock: 0
    };
    showAddMaterialModal.value = false;
  }
}

// Add cards data
const cards = [
  {
    title: "Total Bahan Baku",
    icon: "bx bx-package",
    value: materials.value.length
  },
  {
    title: "Stok Tersedia",
    icon: "bx bx-check-circle",
    value: materials.value.filter(m => m.stock > 0).length
  },
  {
    title: "Stok Menipis",
    icon: "bx bx-error",
    value: materials.value.filter(m => m.stock < 10).length
  },
  {
    title: "Stok Habis",
    icon: "bx bx-x-circle",
    value: materials.value.filter(m => m.stock === 0).length
  }
];
</script>

<template>
  <Home>
    <!-- Add cards section -->
    <div class="row">
      <div class="col-xl-3" v-for="item in cards">
        <Card :title="item.title" :icon="item.icon" :value="item.value" />
      </div>
    </div>
    
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Daftar Bahan Baku</h4>
            <p class="card-title-desc">
              Berikut adalah daftar bahan baku yang terdaftar di aplikasi.
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
                  <input type="text" v-model="searchQuery" class="form-control" placeholder="Cari Bahan Baku">
                  <button class="btn btn-primary">
                    <i class="bx bx-search"></i>
                  </button>
                </div>
              </div>
              <div class="col-auto ms-auto">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addMaterialModal">
                  <i class="bx bx-plus"></i>
                  Tambah Bahan Baku
                </button>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-hover table-striped table-bordered">
                <thead>
                  <tr>
                    <th class="text-center" style="width: 100px;">No.</th>
                    <th>Nama Bahan Baku</th>
                    <th>Satuan</th>
                    <th>Stok</th>
                    <th class="text-center" style="width: 250px;">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(material, index) in filteredMaterials" :key="material.id">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>{{ material.name }}</td>
                    <td>{{ material.satuan }}</td>
                    <td>{{ material.stock }}</td>
                    <td class="text-center d-flex gap-2 justify-content-center">
                      <router-link to="/owner/materials/edit" class="btn btn-sm btn-warning">
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

    <!-- Modal for adding new material -->
    <div class="modal fade" id="addMaterialModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tambah Bahan Baku Baru</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Nama Bahan Baku</label>
              <input type="text" v-model="newMaterial.name" class="form-control" placeholder="Nama Bahan Baku">
            </div>
            <div class="mb-3">
              <label class="form-label">Satuan</label>
              <select v-model="newMaterial.satuan" class="form-select">
                <option value="">Pilih Satuan</option>
                <option v-for="unit in units" :key="unit.id" :value="unit.name">
                  {{ unit.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Stok</label>
              <input type="number" v-model="newMaterial.stock" class="form-control" placeholder="Stok">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" @click="addMaterial">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </Home>
</template>
