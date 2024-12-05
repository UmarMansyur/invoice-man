<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <div>
          <h6 class="font-size-15">{{ title }}</h6>
          <h4 class="mt-3 pt-1 mb-0 font-size-22">{{ value }}</h4>
        </div>
        <div class="">
          <div class="avatar">
            <div class="avatar-title rounded" :class="bgColor ? `bg-${bgColor}` : 'bg-primary-subtle'">
              <i :class="icon + ' ' + (textColor ? `text-${textColor}` : 'text-primary')" class="font-size-24 mb-0"></i>
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
  icon: string;
  value: any;
  bgColor?: string;
  textColor?: string;
}>();
</script>