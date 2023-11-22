<script setup></script>

<template>
  <div class="bg-[#155e75] min-h-screen">
    <router-view :key="$route.path"></router-view>
  </div>
</template>
