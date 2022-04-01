<script setup>
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

function clickOnDownload() {
  window.open('https://github.com/BoggerByte/MAPP-Minecraft-plugin');
}

function clickOnDocs() {
  proxy.$router.push({ name: 'Docs' });
}
</script>

<template>
  <div class="text-center">
    <h1 class="mt-5 mb-0 font-bold text-800 text-7xl">
      mApp
    </h1>
    <p class="mt-2 mb-0 text-2xl text-700">
      Minecraft plugin for server mapping
    </p>
    <p class="mt-2 mb-4 text-lg text-700">
      You can view players on interactive server's map <br>
      and do a lot of another stuff
    </p>
    <div class="flex flex-row justify-content-center">
      <div class="flex flex-column">
        <Button @click="clickOnDownload"
                type="button" label="Download" icon="pi pi-download" icon-pos="left"
                class="h-3rem"/>
        <div class="mt-1 text-sm text-500">
          Spigot / Bukkit only
        </div>
      </div>
      <Button @click="clickOnDocs"
              type="button" label="Documentation"
              class="ml-3 p-button-outlined h-3rem"/>
    </div>
  </div>
</template>

<style scoped>

</style>