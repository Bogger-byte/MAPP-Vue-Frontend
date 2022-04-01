<script setup>
import UserService from "../../services/user.service";
import {getCurrentInstance} from "vue";
import {useUserStore} from "../../stores/user.store";

const { id } = defineProps({
  id: {
    type: String,
    default: 'me'
  }
})

const { proxy } = getCurrentInstance();
const userStore = useUserStore();

function confirmDelete() {
  proxy.$confirm.require({
    message: 'Do you want to delete your account?\n This operation is not cancellable!',
    header: 'Delete Confirmation',
    icon: 'pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      await UserService.deleteMe();
      userStore.logout();
      await proxy.$router.push({ name: 'Login' });
    },
    reject: () => {}
  });
}
</script>

<template>
  <div>
    <Button @click="confirmDelete"
            type="button" label="Delete account" icon="pi pi-times"
            class="p-button-danger"/>
  </div>
</template>

<style scoped>

</style>