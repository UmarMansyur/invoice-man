<script setup lang="ts">
import Home from '../../../components/Home.vue';
import { ref, computed } from 'vue';
import Pagination from '../../../components/Pagination.vue';

interface AccessRight {
  id: number;
  name: string;
}

const accessRights = ref<AccessRight[]>([]);
accessRights.value.push({
  id: 1,
  name: "Hak Akses A"
});

const showAddAccessRightModal = ref(false);
const newAccessRightName = ref('');

const searchQuery = ref('');
const filterLimit = ref(10);

const filteredAccessRights = computed(() => {
  return accessRights.value.filter(accessRight =>
    accessRight.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, filterLimit.value);
});

function addAccessRight() {
  if (newAccessRightName.value.trim()) {
    accessRights.value.push({
      id: accessRights.value.length + 1,
      name: newAccessRightName.value
    });
    newAccessRightName.value = '';
    showAddAccessRightModal.value = false;
  }
}
</script>

<template>
  <Home>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Daftar Hak Akses</h4>
            <p class="card-title-desc">
              Berikut adalah daftar hak akses yang terdaftar di aplikasi.
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
                  <input type="text" v-model="searchQuery" class="form-control" placeholder="Cari Hak Akses">
                  <button class="btn btn-primary">
                    <i class="bx bx-search"></i>
                  </button>
                </div>
              </div>
              <div class="col-auto ms-auto">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addAccessRightModal">
                  <i class="bx bx-plus"></i>
                  Tambah Hak Akses
                </button>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-hover table-striped table-bordered">
                <thead>
                  <tr>
                    <th class="text-center" style="width: 100px;">No.</th>
                    <th>Nama</th>
                    <th class="text-center" style="width: 250px;">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(accessRight, index) in filteredAccessRights" :key="accessRight.id">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>{{ accessRight.name }}</td>
                    <td class="text-center d-flex gap-2 justify-content-center">
                      <router-link to="/admin/access-rights/edit" class="btn btn-sm btn-warning">
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

    <div class="modal fade" id="addAccessRightModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tambah Hak Akses Baru</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input type="text" v-model="newAccessRightName" class="form-control" placeholder="Nama Hak Akses">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" @click="addAccessRight">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </Home>
</template>
