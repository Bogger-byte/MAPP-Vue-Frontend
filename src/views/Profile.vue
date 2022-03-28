<script setup>
import UserService from "../services/user.service";
import {getCurrentInstance, onMounted, ref} from "vue";
import {useUserStore} from "../stores/user.store";


const userData = ref(null);

const userStore = useUserStore();
const { proxy } = getCurrentInstance();

const userID = proxy.$route.meta?.userID;

onMounted(async () => {
  if (userID === 'me') {
    userData.value = userStore.data;
  } else {
    try {
      let response = await UserService.getData(userID);
      userData.value = response.data;
    } catch (error) {
      if (error.response.status === 404) {
        await proxy.$router.push({ name: "NotFound" });
      }
    }
  }
});
</script>

<template>
  <div class="surface-card p-2 border-round border-200 border-1">
    <div class="flex flex-row">
      <div>
        <div>username</div>
        <div>e-mail</div>
        <div>id</div>
      </div>
      <div v-if="userData" class="ml-3">
        <div>{{ userData.username }}</div>
        <div>{{ userData.email }}</div>
        <div>{{ userData.id }}</div>
      </div>
    </div>
    <div v-if="userData?.servers?.length" class="mt-2 flex flex-row">
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