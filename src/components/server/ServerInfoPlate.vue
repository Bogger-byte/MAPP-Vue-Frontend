<script setup>
const { serverData } = defineProps({
  serverData: {
    type: Object
  }
});
</script>

<template>
  <div class="px-4 py-3 surface-card border-round border-1 border-200 text-center">
    <div v-if="serverData">
      <div class="my-0 font-bold text-lg text-800">
        <Badge :severity="serverData.is_enabled ? 'success' : 'warning'" style="margin-bottom: 2px"/>
        {{ serverData.name }}
      </div>
      <div class="my-1 text-sm text-500">
        {{ serverData.id }}
      </div>
      <div class="mt-1 flex justify-content-evenly text-900">
        <div>
          <div class="text-sm">host</div>
          {{ serverData.host }}
        </div>
        <div>
          <div class="text-sm">owner</div>
          <router-link :to="{ name: 'User', params: { id: serverData.owner.id } }"
                       class="no-underline text-blue-500 font-bold">
            {{ serverData.owner.username }} <i class="pi pi-external-link font-bold text-xs"/>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>