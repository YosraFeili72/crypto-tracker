<template>
  <div v-if="!isLoading">
    <input
        v-model="searchCrypto"
        @input="filterList"
        type="search"
        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
        focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search by name or symbol">
    <ListComponent
        class="mt-10"
        :list="filteredCryptoData"/>
  </div>

  <LoadingComponent v-else />

  <AlertComponent
      class="z-20"
      :title="AlertOption.data"
      :is-open="AlertOption.isAlert"
      :contents-list="AlertOption.dataList"
      :status="AlertOption.status"
      :timer="3000"
      @close="AlertOption.isAlert=false"/>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import axios from "axios";
import ListComponent from "@/components/ListComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";

const listOfCryptoData = ref([])
const AlertOption = reactive({
  isAlert: false,
  dataList: [],
  status: '',
  data: ''
})
const isLoading = ref(false)
const searchCrypto = ref('')
const searchResults = ref([])

onMounted(() => {
  isLoading.value = true
  getList()
})

function setAlerts (isAlert, status, data = '', dataList = []) {
  AlertOption.status = status
  AlertOption.data = data
  AlertOption.dataList = dataList
  AlertOption.isAlert = isAlert
}

const getList = async ()=>{
  await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      sparkline: false
    }
  }).then((response) => {
    listOfCryptoData.value = response.data
    isLoading.value = false
    filterList()
  }).catch((error) => {
    setAlerts(true, 'error', error.message);
  })
}

setInterval(()=>{
  getList()
}, 60000)

const filterList = () => {
  const searchTerm = searchCrypto.value.toLowerCase()
  searchResults.value = listOfCryptoData.value.filter(crypto => crypto.name.toLowerCase().includes(searchTerm) || crypto?.symbol.toLowerCase().includes(searchTerm))
}

const filteredCryptoData = computed(() => searchResults.value)

</script>