<script setup lang="ts">
import { RouterLink } from 'vue-router';
function toogleMenu() {
  document.body.classList.toggle('sidebar-enable');
  if(document.body.classList.contains('sidebar-enable')) {
    if(document.body.style.width >= '992px') {
      document.body.setAttribute('data-sidebar-size', 'sm');
    } else {
      document.body.setAttribute('data-sidebar-size', 'lg');
    }
  } else {
    document.body.setAttribute('data-sidebar-size', 'lg');
  }
}
</script>

<template>
  <header id="page-topbar" class="isvertical-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <RouterLink to="/" class="logo logo-dark">
            <!-- <span class="logo-sm">
              <img src="/assets/images/logo.svg" alt="" height="26" />
            </span>
            <span class="logo-lg">
              <img src="/assets/images/logo.svg" alt="" height="26" />
            </span> -->
          </RouterLink>

          <RouterLink to="/" class="logo logo-light">
            <span class="logo-lg">
              <!-- <img src="/assets/images/logo-light.png" alt="" height="30" /> -->
            </span>
            <span class="logo-sm">
              <img src="/assets/images/logo-light-sm.png" alt="" height="26" />
            </span>
          </RouterLink>
        </div>

        <button type="button" class="btn btn-sm px-3 font-size-24 header-item waves-effect vertical-menu-btn" @click="toogleMenu">
          <i class="bx bx-menu align-middle"></i>
        </button>

        <!-- start page title -->
        <div class="page-title-box align-self-center d-none d-md-block">
          <h4 class="page-title mb-0">{{ $route.meta.title }}</h4>
        </div>
        <!-- end page title -->
      </div>

      <div class="d-flex">
        <div class="dropdown d-inline-block">
          <button type="button" class="btn header-item noti-icon">
            <i class="bx bx-power-off align-middle icon-sm"></i>
          </button>
        </div>

        <div class="dropdown d-inline-block">
          <button type="button" class="btn header-item user text-start d-flex align-items-center"
            id="page-header-user-dropdown-v">
            <img class="rounded-circle header-profile-user" src="/assets/images/users/avatar-3.jpg"
              alt="Header Avatar" />
            <span class="d-none d-xl-inline-block ms-2 fw-medium font-size-15">Martin Gurley</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
