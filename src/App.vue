<template>
  <v-app>
    <div class="h-100 w-100 d-flex flex-column">
      <NavBar class="w-100" />
      <v-container fluid class="w-100 h-100">
        <router-view />
      </v-container>
      <Footer class="w-100 mt-auto mb-0" />
    </div>
  </v-app>
</template>

<script setup>
  import NavBar from '@/components/NavBar.vue'
  import Footer from '@/components/Footer.vue'
</script>

<style>
  @import './assets/css/main.css';
</style>
