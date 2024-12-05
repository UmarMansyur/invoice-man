<script setup lang="ts">
import Home from '../../../../components/Home.vue';
import { ref } from 'vue';

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

// Modal state
const showModal = ref(false);
const selectedUser = ref<User | null>(null);
const newUsername = ref('');
const newPassword = ref('');


const openModal = (user: User) => {
  selectedUser.value = user;
  newUsername.value = user.username;
  newPassword.value = '';
};

const updateCredentials = () => {
  // Add your logic here to update username and password
  showModal.value = false;
};
</script>

<template>
  <Home>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Pengaturan Akun Pengguna</h4>
            <p class="card-title-desc">
              Berikut adalah daftar pengguna yang dapat diatur username dan passwordnya
            </p>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-auto mb-3">
                <select class="form-select">
                  <option value="1">Limit</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div class="col-auto ms-auto mb-3">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Cari pengguna">
                  <button class="btn btn-light">
                    <i class="bx bx-search"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-hover table-striped table-bordered">
                <thead>
                  <tr>
                    <th class="text-center">No</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Gender</th>
                    <th>Tanggal Lahir</th>
                    <th>Thumbnail</th>
                    <th>Address</th>
                    <th>Created At</th>
                    <th>Active</th>
                    <th>Verified</th>
                    <th class="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in users" :key="user.id">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.gender }}</td>
                    <td>{{ user.tanggal_lahir }}</td>
                    <td>{{ user.thumbnail }}</td>
                    <td>{{ user.address }}</td>
                    <td>{{ user.created_at }}</td>
                    <td class="text-center">{{ user.is_active ? 'Yes' : 'No' }}</td>
                    <td class="text-center">{{ user.is_verified ? 'Yes' : 'No' }}</td>
                    <td class="text-center">
                      <button class="btn btn-primary btn-sm" 
                        data-bs-toggle="modal" 
                        data-bs-target="#updateCredentialsModal" 
                        @click="openModal(user)">
                        <i class="bx bx-key"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Update Modal -->
    <div class="modal fade" id="updateCredentialsModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="updateCredentialsModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateCredentialsModalLabel">Update Credentials</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Username</label>
              <input type="text" class="form-control" v-model="newUsername">
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" v-model="newPassword">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateCredentials">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </Home>
</template>
