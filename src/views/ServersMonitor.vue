<script setup>
import {useUserStore} from "../stores/user.store";
import {ref, getCurrentInstance, onMounted, onUnmounted} from "vue";
import {FilterMatchMode} from "primevue/api";
import Loading from "vue3-loading-overlay";

const userStore = useUserStore();
const { proxy } = getCurrentInstance();

const isLoading = ref(true);
const serversInfo = ref([])
const filters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const hasPlayersChecked = ref(false);
const availableChecked = ref(false);

onMounted(async () => {
  initFilters();

  await proxy.$connect();

  proxy.$socket.onopen = (_) => {
    proxy.$socket.sendObj({
      access_token: userStore.accessToken,
      channel: { name: "servers_info", id: null }
    });
    console.log("Connected");
  }

  proxy.$socket.onmessage = (event) => {
    let data = JSON.parse(event.data);
    serversInfo.value = data?.message?.queue ? data.message.queue : serversInfo.value;
    isLoading.value = false;
  }

  proxy.$socket.onclose = (_) => {
    serversInfo.value = [];
    isLoading.value = true;
    console.log("Disconnected");
  }
});

onUnmounted(async () => {
  await proxy.$disconnect();
});

function initFilters() {
  filters.value = { 'global': { value: null, matchMode: FilterMatchMode.CONTAINS } };
}

function viewServer(id) {
  proxy.$router.push({ name: 'Server', params: { serverID: id } })
}
</script>

<template>
  <div class="surface-card p-2 border-round border-200 border-1"
       style="max-width: 50em">
    <DataTable :value="serversInfo" :loading="isLoading" loading-icon="pi pi-spin pi-spinner">
      <template #header>
        <div class="flex flex-row align-items-end">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Name / Host" style="height: 2.6em"/>
          </span>
          <span class="mb-1 flex align-items-center" style="margin-left: auto">
            <Checkbox id="has-players" :binary="true" v-model="hasPlayersChecked" class="mr-2"/>
            <label for="has-players">
              has players
            </label>
          </span>
          <span class="mx-3 mb-1 flex align-items-center">
            <Checkbox id="available" :binary="true" v-model="availableChecked" class="mr-2"/>
            <label for="available">
              available to me
            </label>
          </span>
        </div>
      </template>
      <Column field="name" header="Name"
              class="py-1 px-2">
        <template #body="{ data }">
          <div class="font-bold text-lg">
            {{ data.name }}
          </div>
          <div class="mt-1">
            online: {{ data.players_online }}
          </div>
        </template>
      </Column>
      <Column field="host" header="Host"
              class="py-1 px-2">
        <template #body="{ data }">
          <div>
            <Tag :severity="data.is_enabled ? 'success' : 'warning'">
              {{ data.is_enabled ? 'enabled' : 'disabled' }}
            </Tag>
          </div>
          <div class="mt-1">
            {{ data.host }}
          </div>
        </template>
      </Column>
      <Column header="Description"
              class="py-1 px-2">
        <template #body="{ data }">
          <div class="text-600 text-sm">
            {{ data.id }}
          </div>
          <div>
            Server's owner hasn't set server description
          </div>
        </template>
      </Column>
      <Column class="py-1 px-2">
        <template #body="{ data }">
          <Button v-if="data.available || true" @click="viewServer(data.id)"
                  type="button" label="View" icon="pi pi-chevron-right" icon-pos="right"
                  class="p-button-sm"/>
          <Button v-else
                  type="button" icon="pi pi-lock"
                  class="p-button-secondary p-button-sm"/>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style lang="sass" scoped>
::v-deep(.p-datatable)
  .p-datatable-header
    padding: 0.25rem
</style>