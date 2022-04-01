<script setup>
import {onMounted, ref} from "vue";

const { id } = defineProps({
  id: {
    type: String,
    required: true
  }
});

const active = ref(1);
const items = ref([]);

onMounted(() => {
  items.value = [
    {
      label: 'Overview',
      icon: 'pi pi-fw pi-user',
      to: { path: `/users/${id}` }
    },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      to: { path: `/users/${id}/settings` }
    }
  ];
});
</script>

<template>
  <TabMenu :model="items" :active-index="1" class="mx-2 mb-2"/>
</template>

<style lang="sass" scoped>
:deep(.p-tabmenu-nav) .p-tabmenuitem
  .p-menuitem-link:hover
    border: solid var(--surface-300) !important
    border-width: 0 0 3px 0 !important

  &.p-highlight .p-menuitem-link:hover
    border: solid #2c82d5 !important
    border-width: 0 0 3px 0 !important

  .p-menuitem-link
    padding: 1em 0.7em 0.7em 0.6em !important
    border-bottom-width: 1px

  .p-menuitem-text, .p-menuitem-icon
    font-weight: normal
    font-size: 0.9em
    color: var(--surface-700)

:deep(.p-tabmenu-nav)
  border-bottom-width: 1px !important

  .p-highlight .p-menuitem-link
    border-bottom-width: 3px !important
    background-color: #e5f3ff !important

  .p-highlight .p-menuitem-link .p-menuitem-text
    font-weight: 600 !important

  .p-highlight .p-menuitem-link .p-menuitem-icon
    font-weight: 600 !important
</style>