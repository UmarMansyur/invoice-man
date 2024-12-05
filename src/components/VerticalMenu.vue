<script setup lang="ts">
import TheSidebar from './TheSidebar.vue';
function toogleMenu() {
  document.body.classList.toggle('sidebar-enable');
  if(document.body.classList.contains('sidebar-enable')) {
    document.body.setAttribute('data-sidebar-size', 'sm');
  } else {
    document.body.setAttribute('data-sidebar-size', 'lg');
  }
}
</script>

<template>
  <div class="vertical-menu">
    <!-- LOGO -->
    <div class="navbar-brand-box">
      <RouterLink to="/" class="logo logo-dark">
        <span class="logo-sm">
          <img src="/assets/images/logo.png" alt="" height="26" />
        </span>
        <span class="logo-lg">
          <div class="d-flex align-items-center">
            <img src="/assets/images/logo.png" alt="" height="28" /> 
            <span class="font-weight-bold text-dark font-size-24" style="margin-left: 10px; font-family: 'Poppins', sans-serif; font-weight: 600 !important;">IMAN</span>
          </div>
        </span>
      </RouterLink>

      <RouterLink to="/" class="logo logo-light">
        <span class="logo-lg">
          <img src="/assets/images/logo-light.png" alt="" height="30" />
        </span>
        <span class="logo-sm">
          <img src="/assets/images/logo-light-sm.png" alt="" height="26" />
        </span>
      </RouterLink>
    </div>

    <button
      type="button"
      class="btn btn-sm px-3 font-size-24 header-item waves-effect vertical-menu-btn" @click="toogleMenu"
    >
      <i class="bx bx-menu align-middle"></i>
    </button>
    <TheSidebar/>
  </div>
</template>

