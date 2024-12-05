<template>
  <Home>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Tambah Pengguna</h4>
            <p class="card-title-desc">
              Silahkan isi form di bawah ini untuk menambahkan pengguna baru.
            </p>
          </div>
          <div class="card-body">
            <form @submit.prevent="addUser">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" v-model="newUser.email" required placeholder="Masukkan email" autofocus>
                  </div>
                  <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" v-model="newUser.username" required placeholder="Masukkan username">
                  </div>
                  <div class="mb-3">
                    <label for="gender" class="form-label">Jenis Kelamin</label>
                    <select class="form-select" id="gender" v-model="newUser.gender" required>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                 
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="tanggal_lahir" class="form-label">Tanggal Lahir</label>
                    <input type="date" class="form-control" id="tanggal_lahir" v-model="newUser.tanggal_lahir" required placeholder="Pilih tanggal lahir">
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" required placeholder="Masukkan password">
                  </div>
                 
                  <div class="mb-3">
                    <label for="thumbnail" class="form-label">Thumbnail</label>
                    <input type="file" class="form-control" id="thumbnail" required>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="mb-3">
                    <label for="address" class="form-label">Alamat</label>
                    <textarea class="form-control" id="address" v-model="newUser.address" required rows="5" placeholder="Masukkan alamat"></textarea>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <router-link to="/admin/users" class="btn btn-light">
                  <i class="bx bx-reply"></i>
                  Kembali
                </router-link>
                <button type="submit" class="btn btn-primary">
                  <i class="bx bx-send"></i>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Home>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Home from '../../../components/Home.vue';

interface User {
  email: string;
  username: string;
  gender: string;
  tanggal_lahir: string;
  address: string;
}

const newUser = ref<User>({
  email: '',
  username: '',
  gender: 'Laki-laki',
  tanggal_lahir: '',
  address: ''
});

function addUser() {
  // Logic to add user
  console.log('User added:', newUser.value);
}
</script>
