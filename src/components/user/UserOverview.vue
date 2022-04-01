<script setup>
import {useUserStore} from "../../stores/user.store";
import {onMounted, ref} from "vue";
import UserService from "../../services/user.service";

const { id } = defineProps({
  id: {
    type: String,
    default: 'me'
  }
})

const userData = ref(null);

const userStore = useUserStore();

userStore.$subscribe((mutation, state) => {
  userData.value = state.data;
});

onMounted(async () => {
  if (id === 'me') {
    userData.value = await userStore.getData;
    return;
  }
  try {
    let response = await UserService.getData(id);
    userData.value = response.data;
  } catch (error) {
    if (error.response.status === 404) {
      await proxy.$router.push({ name: "NotFound" });
    }
  }
});
</script>

<template>
  <div v-if="userData" class="ml-2">
    <div class="font-bold text-3xl text-800">
      {{ userData.username }}
    </div>
    <div class="text-xs text-600">
      {{ userData.id }}
    </div>
    <div class="mt-0 text-700">
      {{ userData.email }}
    </div>
  </div>
  <div class="mt-3">
    <div v-if="userData?.servers?.length"
         class="flex flex-row">
      <div v-for="serverData in userData.servers"
           :key="serverData.id"
           class="mr-2 surface-card p-2 border-round border-200 border-1"
           style="width: 20em">
        <div class="text-center text-lg">
          {{ serverData.name }}
        </div>
        <div class="text-center text-sm">
          {{ serverData.id }}
        </div>
        <div class="flex flex-row mt-2">
          <div>
            <div>host</div>
            <div>e-mail</div>
          </div>
          <div class="ml-3">
            <div>{{ serverData.host }}</div>
            <div>{{ serverData.email }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      No servers to view there
    </div>
  </div>
</template>

<style scoped>

</style>