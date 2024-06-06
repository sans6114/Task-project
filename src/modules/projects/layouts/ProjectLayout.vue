<template>
  <div class="flex flex-col">
    <!-- top menu(menu arriba) -->
    <TopMenu />

    <main class="flex flex-row">
      <!-- side menu  -->
      <SideMenu />

      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'

import TopMenu from '@/modules/common/components/TopMenu.vue'

import SideMenu from '../components/SideMenu.vue'
</script>
