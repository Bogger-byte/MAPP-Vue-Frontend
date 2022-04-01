<script setup>
import AccountPopup from "./AccountPopup.vue";

import {ref} from "vue";

const items = ref([
    {
      label: 'Home',
      icon: 'pi pi-home',
      to: { name: 'Home' }
    },
    {
      label: 'Documentation',
      icon: 'pi pi-info-circle',
      to: { name: 'Docs' }
    },
    {
      label: 'Servers Monitor',
      icon: 'pi pi-desktop',
      to: { name: 'ServersMonitor' }
    }
]);
</script>

<template>
  <Menubar :model="items" style="height: 4em; margin-bottom: 10px">
    <template #start>
      <router-link :to="{ name: 'Home' }"
                   class="ml-2 mr-4 no-underline font-bold text-xl text-blue-500">
        [mApp]
      </router-link>
    </template>
    <template #item="{ item }">
      <router-link :to="item.to" custom v-slot="{ href, navigate, isActive, isExactActive }">
        <a :href="href" @click="navigate"
           :class="{'border-1 text-blue-500 border-blue-500 bg-blue-50 hover:bg-white': isExactActive, 'hover:bg-gray-100': !isExactActive}"
           class="mr-1 border-round border-200 no-underline text-700"
           style="padding: 0.75em 1em">
          {{ item.label }}
        </a>
      </router-link>
    </template>
    <template #end>
      <AccountPopup/>
    </template>
  </Menubar>
</template>


<style scoped>

</style>