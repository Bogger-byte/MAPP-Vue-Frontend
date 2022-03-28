<script setup>
import {getCurrentInstance, onMounted, ref} from "vue";
import {useUserStore} from "../stores/user.store";

const username = ref('');
const password = ref('');
const checked = ref(false);

const userStore = useUserStore();
const { proxy } = getCurrentInstance();

const toRoute = proxy.$route.meta?.toRoute;

onMounted(() => {
  if (userStore.isLoggedIn) {
    proxy.$router.push(toRoute);
  }
});

async function login() {
  await userStore.login(username.value, password.value);
  await proxy.$router.push({ name: 'Profile', params: { userID: 'me' } });
}
</script>

<template>
  <div class="flex justify-content-center mt-8">
    <div class="surface-card p-4 border-round border-200 border-1 w-full lg:w-6" style="max-width: 440px">
      <div class="text-center">
        <div class="text-800 text-3xl font-bold mb-1">
          Welcome back!
        </div>
        <span class="text-700 line-height-3">
          Don't have an account?
        </span>
        <router-link :to="{ name: 'Register' }" class="ml-1 font-medium no-underline text-blue-500 cursor-pointer">
          Create one! <i class="pi pi-external-link text-sm"></i>
        </router-link>
      </div>

      <div class="mt-3">
        <label for="username" class="block text-700 text-md mb-1">
          Username
        </label>
        <InputText v-model="username" id="username" type="text" class="w-full mb-3" />

        <label for="password" class="block text-700 text-md mb-1">
          Password
        </label>
        <InputText v-model="password" id="password" type="password" class="w-full mb-3" />
      </div>
      <div class="flex align-items-center justify-content-between text-700">
        <div class="flex align-items-center">
          <Checkbox id="remember-me" :binary="true" v-model="checked" class="mr-2"/>
          <label for="remember-me">
            Remember me
          </label>
        </div>
        <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
          Forgot password? <i class="pi pi-external-link font-medium text-sm"></i>
        </a>
      </div>
      <div class="mt-4">
        <Button @click="login" label="Sign In" icon="pi pi-user" class="w-full"/>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
::v-deep(.p-datatable)
  .p-datatable-header
    padding: 0.25rem
</style>