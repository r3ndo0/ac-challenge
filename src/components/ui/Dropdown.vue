<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton>
      <slot name="trigger" />
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute z-10 right-0 mt-2 w-[144px] origin-top-right overflow-hidden rounded-md bg-white shadow-lg"
      >
        <MenuItem v-for="item in items" :key="item.label" v-slot="{ active }">
          <button
            :class="[
              'group flex w-full hover:bg-neutral-bg2 items-center px-3 py-2 text-sm text-left',
            ]"
            @click="item.onSelect"
          >
            <slot :name="item.label" :active="active">
              {{ item.label }}
            </slot>
          </button>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

export interface DropdownItem {
  label: string
  onSelect: () => void
}

const props = defineProps<{
  items: DropdownItem[]
}>()
</script>
