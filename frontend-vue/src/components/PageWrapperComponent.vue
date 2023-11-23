<template>
  <header class="shadow bg-[#a5f3fc] ">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 v-if="title" class="text-3xl font-bold text-gray-900 pb-3">{{ title }}</h1>
      <slot name="header"></slot>
    </div>
  </header>
  <main class="bg-[#a5f3fc]">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 sm:px-0">
        <slot></slot>
      </div>
    </div>
  </main>
</template>

<script setup>
defineProps({
  title: String
});
</script>

<style></style>
