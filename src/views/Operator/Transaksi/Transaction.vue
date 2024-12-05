<template>
  <Home>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">
              Transaksi
            </h4>
            <p class="card-title-desc">
              Isi form berikut untuk melakukan transaksi
            </p>
          </div>
          <div class="card-body">
            <div class="form-check form-switch mb-3">
              <input 
                class="form-check-input" 
                type="checkbox" 
                id="transactionType"
                @change="toggleTransactionType"
              >
              <label class="form-check-label" for="transactionType">
                {{ isProductTransaction ? 'Transaksi Produk' : 'Nota Keterangan' }}
              </label>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="form-group">
                  <label for="customerName">Nama Pelanggan</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="customerName"
                    v-model="formData.customerName"
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="form-group">
                  <label for="phoneNumber">Nomor HP</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="phoneNumber"
                    v-model="formData.phoneNumber"
                  />
                </div>
              </div>

            </div>
            <div class="row" v-if="isProductTransaction">
              <div class="col-md-4 mb-3">
                <div class="form-group">
                  <label for="productName">Nama Produk</label>
                  <select class="form-select" id="productName" @change="handleProductSelect">
                    <option value="">Pilih Produk</option>
                    <option v-for="product in products" :key="product.id" :value="product.id">
                      {{ product.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="form-group">
                  <label for="quantity">Jumlah</label>
                  <input type="number" class="form-control" id="quantity" @input="handleQuantityChange" min="1"/>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="form-group">
                  <label for="sellingPrice">Harga Jual</label>
                  <input 
                    type="number" 
                    class="form-control" 
                    id="sellingPrice" 
                    v-model="sellingPrice"
                    min="0"
                  />
                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="d-flex justify-content-between align-items-center">
                  <button class="btn btn-primary" @click="addToCart">Tambah ke Keranjang</button>
                  <div><strong>Sub Total: {{ formatPrice(currentSubTotal) }}</strong></div>
                </div>
              </div>
            </div>
            <div class="row" v-else>
              <div class="col-md-12 mb-3">
                <div class="form-group">
                  <label for="description">Keterangan</label>
                  <textarea class="form-control" id="description" v-model="formData.description" rows="3"></textarea>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="form-group">
                  <label for="noteAmount">Jumlah</label>
                  <input 
                    type="number" 
                    class="form-control" 
                    id="noteAmount" 
                    v-model="formData.noteAmount"
                    min="1"
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="form-group">
                  <label for="notePrice">Harga</label>
                  <input 
                    type="number" 
                    class="form-control" 
                    id="notePrice" 
                    v-model="formData.notePrice"
                    min="0"
                  />
                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="d-flex justify-content-between align-items-center">
                  <button class="btn btn-primary" @click="addNoteToCart">Tambah ke Keranjang</button>
                  <div><strong>Sub Total: {{ formatPrice(noteSubTotal) }}</strong></div>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12">
                <h5>Keranjang</h5>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Jumlah</th>
                        <th>Total</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in cartItems" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ formatPrice(item.price) }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ formatPrice(item.price * item.quantity) }}</td>
                        <td>
                          <button class="btn btn-danger btn-sm" @click="removeFromCart(index)">Hapus</button>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="3" class="text-end"><strong>Total:</strong></td>
                        <td colspan="2"><strong>{{ formatPrice(cartTotal) }}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-md-6 mb-3">
                <div class="form-group">
                  <label for="paymentMethod">Metode Pembayaran</label>
                  <select class="form-select" id="paymentMethod" v-model="paymentMethod">
                    <option value="">Pilih Metode Pembayaran</option>
                    <option v-for="method in paymentMethods" :key="method.id" :value="method.id">
                      {{ method.name }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- jika cash tempo berikan inputan tanggal disini -->
              <div class="col-md-6 mb-3" v-if="paymentMethod === 'credit'">
                <div class="form-group">
                  <label for="dueDate">Jatuh Tempo</label>
                  <input type="date" class="form-control" id="dueDate" v-model="dueDate"/>
                </div>
              </div>
              <div class="col-md-6 mb-3" v-else-if="paymentMethod === 'transfer'">
                <div class="form-group">
                  <label for="transferDate">Jumlah Dibayar</label>
                  <input type="number" class="form-control" id="transferDate"/>
                </div>
              </div>
              <div class="col-md-6 mb-3" v-else-if="paymentMethod === 'cash'">
                <div class="form-group">
                  <label for="cashAmount">Jumlah Dibayar</label>
                  <input type="number" class="form-control" id="cashAmount"/>
                </div>
              </div>
              <!-- end of if -->
               <div class="col-md-6 mb-3" v-else>
                <div class="form-group">
                  <label for="cashAmount">Jumlah Dibayar</label>
                  <input type="number" class="form-control" id="cashAmount"/>
                </div>
               </div>
              <div class="col-12">
                <button class="btn btn-primary" @click="handleSubmit">
                  Simpan Transaksi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Home>
</template>

<script setup lang="ts">
import Home from '../../../components/Home.vue';
import { ref, computed } from 'vue';

// Tambahkan interface untuk type safety
interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

// Definisikan tipe untuk formData
interface FormData {
  customerName: string;
  phoneNumber: string;
  amount: number;
  description: string;
  noteAmount: number;
  notePrice: number;
}

// Perbaiki definisi ref dengan type
const isProductTransaction = ref<boolean>(true);
const selectedProduct = ref<Product | null>(null);
const quantity = ref<number>(1);
const cartItems = ref<CartItem[]>([]);
const paymentMethod = ref<string>('');
const dueDate = ref<string>('');
const sellingPrice = ref<number>(0);
const formData = ref<FormData>({
  customerName: '',
  phoneNumber: '',
  amount: 0,
  description: '',
  noteAmount: 0,
  notePrice: 0
});

const paymentMethods = ref([
  { id: 'cash', name: 'Tunai' },
  { id: 'credit', name: 'Kredit' },
  { id: 'transfer', name: 'Transfer Bank' }
]);

const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});


const addNoteToCart = () => {
  cartItems.value.push({
    name: formData.value.description,
    price: formData.value.notePrice,
    quantity: formData.value.noteAmount
  });
};

const currentSubTotal = computed(() => {
  return (selectedProduct.value?.price || 0) * quantity.value;
});

const noteSubTotal = computed(() => {
  return formData.value.notePrice * formData.value.noteAmount;
});

const toggleTransactionType = () => {
  isProductTransaction.value = !isProductTransaction.value;
  cartItems.value = []; // Clear cart when switching types
};

// Perbaiki fungsi handleProductSelect dengan type safety
const handleProductSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const productId = parseInt(target.value);
  selectedProduct.value = products.value.find(p => p.id === productId) || null;
};

// Perbaiki fungsi handleQuantityChange dengan type safety
const handleQuantityChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  quantity.value = parseInt(target.value) || 1;
};

const addToCart = () => {
  if (!selectedProduct.value || quantity.value <= 0) {
    alert('Pilih produk dan jumlah yang valid');
    return;
  }
  
  cartItems.value.push({
    name: selectedProduct.value.name,
    price: sellingPrice.value || selectedProduct.value.price,
    quantity: quantity.value
  });
  
  // Reset selection
  selectedProduct.value = null;
  quantity.value = 1;
  sellingPrice.value = 0;
  const productSelect = document.getElementById('productName') as HTMLSelectElement;
  if (productSelect) productSelect.value = '';
};

// Perbaiki fungsi removeFromCart dengan type safety
const removeFromCart = (index: number) => {
  cartItems.value.splice(index, 1);
};

const handleSubmit = () => {
  // TODO: Implement transaction submission
  console.log('Form submitted:', formData.value);
};

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(value);
};

const products = ref([
  { id: 1, name: 'Produk A', price: 10000 },
  { id: 2, name: 'Produk B', price: 20000 },
]);
</script>