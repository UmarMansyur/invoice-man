<script setup lang="ts">
import Home from '../../../components/Home.vue';
import { ref } from 'vue';
import Pagination from '../../../components/Pagination.vue';
import Card from '../../../components/Card.vue';

const cards = [
  {
    title: "Total Operator",
    icon: "bx bx-user-voice",
    value: 45
  },
  {
    title: "Operator Aktif",
    icon: "bx bx-user-check",
    value: 38
  },
  {
    title: "Pabrik Aktif",
    icon: "bx bx-building-house",
    value: 12
  },
  {
    title: "Total Hak Akses",
    icon: "bx bx-key",
    value: 8
  }
];

interface Operator {
  id: number;
  factory_name: string;
  user_name: string;
  role: string;
  last_active: string;
  status: 'active' | 'inactive';
  access_level: string;
  avatar: string;
}

const operators = ref<Operator[]>([
  {
    id: 1,
    factory_name: "Pabrik Tahu Jaya",
    user_name: "Ahmad Operator",
    role: "Super Operator",
    last_active: "2024-03-20",
    status: "active",
    access_level: "Full Access",
    avatar: "https://via.placeholder.com/150"
  },
  // Add more dummy data as needed
]);
</script>

<template>
  <Home>
    <div class="row mb-4">
      <div class="col-xl-3" v-for="item in cards" :key="item.title">
        <Card :title="item.title" :icon="item.icon" :value="item.value" />
      </div>
    </div>

    <div class="card">
      <div class="card-header border-bottom d-flex align-items-center justify-content-between">
        <div>
          <h4 class="card-title mb-2">Daftar Operator Pabrik</h4>
          <p class="text-muted mb-0">
            Kelola operator pabrik dan hak akses mereka di sistem
          </p>
        </div>
        <router-link to="/owner/operator/add" class="btn btn-primary">
          <i class="bx bx-plus me-1"></i>
          Tambah Operator
        </router-link>
      </div>

      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-3">
            <div class="input-group">
              <span class="input-group-text bg-light">
                <i class="bx bx-search"></i>
              </span>
              <input type="text" class="form-control" placeholder="Cari operator...">
            </div>
          </div>
          <div class="col-md-2">
            <select class="form-select">
              <option value="">Semua Pabrik</option>
              <option value="1">Pabrik Tahu Jaya</option>
              <option value="2">Pabrik Tempe Sukses</option>
            </select>
          </div>
          <div class="col-md-2">
            <select class="form-select">
              <option value="">Semua Hak Akses</option>
              <option value="full">Full Access</option>
              <option value="limited">Limited Access</option>
            </select>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th class="text-center" style="width: 50px">No.</th>
                <th style="min-width: 250px;">Nama Pabrik</th>
                <th style="min-width: 200px;">Pengguna</th>
                <th>Hak Akses</th>
                <th>Status</th>
                <th class="text-center" style="width: 150px">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="operator in operators" :key="operator.id">
                <td class="text-center">{{ operator.id }}</td>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                      <img :src="operator.avatar" class="rounded-circle" width="35" alt="avatar">
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="mb-0">{{ operator.factory_name }}</h6>
                      <small class="text-muted">Last active: {{ operator.last_active }}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <h6 class="mb-0">{{ operator.user_name }}</h6>
                    <small class="text-muted">{{ operator.role }}</small>
                  </div>
                </td>
                <td>
                  <span class="badge bg-soft-info text-info">
                    {{ operator.access_level }}
                  </span>
                </td>
                <td>
                  <span :class="['badge', operator.status === 'active' ? 'bg-soft-success text-success' : 'bg-soft-danger text-danger']">
                    {{ operator.status === 'active' ? 'Aktif' : 'Tidak Aktif' }}
                  </span>
                </td>
                <td class="text-center">
                  <div class="d-flex gap-2 justify-content-center">
                    <button class="btn btn-sm btn-soft-primary" title="Edit">
                      <i class="bx bx-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-soft-warning" title="Manage Access">
                      <i class="bx bx-key"></i>
                    </button>
                    <button class="btn btn-sm btn-soft-danger" title="Delete">
                      <i class="bx bx-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Pagination class="mt-4" />
      </div>
    </div>
  </Home>
</template>
