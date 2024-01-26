<template>
  <main
      class="p-5 max-w-[90rem] m-auto"
      v-bind="$attrs">
    <section>
      <RouterView />
    </section>
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'

defineOptions({
  name: "DefaultLayout"
})
</script>
<style>
body{
  background: #0f172a;
}
</style>