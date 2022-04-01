<script setup>
import {getCurrentInstance, onMounted, ref} from "vue";
import {useUserStore} from "../stores/user.store";

const { toRoute } = defineProps({
  toRoute: {
    default: { name: 'User', params: { id: 'me' } }
  }
})

const username = ref('');
const password = ref('');
const checked = ref(false);
const authError = ref(false);

const userStore = useUserStore();
const { proxy } = getCurrentInstance();

onMounted(() => {
  if (userStore.isLoggedIn) {
    proxy.$router.push(toRoute);
  }
});

async function login() {
  try {
    await userStore.login(username.value, password.value);
    authError.value = false;
    await proxy.$router.push({ name: 'User', params: { id: 'me' } });
  } catch (error) {
    if (error.response.status < 500) {
      authError.value = true;
    }
  }
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
        <div class="field">
          <label for="username" class="block text-700 text-md mb-1">
            Username
          </label>
          <InputText v-model="username" id="username" type="text"
                     aria-describedby="username-help"
                     class="w-full"
                     :class="{'p-invalid': authError}"/>
          <small id="username-help" class="p-error">
            Username or password are not valid.
          </small>
        </div>
        <div class="field">
          <label for="password" class="block text-700 text-md mt-3 mb-1">
            Password
          </label>
          <InputText v-model="password" id="password" type="password"
                     aria-describedby="password-help"
                     class="w-full"
                     :class="{'p-invalid': authError}" />
          <small id="password-help" class="p-error">
            Username or password are not valid.
          </small>
        </div>
      </div>
      <div class="mt-3 flex align-items-center justify-content-between text-700">
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
      <div class="mt-2">
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