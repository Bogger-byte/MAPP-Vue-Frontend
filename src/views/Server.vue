<script setup>
import {useUserStore} from "../stores/user.store";
import ServerService from "../services/server.service";
import {ref, getCurrentInstance, onMounted, onUnmounted, onBeforeMount, h} from "vue";
import ServerInfoPlate from "../components/server/ServerInfoPlate.vue";
import PlayersDataPlate from "../components/server/PlayersDataPlate.vue";
import { LMap, LGridLayer, LTileLayer } from "@vue-leaflet/vue-leaflet";

const { id } = defineProps({
  id: {
    required: true
  }
})

const serverData = ref(null);
const playersData = ref([]);
const updatedRegions = ref([]);

const zoom = ref(5);
const url = ref(null);

const userStore = useUserStore();
const { proxy } = getCurrentInstance();


onBeforeMount(async () => {
  try {
    let response = await ServerService.getServer(id);
    serverData.value = response.data;

    url.value = "http://localhost:8080/api/server/" + id + "/regions/world/{x}/{z}"
  } catch (error) {
    if (error.response.status === 404) {
      await proxy.$router.push({ name: "NotFound" });
    }
  }
});

onMounted(async () => {
  await proxy.$connect();

  proxy.$socket.onopen = (_) => {
    proxy.$socket.sendObj({
      access_token: userStore.accessToken,
      channel: { name: "server_data", id }
    });
    console.log("Connected")
  }

  proxy.$socket.onmessage = (event) => {
    let data = JSON.parse(event.data);

    // handle servers info message income
    if (data?.message?.server_info) {
      serverData.value.is_enabled = data.message.server_info.is_enabled;
    }
    // handle players data message income
    if (data?.message?.players_data) {
      playersData.value = data.message.players_data;
    }
    // handle updated regions message income
    if (data?.message?.updated_regions) {
      updatedRegions.value = data.message.updated_regions;
    }
  }

  proxy.$socket.onclose = (_) => {
    playersData.value = [];
    updatedRegions.value = [];
    console.log("Disconnected");
  }
});

onUnmounted(async () => {
  await proxy.$disconnect();
});

function handleClickOnPlayer(playerData) {
  console.log(playerData.coordinates)
}
</script>

<template>
  <div class="relative" style="height: calc(100vh - 95px)">
    <div id="hud">
      <server-info-plate
          :server-data="serverData"
          class="absolute z-1 left-0 top-0"/>
      <players-data-plate
          :players-data="playersData"
          v-on:click-on-player="handleClickOnPlayer"
          class="absolute z-1 right-0 top-0"/>
      <div
          class="absolute z-1 left-0 bottom-0">
        Updated regions: {{ updatedRegions }}
      </div>
    </div>
<!--    <l-map id="map"-->
<!--           v-model:zoom="zoom"-->
<!--           :center="[47.41322, -1.219482]">-->
<!--      <l-tile-layer :url="url"/>-->
<!--    </l-map>-->
  </div>
</template>

<style scoped>

</style>