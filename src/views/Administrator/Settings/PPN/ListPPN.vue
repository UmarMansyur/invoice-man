<script setup lang="ts">
import Home from '../../../../components/Home.vue';
import { ref, computed } from 'vue';
import Pagination from '../../../../components/Pagination.vue';

interface PPN {
  id: number;
  name: string;
  ppn: string;
  status: boolean;
}

const ppns = ref<PPN[]>([]);
ppns.value.push({
  id: 1,
  name: "Pajak Penghasilan Negara 2024",
  ppn: "10%",
  status: true
});

const showAddUnitModal = ref(false);
const newUnitName = ref('');
const newUnitPPN = ref('');

const searchQuery = ref('');
const filterLimit = ref(10);

const filteredPPNs = computed(() => {
  return ppns.value.filter(ppn =>
    ppn.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, filterLimit.value);
});

function addPPN() {
  if (newUnitName.value.trim() && newUnitPPN.value.trim()) {
    ppns.value.push({
      id: ppns.value.length + 1,
      name: newUnitName.value,
      ppn: newUnitPPN.value,
      status: true
    });
    newUnitName.value = '';
    newUnitPPN.value = '';
    showAddUnitModal.value = false;
  }
}

function togglePPNStatus(ppn: PPN) {
  ppn.status = !ppn.status;
}
</script>

<template>
  <Home>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Daftar PPN</h4>
            <p class="card-title-desc">
              Berikut adalah daftar PPN yang terdaftar di aplikasi.
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
                  <input type="text" v-model="searchQuery" class="form-control" placeholder="Cari PPN">
                  <button class="btn btn-primary">
                    <i class="bx bx-search"></i>
                  </button>
                </div>
              </div>
              <div class="col-auto ms-auto">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPPNModal">
                  <i class="bx bx-plus"></i>
                  Tambah PPN
                </button>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-hover table-striped table-bordered">
                <thead>
                  <tr>
                    <th class="text-center" style="width: 100px;">No.</th>
                    <th>Nama</th>
                    <th>PPN</th>
                    <th>Status</th>
                    <th class="text-center" style="width: 250px;">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(ppn, index) in filteredPPNs" :key="ppn.id">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>{{ ppn.name }}</td>
                    <td>{{ ppn.ppn }}</td>
                    <td>
                      <div class="form-check form-switch">
                        <input 
                          class="form-check-input" 
                          type="checkbox" 
                          :checked="ppn.status"
                          @change="togglePPNStatus(ppn)"
                        >
                      </div>
                    </td>
                    <td class="text-center d-flex gap-2 justify-content-center">
                      <router-link to="/admin/ppns/edit" class="btn btn-sm btn-warning">
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

    <!-- Modal for adding new unit -->
    <div class="modal fade" id="addPPNModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tambah PPN Baru</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Nama PPN</label>
              <input type="text" v-model="newUnitName" class="form-control" placeholder="Nama PPN">
            </div>
            <div class="mb-3">
              <label class="form-label">PPN</label>
              <input type="text" v-model="newUnitPPN" class="form-control" placeholder="Contoh: 10%">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" @click="addPPN">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </Home>
</template>