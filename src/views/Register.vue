<script setup>
import {getCurrentInstance, ref} from "vue";
import UserService from "../services/user.service";
import {useUserStore} from "../stores/user.store";

const userStore = useUserStore();
const { proxy } = getCurrentInstance();

const username = ref("");
const password = ref("");
const email = ref("");
const checked = ref(false);

async function register() {
  await UserService.register(username.value, password.value, email.value);
  await userStore.login(username.value, password.value);
  await proxy.$router.push({ name: "Login" });
}
</script>

<template>
  <div class="flex justify-content-center mt-8">
    <div class="surface-card p-4 border-round border-200 border-1 w-full lg:w-6" style="max-width: 440px">
      <div class="text-center">
        <div class="text-800 text-3xl font-bold mb-2">Registration</div>
      </div>

      <div class="mt-2">
        <label for="username" class="block text-700 text-md mb-1">Username</label>
        <InputText v-model="username" id="username" type="text" class="w-full mb-3"/>

        <label for="password" class="block text-700 text-md mb-1">Password</label>
        <InputText v-model="password" id="password" type="password" class="w-full mb-3"/>

        <label for="email" class="block text-700 text-md mb-1">Email</label>
        <InputText v-model="email" id="email" type="text" class="w-full mb-3"/>

        <div class="flex align-items-center justify-content-between mb-4 text-700">
          <div class="flex align-items-center">
            <Checkbox id="remember-me" :binary="true" v-model="checked" class="mr-2"></Checkbox>
            <label for="remember-me">I agree with the terms of policy</label>
          </div>
        </div>
        <Button @click="register" label="Sign Up" icon="pi pi-user" class="w-full"></Button>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>