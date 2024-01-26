<template>
  <div class="relative" v-if="!isLoading">
    <div
        class="flex items-center gap-x-3 md:max-w-sm max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow mt-10
      dark:bg-gray-800 dark:border-gray-700">
      <img :src="detailsData?.image?.thumb" :alt="detailsData.name">
      <h3 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" v-text="detailsData?.name" />
      <p class="text-gray-900 font-medium text-xl dark:text-white" v-text="`(${detailsData?.symbol})`" />
    </div>
    <div
        class="flex items-center gap-x-3 max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-200
       dark:border-gray-700 mt-10 max-h-full h-full !h-[calc(100vh-250px)]">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
  <LoadingComponent v-else />
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'vue-chartjs'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
import { ref, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import LoadingComponent from "@/components/LoadingComponent.vue";
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale)

defineOptions({
  name: "DetailsPage"
})

const route = useRoute()
const detailsData = ref([])
const AlertOption = reactive({
  isAlert: false,
  dataList: [],
  status: '',
  data: ''
})
const isLoading = ref(false)

const chartData = ref({
  labels: [],
  datasets: [{
    label: 'Market Cap',
    backgroundColor: '#f87979',
    data: []
  }]
});
const chartOptions = reactive(
    {
      responsive: true,
      maintainAspectRatio: false
    }
)


onMounted(async () => {
  isLoading.value = true
  await getDetails()
})

const getDetails = async () => {
  const coinId = route.params.id;
  await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
      .then((response) => {
        detailsData.value = response.data;
        updateChartData(Object.keys(response.data.market_data.market_cap), Object.values(response.data.market_data.market_cap));
        isLoading.value = false
      })
      .catch((error) => {
        setAlerts(true, 'error', error.message);
      });
};

const updateChartData = (newLabels, newDataPoints) => {
  if (chartData.value && chartData.value.datasets) {
    chartData.value = {
      labels: newLabels,
      datasets: [
        {
          label: 'Market Cap',
          backgroundColor: '#f87979',
          data: newDataPoints
        },
      ],
    };
  }
};

function setAlerts(isAlert, status, data = '', dataList = []) {
  AlertOption.status = status
  AlertOption.data = data
  AlertOption.dataList = dataList
  AlertOption.isAlert = isAlert
}
</script>
