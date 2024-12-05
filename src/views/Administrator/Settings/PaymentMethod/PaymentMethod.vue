<script setup lang="ts">
import Home from '../../../../components/Home.vue';
import { ref, computed } from 'vue';
import Pagination from '../../../../components/Pagination.vue';

interface PaymentMethod {
  id: number;
  name: string;
}

const paymentMethods = ref<PaymentMethod[]>([]);
paymentMethods.value.push({
  id: 1,
  name: "Payment Method A"
});

const showAddPaymentMethodModal = ref(false);
const newPaymentMethodName = ref('');

const searchQuery = ref('');
const filterLimit = ref(10);

const filteredPaymentMethods = computed(() => {
  return paymentMethods.value.filter(method =>
    method.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, filterLimit.value);
});

function addPaymentMethod() {
  if (newPaymentMethodName.value.trim()) {
    paymentMethods.value.push({
      id: paymentMethods.value.length + 1,
      name: newPaymentMethodName.value
    });
    newPaymentMethodName.value = '';
    showAddPaymentMethodModal.value = false;
  }
}
</script>

<template>
  <Home>

    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Daftar Metode Pembayaran</h4>
            <p class="card-title-desc">
              Berikut adalah daftar metode pembayaran yang terdaftar di aplikasi.
            </p>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <!-- Search input -->

              <!-- Filter limit dropdown -->
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
                  <input type="text" v-model="searchQuery" class="form-control" placeholder="Cari Metode Pembayaran">
                  <button class="btn btn-primary">
                    <i class="bx bx-search"></i>
                  </button>
                </div>
              </div>
              <!-- Add button to trigger modal for adding new unit -->
              <div class="col-auto ms-auto">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPaymentMethodModal">
                  <i class="bx bx-plus"></i>
                  Tambah Metode Pembayaran
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
                  <tr v-for="(method, index) in filteredPaymentMethods" :key="method.id">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>{{ method.name }}</td>
                    <td class="text-center d-flex gap-2 justify-content-center">
                      <router-link to="/admin/payment-methods/edit" class="btn btn-sm btn-warning">
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

    <!-- Modal for adding new unit using Bootstrap -->
    <div class="modal fade" id="addPaymentMethodModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tambah Metode Pembayaran Baru</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input type="text" v-model="newPaymentMethodName" class="form-control" placeholder="Nama Metode Pembayaran">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" @click="addPaymentMethod">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </Home>
</template>
