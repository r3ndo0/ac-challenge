<script setup lang="ts"></script>

<template>
  <main class="flex flex-col items-center gap-6 justify-center h-screen">
    <span
      class="hidden md:inline-block text-neutral-fg1 py-2 px-3 font-semibold bg-neutral-bg2 rounded-sm"
    >
      Arvancloud Challenge
    </span>
    <router-link class="p-3 rounded-md bg-primary-bg2 text-white w-32 text-center" to="/login"
      >Login</router-link
    >
    <router-link class="p-3 rounded-md bg-primary-bg2 text-white w-32 text-center" to="/register"
      >Register</router-link
    >
  </main>
</template>
