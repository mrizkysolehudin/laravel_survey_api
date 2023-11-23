<template>
  <div v-if="notification.show"
    class="fixed left-0 right-0 z-50 mx-auto w-[300px] py-6 px-8 rounded text-white animate-fade-in-down font-bold"
    :class="[notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500']">
    {{ notification.message }}
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const notification = computed(() => store.state.notification);
</script>

<style></style>