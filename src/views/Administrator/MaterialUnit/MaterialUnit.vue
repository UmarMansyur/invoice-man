<script setup lang="ts">
import Home from '../../../components/Home.vue';
</script>

<template>
  <Home>
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Satuan Bahan Baku</h4>
        <p class="card-title-desc">
          Jika nama bahan baku dan satuan tidak ada, silahkan tambahkan datanya terlebih dahulu di halaman <RouterLink to="/admin/materials">Bahan Baku</RouterLink> dan <RouterLink to="/admin/units">Satuan</RouterLink>
        </p>
      </div>
      <div class="card-body">
        <form action="" class="row">
          <div class="col-md-3">
            <label for="name">Nama Bahan Baku</label>
            <select name="material" id="material" class="form-select">
              <option value="">Pilih Bahan Baku</option>
            </select>
          </div>
          <div class="col-md-3">
            <label for="name">Nama Satuan Utama</label>
            <input type="text" class="form-control" id="name" placeholder="Nama Satuan">
          </div>
          <div class="col-md-3">
            <label for="name">Nama Sub Satuan</label>
            <select name="unit" id="unit" class="form-select">
              <option value="">Pilih Satuan</option>
            </select>
          </div>
          <div class="col-md-3">
            <label for="name">Jumlah Sub Satuan</label>
            <input type="number" class="form-control" id="name" placeholder="Jumlah Satuan">
          </div>
          <div class="col-md-12 mt-3 d-flex justify-content-end gap-2">
            <button class="btn btn-light">Reset</button>
            <button class="btn btn-primary">Simpan</button>
          </div>
        </form>
        <hr>
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th class="text-center">No</th>
                <th>Nama Bahan Baku</th>
                <th class="text-center">Satuan Utama</th>
                <th class="text-center">Jumlah Sub Satuan</th>
                <th class="text-center">Sub Satuan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-center">1.</td>
                <td>Pita SKM</td>
                <td class="text-center">Pack</td>
                <td class="text-center">40</td>
                <td class="text-center">Lembar</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Home>
</template>