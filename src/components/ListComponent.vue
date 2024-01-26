<template>
  <div class="overflow-auto h-[calc(100vh-150px)]">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr class="rounded-t-lg">
        <th
            v-for="(col, i) in columnTitle"
            :key="i"
            scope="col"
            class="px-6 py-3"
            v-text="col" />
      </tr>
      </thead>
      <tbody>
      <tr v-for="data in list" :key="data?.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-gray-700"
          @click.prevent="openDetailsPage(data?.id)">
        <th scope="row"
            class="flex items-center gap-x-3 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <img
              class="size-6"
              :src="data?.image"
              :alt="data?.name">
          <p v-text="data?.name" />
        </th>
        <td
            class="px-6 py-4"
            v-text="data?.symbol" />
        <td
            class="px-6 py-4"
            v-text="data?.current_price" />
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue';

defineOptions({
  name: "ListComponent"
})

defineProps({
  list: { type: Array, required: true }
})

const columnTitle = ref(['CRYPTO', 'SYMBOL', 'CURRENT PRICE'])
const router = useRouter()

function openDetailsPage(id) {
  router.push({ name: 'DetailsPage', params: { id } })
}
</script>
