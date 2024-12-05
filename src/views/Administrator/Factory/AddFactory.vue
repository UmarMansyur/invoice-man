<script setup lang="ts">
import Home from '../../../components/Home.vue';
import { ref } from 'vue';

interface Factory {
  nickname: string;
  name: string;
  logo?: string;
  address: string;
  status: string;
}

const newFactory = ref<Factory>({
  nickname: '',
  name: '',
  logo: '',
  address: '',
  status: 'Aktif' // Default status
});

function addFactory() {
  // Logic to add the factory, e.g., API call
  console.log('Factory added:', newFactory.value);
}

function handleLogoChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    // Logic to handle file upload
    console.log('Logo file selected:', file.name);
  }
}
</script>

<template>
  <Home>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Tambah Pabrik</h4>
            <p class="card-title-desc">
              Silahkan isi form berikut untuk menambahkan pabrik baru.
            </p>
          </div>
          <div class="card-body">
            <form @submit.prevent="addFactory">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="nickname" class="form-label">Nickname</label>
                    <input type="text" id="nickname" v-model="newFactory.nickname" class="form-control" required placeholder="Masukkan nickname pabrik">
                    <small class="form-text text-muted">Masukkan nama panggilan untuk pabrik.</small>
                  </div>
                  <div class="mb-3">
                    <label for="name" class="form-label">Nama</label>
                    <input type="text" id="name" v-model="newFactory.name" class="form-control" required placeholder="Masukkan nama pabrik">
                    <small class="form-text text-muted">Masukkan nama resmi pabrik.</small>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="status" class="form-label">Status</label>
                    <select id="status-factory" v-model="newFactory.status" class="form-select">
                      <option value="Aktif">Aktif</option>
                      <option value="Pending">Pending</option>
                      <option value="Tidak Aktif">Tidak Aktif</option>
                      <option value="Ditolak">Ditolak</option>
                    </select>
                    <small class="form-text text-muted">Pilih status operasional pabrik.</small>
                  </div>
                  <div class="mb-3">
                    <label for="logo" class="form-label">Logo URL</label>
                    <input type="file" id="logo" @change="handleLogoChange" class="form-control">
                    <small class="form-text text-muted">Unggah logo pabrik dalam format gambar.</small>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Alamat</label>
                <textarea id="address" v-model="newFactory.address" class="form-control" rows="5" required placeholder="Masukkan alamat pabrik"></textarea>
                <small class="form-text text-muted">Masukkan alamat lengkap pabrik.</small>
              </div>
              <div class="d-flex justify-content-end">
                <button @click="$router.go(-1)" type="button" class="btn btn-secondary me-2">
                  <i class="bx bx-arrow-back"></i> Kembali
                </button>
                <button type="submit" class="btn btn-primary">
                  <i class="bx bx-plus"></i> Tambah Pabrik
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Home>
</template>
