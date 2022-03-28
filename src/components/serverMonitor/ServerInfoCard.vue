<script setup>
const { serverInfo } = defineProps({
  serverInfo: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <Card>
    <template #title>
      <router-link :to="{ name: 'Server', params: { serverID: serverInfo.id } }" class="font-bold text-blue-500 no-underline">
        {{ serverInfo.name }}
        <i class="pi pi-external-link font-bold text-lg"></i>
      </router-link>
    </template>
    <template #subtitle>
      {{ serverInfo.id }}
    </template>
    <template #content>
      {{ serverInfo.host }}
    </template>
    <template #footer>
      Players online: {{ serverInfo.players_online }}
    </template>
  </Card>
</template>


<style scoped>

</style>