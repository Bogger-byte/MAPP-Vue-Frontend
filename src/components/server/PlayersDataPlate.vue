<script setup>
import {onMounted, ref} from "vue";
import {FilterMatchMode} from "primevue/api";

const { playersData } = defineProps({
  playersData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits([
  "clickOnPlayer"
]);

const filters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(() => {
  initFilters();
});

function initFilters() {
  filters.value = { 'global': { value: null, matchMode: FilterMatchMode.CONTAINS } };
}
</script>

<template>
  <div
      class="p-2 surface-card border-round border-1 border-200"
      style="width: 16em; max-height: 45em">
    <DataTable v-if="playersData.length"
               :value="playersData"
               responsiveLayout="scroll"
               v-model:filters="filters.value">
      <template #header>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText v-model="filters['global'].value" placeholder="player name" style="width: 12.5em; height: 2.6em"/>
        </span>
      </template>
      <Column field="name" :header="`Players online: ${playersData.length}`" class="p-1">
        <template #body="{ data }">
            <span
                @click="emit('clickOnPlayer', data)"
                class="cursor-pointer">
              {{ data.name }}
            </span>
        </template>
      </Column>
      <Column field="coordinates" align-frozen="left" class="p-1">
        <template #body="{ data }">
          <div class="text-sm">
            <div>
              x: <span class="bg-cyan-100 px-1 py-0 border-round">{{ data.coordinates.x }}</span>
            </div>
            <div>
              y: <span class="bg-yellow-100 px-1 py-0 border-round">{{ data.coordinates.y }}</span>
            </div>
            <div>
              z: <span class="bg-purple-100 px-1 py-0 border-round">{{ data.coordinates.z }}</span>
            </div>
          </div>
        </template>
      </Column>
    </DataTable>
    <div v-else class="py-2 text-center text-lg text-800">
      Server is empty
    </div>
  </div>
</template>

<style lang="sass" scoped>
::v-deep(.p-datatable)
  .p-datatable-header
    padding: 0.25rem
</style>