<script setup>
import UserTabs from "../components/user/UserTabs.vue"
import {getCurrentInstance, onBeforeMount, onMounted} from "vue";
import {useUserStore} from "../stores/user.store";

const { id } = defineProps({
  id: {
    type: String,
    default: 'me'
  }
});

const { proxy } = getCurrentInstance();

onBeforeMount(async () => {
  const userStore = useUserStore();
  if (id === await userStore.getData?.id) {
    await proxy.$router.replace({ name: 'User', params: { id: 'me' } });
  }
});

onMounted(() => {
  proxy.$router.replace({ name: 'UserOverview', params: { id: 'me' } })
});
</script>

<template>
  <div class="surface-card p-2 border-round border-200 border-1">
    <UserTabs :id="id"/>
    <div class="ml-2">
      <router-view :key="$route.path"/>
    </div>
  </div>
</template>

<style scoped>

</style>