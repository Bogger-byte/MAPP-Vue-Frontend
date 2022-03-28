<script setup>
import {getCurrentInstance, ref} from "vue";
import {useUserStore} from "../stores/user.store";

const userData = ref(null);

const userStore = useUserStore();
const { proxy } = getCurrentInstance();

userStore.$subscribe((mutation, state) => {
  userData.value = state.data;
});

function logout() {
  userStore.logout();
  proxy.$router.push({ name: 'Login' });
  hideMenu();
}

function login() {
  proxy.$router.push({ name: 'Login'});
  hideMenu();
}

function toggleMenu(event) {
  proxy.$refs.overlayPanel.toggle(event);
}

function hideMenu() {
  proxy.$refs.overlayPanel.hide();
}
</script>

<template>
  <div>
    <Button type="button" label="Account" icon="pi pi-user" @click="toggleMenu"
            aria:haspopup="true" aria-controls="overlay_panel"/>
    <OverlayPanel id="overlay_panel" ref="overlayPanel"
                  class="surface-card border-round md:shadow-3 text-center text-700"
                  style="width: 17.1em; max-height: 40em">
      <div v-if="userData">
        <div class="mt-1 text-2xl font-bold text-800">
          <router-link :to="{ name: 'Profile', params: { userID: 'me' } }"
                       class="no-underline text-blue-500 font-bold cursor-pointer"
                       @click="hideMenu">
            {{ userData.username }} <i class="pi pi-external-link font-bold"/>
          </router-link>
        </div>
        <div class="font-light text-sm text-600 mt-0">
          {{ userData.id }}
        </div>
        <div class="mt-2 surface-card p-2 border-round border-1 border-200">
          <DataTable v-if="userData.servers"
                     :value="userData.servers"
                     responsive-layout="scroll">
            <Column field="name" header="Linked servers" class="p-1">
              <template #body="{ data }">
                <router-link :to="{ name: 'Server', params: { serverID: data.id } }"
                             class="no-underline font-medium text-blue-500"
                             @click="hideMenu">
                  {{ data.name }}
                </router-link>
              </template>
            </Column>
          </DataTable>
          <div v-else>
            No linked servers for now
          </div>
        </div>
        <div class="mt-3">
          <Button @click="logout" label="Logout" icon="pi pi-sign-out" class="w-full"/>
        </div>
      </div>
      <div v-else>
        <div class="mt-1 text-2xl font-bold text-800">
          Anonymous
        </div>
        <div class="mt-1 text-600">
          You are not logged in
        </div>
        <div class="mt-3">
          <Button @click="login" label="Login" icon="pi pi-sign-in" class="w-full"/>
        </div>
        <div class=" mt-2">
          Don't have an account?
        </div>
        <div class=" mt-0 mb">
          <router-link :to="{ name: 'Register' }"
                       class="no-underline text-blue-500 font-medium cursor-pointer"
                       @click="hideMenu">
            Create one! <i class="pi pi-external-link font-medium text-sm"/>
          </router-link>
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>

<style lang="sass" scoped>
::v-deep(.p-datatable)
  .p-datatable-header
    padding: 0.25em
  .p-datatable-thead .p-column-header-content
    color: var(--surface-700)
    font-weight: bold
</style>