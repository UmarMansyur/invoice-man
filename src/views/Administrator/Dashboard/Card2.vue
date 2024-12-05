<template>
  <div class="card">
    <div class="card-body">
      <div>
        <div class="d-flex align-items-center">
          <div class="avatar">
            <div class="avatar-title rounded bg-primary-subtle ">
              <i :class="icon" class="font-size-24 mb-0 text-primary"></i>
            </div>
          </div>

          <div class="flex-grow-1 ms-3">
            <h6 class="mb-0 font-size-15">{{ title }}</h6>
          </div>

        </div>

        <div>
          <h4 class="mt-4 pt-1 mb-0 font-size-22">{{ count }}</h4>
          <div class="d-flex mt-1 align-items-end overflow-hidden">
            <div class="flex-grow-1">
              <p class="text-muted mb-0 text-truncate">{{ description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  count: number;
  description: string;
  icon: string;
}>();
</script>