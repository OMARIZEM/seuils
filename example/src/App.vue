<script setup lang="ts">

import { getCurrentInstance, onMounted } from "vue"

const app = getCurrentInstance()

if (app) {
  app.appContext.config.globalProperties.$breakpoints.watch((state) => {
    console.log(state)
  })
}

</script>

<template>
  <main>
    <div class="wrapper">current name: {{ $breakpoints.name }}</div>
    <div class="wrapper">current xs: {{ $breakpoints.xs }}</div>
    <div class="wrapper">current sm: {{ $breakpoints.sm }}</div>
    <div class="wrapper">current sm and down: {{ $breakpoints.smAndDown }}</div>
    <div class="wrapper">current sm and up: {{ $breakpoints.smAndUp }}</div>
    <div class="wrapper">current md: {{ $breakpoints.md }}</div>
    <div class="wrapper">current md and down: {{ $breakpoints.mdAndDown }}</div>
    <div class="wrapper">current md and up: {{ $breakpoints.mdAndUp }}</div>
    <div class="wrapper">current lg: {{ $breakpoints.lg }}</div>
    <div class="wrapper">current lg and down: {{ $breakpoints.lgAndDown }}</div>
    <div class="wrapper">current lg and up: {{ $breakpoints.lgAndUp }}</div>
    <div class="wrapper">current xl: {{ $breakpoints.xl }}</div>
  </main>
</template>

<style scoped>

</style>
