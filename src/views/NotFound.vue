<script setup>
const { message } = defineProps({
  message: {
    type: String,
    default: "Page not found"
  }
});
</script>

<template>
  <div class="flex justify-content-center">
    <h1>404 {{ message }}</h1>
  </div>
</template>

<style scoped>

</style>