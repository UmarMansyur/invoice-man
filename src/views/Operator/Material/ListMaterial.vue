<script setup lang="ts">
import Home from '../../../components/Home.vue';
import { ref, computed } from 'vue';
import Pagination from '../../../components/Pagination.vue';
import Card from '../../../components/Card.vue';

interface Material {
  id: number;
  material_id: number;
  material_name: string;
  user_id: number;
  user_name: string;
  factory_id: number;
  factory_name: string;
  unit_id: number;
  unit_name: string;
  stock: number;
  created_at: string;
}

interface MaterialType {
  id: number;
  name: string;
}

interface Unit {
  id: number;
  name: string;
}

const materials = ref<Material[]>([]);
const materialTypes = ref<MaterialType[]>([]);
const units = ref<Unit[]>([]);

// Sample data
materials.value.push({
  id: 1,
  material_id: 1,
  material_name: "Tembakau A",
  user_id: 1,
  user_name: "Operator 1",
  factory_id: 1,
  factory_name: "Pabrik A",
  unit_id: 1,
  unit_name: "Kg",
  stock: 100,
  created_at: new Date().toISOString(),
});

// Sample material types and units
materialTypes.value.push(
  { id: 1, name: "Tembakau A" },
  { id: 2, name: "Tembakau B" }
);

units.value.push(
  { id: 1, name: "Kg" },
  { id: 2, name: "Gram" },
  { id: 3, name: "Ton" }
);

const showAddMaterialModal = ref(false);
const newMaterial = ref({
  material_id: 0,
  unit_id: 0,
  stock: 0
});

const searchQuery = ref('');
const filterLimit = ref(10);
const dateFilter = ref(new Date().toISOString().split('T')[0]);

const filteredMaterials = computed(() => {
  return materials.value
    .filter(material => 
      material.material_name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      material.created_at.includes(dateFilter.value)
    )
    .slice(0, filterLimit.value);
});

function addMaterial() {
  if (newMaterial.value.material_id && newMaterial.value.stock > 0) {
    const selectedMaterial = materialTypes.value.find(m => m.id === newMaterial.value.material_id);
    const selectedUnit = units.value.find(u => u.id === newMaterial.value.unit_id);
    
    materials.value.push({
      id: materials.value.length + 1,
      ...newMaterial.value,
      material_name: selectedMaterial?.name || '',
      user_id: 1, // Should come from auth
      user_name: 'Current User',
      factory_id: 1, // Should come from user's assigned factory
      factory_name: 'Current Factory',
      unit_name: selectedUnit?.name || '',
      created_at: new Date().toISOString()
    });

    // Reset form
    newMaterial.value = {
      material_id: 0,
      unit_id: 0,
      stock: 0
    };
    showAddMaterialModal.value = false;
  }
}

// Add cards data
const cards = [
  {
    title: "Total Laporan Hari Ini",
    icon: "bx bx-package",
    value: filteredMaterials.value.length
  },
  {
    title: "Total Stok Material",
    icon: "bx bx-bar-chart",
    value: filteredMaterials.value.reduce((sum, m) => sum + m.stock, 0)
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
            <h4 class="card-title">Laporan Material</h4>
            <p class="card-title-desc">
              Laporan stok material harian (maksimal 2 kali per hari).
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
                  <input type="text" v-model="searchQuery" class="form-control" placeholder="Cari Material">
                  <button class="btn btn-primary">
                    <i class="bx bx-search"></i>
                  </button>
                </div>
              </div>
              <div class="col-auto ms-auto">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addMaterialModal">
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
                    <th>Nama Material</th>
                    <th>Stok</th>
                    <th>Satuan</th>
                    <th>Operator</th>
                    <th>Pabrik</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(material, index) in filteredMaterials" :key="material.id">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>{{ new Date(material.created_at).toLocaleDateString('id-ID') }}</td>
                    <td>{{ new Date(material.created_at).toLocaleTimeString('id-ID') }}</td>
                    <td>{{ material.material_name }}</td>
                    <td>{{ material.stock }}</td>
                    <td>{{ material.unit_name }}</td>
                    <td>{{ material.user_name }}</td>
                    <td>{{ material.factory_name }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for adding new material report -->
    <div class="modal fade" id="addMaterialModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tambah Laporan Material</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Material</label>
              <select v-model="newMaterial.material_id" class="form-select">
                <option value="">Pilih Material</option>
                <option v-for="material in materialTypes" :key="material.id" :value="material.id">
                  {{ material.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Satuan</label>
              <select v-model="newMaterial.unit_id" class="form-select">
                <option value="">Pilih Satuan</option>
                <option v-for="unit in units" :key="unit.id" :value="unit.id">
                  {{ unit.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Jumlah Stok</label>
              <input type="number" v-model="newMaterial.stock" class="form-control" placeholder="Jumlah Stok">
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