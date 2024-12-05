<template>
  <div id="layout-wrapper">
    <Header/>
    <VerticalMenu/>
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid mb-4"></div>
        <slot></slot>
      </div>
      <!-- End Page-content -->

      <footer class="footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">2024 © Ustas Dev</div>
            <div class="col-sm-6">
              <div class="text-sm-end d-none d-sm-block">
                 PT. Ustad Dev
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script lang="ts">
declare const MetisMenu: any;
</script>
<script setup lang="ts">
import Header from './Header.vue';
import { onMounted } from 'vue';
import VerticalMenu from './VerticalMenu.vue';


onMounted(()=> {
  new MetisMenu('#side-menu');
})
</script>