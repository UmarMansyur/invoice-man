<script setup lang="ts">
import Home from '../../../components/Home.vue';
import Card from '../../../components/Card.vue';
import { ref } from 'vue';
import Pagination from '../../../components/Pagination.vue';

enum FactoryStatus {
  ACTIVE = "Aktif",
  PENDING = "Pending",
  INACTIVE = "Tidak Aktif",
  SUSPENDED = "Ditolak"
}

interface Factory {
  id: number;
  nickname: string;
  name: string;
  logo?: string;
  address: string;
  status: FactoryStatus;
}

const factories = ref<Factory[]>([]);
factories.value.push({
  id: 1,
  nickname: "Pabrik A",
  name: "Pabrik ABC",
  logo: "https://via.placeholder.com/150",
  address: "Jl. Pabrik",
  status: FactoryStatus.ACTIVE
});

// Add card data similar to ListUser.vue
const cards = [
  {
    title: "Aktif",
    icon: "bx bx-check-circle",
    bgColor: "success-subtle",
    textColor: "success",
    value: factories.value.filter(factory => factory.status === FactoryStatus.ACTIVE).length
  },
  {
    title: "Menunggu Konfirmasi",
    icon: "bx bx-hourglass",
    bgColor: "warning-subtle",
    textColor: "warning",
    value: factories.value.filter(factory => factory.status === FactoryStatus.PENDING).length
  },
  {
    title: "Ditolak",
    icon: "bx bx-x-circle",
    bgColor: "danger-subtle",
    textColor: "danger",
    value: factories.value.filter(factory => factory.status === FactoryStatus.SUSPENDED).length
  },
  {
    title: "Tidak Aktif",
    icon: "bx bx-shield-quarter",
    bgColor: "dark-subtle",
    textColor: "dark",
    value: factories.value.filter(factory => factory.status === FactoryStatus.INACTIVE).length
  }
];
</script>

<template>
  <Home>
    <!-- Add card dashboard similar to ListUser.vue -->
    <div class="row">
      <div class="col-xl-3" v-for="item in cards" :key="item.title">
        <Card :title="item.title" :icon="item.icon" :value="item.value" :bgColor="item.bgColor" :textColor="item.textColor" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Daftar Pabrik</h4>
            <p class="card-title-desc">
              Berikut adalah daftar pabrik yang terdaftar di aplikasi, anda tidak dapat mengubah akun di halaman
              ini. Untuk mengubah akun pabrik, silahkan pergi ke halaman <router-link
                to="/administrator/factories/edit">Pengaturan Pabrik</router-link>
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
              <div class="col-auto mb-3">
                <select class="form-select">
                  <option value="1">Filter</option>
                  <option value="1">Aktif</option>
                  <option value="2">Suspended</option>
                </select>
              </div>
              <div class="col-auto mb-3">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Cari pabrik">
                  <button class="btn btn-light">
                    <i class="bx bx-search"></i>
                  </button>
                </div>
              </div>
              <div class="col-auto ms-auto mb-3">
                <router-link to="/admin/factories/add" class="btn btn-primary">
                  <i class="bx bx-plus"></i>
                  Tambah Pabrik
                </router-link>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-hover table-striped table-bordered">
                <thead>
                  <tr>
                    <th class="text-center">No.</th>
                    <th>Nickname</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>Status</th>
                    <th class="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="factory in factories" :key="factory.id">
                    <td class="text-center">{{ factory.id }}</td>
                    <td>{{ factory.nickname }}</td>
                    <td>{{ factory.name }}</td>
                    <td>{{ factory.address }}</td>
                    <td><span :class="{'badge bg-primary': factory.status === FactoryStatus.ACTIVE, 'badge bg-danger': factory.status === FactoryStatus.SUSPENDED}">{{ factory.status }}</span></td>
                    <td class="text-center d-flex gap-2 justify-content-center">
                      <router-link to="/admin/factories/edit" class="btn btn-sm btn-warning">
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
  </Home>
</template>
