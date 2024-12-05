<script setup lang="ts">
import Home from '../../../components/Home.vue';
import { ref } from 'vue';
import Pagination from '../../../components/Pagination.vue';
import Card from '../../../components/Card.vue';
const cards = [
  {
    title: "Total Pengguna",
    icon: "bx bx-user",
    value: 12
  },
  {
    title: "Total Pengguna Aktif",
    icon: "bx bx-user-circle",
    value: 12
  },
  {
    title: "Total Pengguna Terverifikasi",
    icon: "bx bx-user-check",
    value: 12
  },
  {
    title: "Total Pengguna Tidak Aktif",
    icon: "bx bx-user-x",
    value: 12
  }
];
interface User {
  id: number;
  email: string;
  username: string;
  gender: string;
  tanggal_lahir: string;
  thumbnail: string;
  address: string;
  created_at: string;
  is_active: boolean;
  is_verified: boolean;
}

const users = ref<User[]>([]);
users.value.push({
  id: 1,
  email: "admin@gmail.com",
  username: "Admin",
  gender: "Laki-laki",
  tanggal_lahir: "1990-01-01",
  thumbnail: "https://via.placeholder.com/150",
  address: "Jl. Admin",
  created_at: "2021-01-01",
  is_active: true,
  is_verified: true
});


</script>

<template>
  <Home>
    <div class="row">
      <div class="col-xl-3" v-for="item in cards">
        <Card :title="item.title" :icon="item.icon" :value="item.value" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Daftar Pengguna</h4>
              <p class="card-title-desc">
                Berikut adalah daftar pengguna yang terdaftar di aplikasi, anda tidak dapat mengubah akun di halaman
                ini. Untuk mengubah akun pengguna, silahkan pergi ke halaman <router-link
                  to="/administrator/users/edit">Pengaturan Akun</router-link>
              </p>
            </div>
            <div class="card-body">
              <!-- buatkan tombol search -->
              <div class="row">
                <div class="col-auto mb-3">
                  <!-- buatkan dropdown filter -->
                  <select class="form-select">
                    <option value="1">Limit</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div class="col-auto mb-3">
                  <!-- buatkan dropdown filter -->
                  <select class="form-select">
                    <option value="1">Filter</option>
                    <option value="1">Aktif</option>
                    <option value="2">Terverifikasi</option>
                    <option value="3">Tidak Aktif</option>
                  </select>
                </div>
                <div class="col-auto mb-3">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Cari pengguna">
                    <button class="btn btn-light">
                      <i class="bx bx-search"></i>
                    </button>
                  </div>
                </div>
                <div class="col-auto ms-auto mb-3">
                  <router-link to="/admin/users/add" class="btn btn-primary">
                    <i class="bx bx-plus"></i>
                    Tambah Pengguna
                  </router-link>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-hover table-striped table-bordered">
                  <thead>
                    <tr>
                      <th class="text-center">No.</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Jenis Kelamin</th>
                      <th>Tanggal Lahir</th>
                      <th>Status</th>
                      <th>Terverifikasi</th>
                      <th class="text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id">
                      <td class="text-center">{{ user.id }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.username }}</td>
                      <td>{{ user.gender }}</td>
                      <td>{{ user.address }}</td>
                      <td><span class="badge bg-primary">Aktif</span></td>
                      <td><span class="badge bg-soft-primary text-primary">Terverifikasi</span></td>
                      <td class="text-center d-flex gap-2 justify-content-center">
                        <router-link to="/admin/users/edit" class="btn btn-sm btn-warning">
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
              <!-- buatkan pagination -->
              <Pagination />
            </div>
          </div>
        </div>
      </div>

    </div>

  </Home>
</template>