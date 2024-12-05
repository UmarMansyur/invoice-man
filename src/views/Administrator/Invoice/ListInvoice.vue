<script setup lang="ts">
import Home from '../../../components/Home.vue';
import Card from '../../../components/Card.vue';
import { ref } from 'vue';
import Pagination from '../../../components/Pagination.vue';

const cards = [
  {
    title: "Total Data",
    icon: "bx bx-file",
    value: 150
  },
  {
    title: "Total Dibayar",
    icon: "bx bx-dollar-circle",
    value: 100
  },
  {
    title: "Total Belum Dibayar",
    icon: "bx bx-x-circle",
    value: 50
  },
  {
    title: "Total Nominal",
    icon: "bx bx-money",
    value: "Rp. 100.000.000"
  }
];

interface Invoice {
  id: number;
  invoice_code: string;
  buyer: string;
  amount: number;
  discount: number | null;
  ppn: number | null;
  total: number;
  maturity_date: string;
  payment_status: string;
  sales_man?: string;
  recipient?: string;
  item_amount?: number;
  discount_member?: number;
  unit?: string;
  description?: string;
  sub_total?: number;
}

const invoices = ref<Invoice[]>([]);

invoices.value.push({
  id: 1,
  invoice_code: "INV12345",
  buyer: "Buyer A",
  amount: 1000,
  discount: 50,
  ppn: 100,
  total: 1050,
  maturity_date: "2024-12-20",
  payment_status: "Paid",
  sales_man: "Salesman A",
  recipient: "Recipient A",
  item_amount: 10,
  discount_member: 5,
  unit: "pcs",
  description: "Sample description",
  sub_total: 950
});

</script>

<template>
  <Home>
    <div class="row">
      <div class="col-xl-3" v-for="item in cards" :key="item.title">
        <Card :title="item.title" :icon="item.icon" :value="item.value" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Daftar Invoice</h4>
              <p class="card-title-desc">
                Berikut adalah daftar invoice yang terdaftar di aplikasi, anda dapat melihat detail lebih lanjut dan status pembayaran di halaman ini.
              </p>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-auto mb-3">
                      <!-- buatkan dropdown filter -->
                      <select class="form-select">
                        <option value="">Limit</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                      </select>
                    </div>
                    <div class="col-auto mb-3">
                      <!-- buatkan dropdown filter -->
                      <select class="form-select">
                        <option value="">Filter</option>
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </div> 
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row justify-content-end gap-0">
                    <div class="col-auto mb-3 pe-1">
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Cari invoice" />
                        <button class="btn btn-primary">
                          <i class="bx bx-search"></i>
                        </button>
                      </div>
                    </div>
                    <div class="col-auto mb-3 ps-0">
                      <button class="btn btn-warning me-1">
                        <i class="bx bx-printer"></i>
                      </button>
                      <button class="btn btn-success">
                        <i class="bx bx-export"></i> Export
                      </button>
                    </div>
                  </div>
                </div>
              </div>
             
              <div class="table-responsive">
                <table class="table table-hover table-striped table-bordered">
                  <thead>
                    <tr>
                      <th class="text-center">No.</th>
                      <th>Invoice Code</th>
                      <th>Buyer</th>
                      <th>Total Amount</th>
                      <th class="text-center">Status Pembayaran</th>
                      <th>Tanggal Jatuh Tempo</th>
                      <th class="text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="invoice in invoices" :key="invoice.id">
                      <td class="text-center">{{ invoice.id }}</td>
                      <td>{{ invoice.invoice_code }}</td>
                      <td>{{ invoice.buyer }}</td>
                      <td>{{ invoice.total }}</td>
                      <td class="text-center">
                        <span :class="{
                          'badge bg-success': invoice.payment_status === 'Paid',
                          'badge bg-danger': invoice.payment_status === 'Unpaid',
                          'badge bg-warning': invoice.payment_status === 'Overdue'
                        }">
                          {{ invoice.payment_status }}
                        </span>
                      </td>
                      <td>{{ invoice.maturity_date }}</td>
                      <td class="text-center d-flex gap-2 justify-content-center">

                        <button class="btn btn-sm btn-primary" data-bs-toggle="modal" :data-bs-target="`#invoiceDetailModal${invoice.id}`">
                          <i class="bx bx-search-alt"></i>
                        </button>
                        <button class="btn btn-sm btn-warning">
                          <i class="bx bx-printer"></i>
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

    <!-- Modal for Invoice Details -->
    <div v-for="invoice in invoices" :key="`modal-${invoice.id}`" class="modal fade" :id="`invoiceDetailModal${invoice.id}`" tabindex="-1" aria-labelledby="invoiceDetailModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="invoiceDetailModalLabel">Invoice Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="invoice-title">
              <h4 class="float-end font-size-15">Invoice #{{ invoice.invoice_code }} <span :class="{'badge bg-success': invoice.payment_status === 'Paid', 'badge bg-danger': invoice.payment_status === 'Unpaid', 'badge bg-warning': invoice.payment_status === 'Overdue'}">{{ invoice.payment_status }}</span></h4>
              <div class="mb-4">
                <!-- <img src="assets/images/logo-dark-sm.png" alt="logo" height="34"> -->
              </div>
              <div class="text-muted">
                <p class="mb-1">3184 Spruce Drive Pittsburgh, PA 15201</p>
                <p class="mb-1"><i class="mdi mdi-email-outline me-1"></i> xyz@987.com</p>
                <p><i class="mdi mdi-phone-outline me-1"></i> 012-345-6789</p>
              </div>
            </div>

            <hr class="my-4">

            <div class="row">
              <div class="col-sm-6">
                <div class="text-muted">
                  <h5 class="font-size-16 mb-3">Billed To:</h5>
                  <h5 class="font-size-15 mb-2">{{ invoice.buyer }}</h5>
                  <p class="mb-1">4068 Post Avenue Newfolden, MN 56738</p>
                  <p class="mb-1">PrestonMiller@armyspy.com</p>
                  <p>001-234-5678</p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="text-muted text-sm-end">
                  <div>
                    <h5 class="font-size-15 mb-1">Invoice No:</h5>
                    <p>{{ invoice.invoice_code }}</p>
                  </div>
                  <div class="mt-4">
                    <h5 class="font-size-15 mb-1">Invoice Date:</h5>
                    <p>{{ invoice.maturity_date }}</p>
                  </div>
                  <div class="mt-4">
                    <h5 class="font-size-15 mb-1">Order No:</h5>
                    <p>#1123456</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="py-2">
              <h5 class="font-size-15">Order Summary</h5>
              <div class="table-responsive">
                <table class="table align-middle table-nowrap table-centered mb-0">
                  <thead>
                    <tr>
                      <th class="fw-bold" style="width: 70px;">No.</th>
                      <th class="fw-bold">Item</th>
                      <th class="fw-bold">Price</th>
                      <th class="fw-bold">Quantity</th>
                      <th class="text-end fw-bold" style="width: 120px;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Example data, replace with actual invoice items -->
                    <tr>
                      <th scope="row">01</th>
                      <td>
                        <div>
                          <h5 class="text-truncate font-size-14 mb-1">BLEND FAJRI MILD (PITOE)</h5>
                          <p class="text-muted mb-0">Watch, Black</p>
                        </div>
                      </td>
                      <td>Rp. 155,000.00</td>
                      <td>1,016.35</td>
                      <td class="text-end">Rp. 157,534,250.00</td>
                    </tr>
                    <!-- Add more rows as needed -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Tutup</button>
          </div>
        </div>
      </div>
    </div>
  </Home>
</template>
