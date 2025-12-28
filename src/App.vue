<template>
  <div class="app">
    <h1>Follow the <i>Sunset</i></h1>
    <div class="part">
      <LocationSelection />
    </div>
    <div v-if="loaded">
      <SunInformations />
    </div>
    <div class="chart" v-if="loaded">
      <Line :data="data" :options="options" />
    </div>
  </div>
</template>

<script setup lang="ts">

import type { ChartOptions } from 'chart.js';
import { CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { Line } from 'vue-chartjs';
import LocationSelection from './component/LocationSelection.vue';
import SunInformations from './component/SunInformations.vue';
import { sunPositionService } from './services/sunPositionService';
import { useLocationSourceStore } from './stores/localisationSource';
import { useLocationStore } from './stores/location';
import type { City } from './types/city';

const state = ref<'loading' | 'idle' | 'error'>('loading');

onMounted(() => {
  fetch('/follow-the-sunset/cities.json')
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Echec du chargement du json')
    })
    .then(data => {
      storeToRefs(useLocationSourceStore()).source.value = data as City[];
      state.value = 'idle'
    })
    .catch(e => {
      console.error(e)
      state.value = 'error'
    })

});

const loaded = computed(() => {
  return useLocationStore().isLoaded();
});

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const sunData = computed(() => {
  const location = storeToRefs(useLocationStore()).location;
  return sunPositionService().getDailySunPositions(location.value!.latitude, location.value!.longitude, dayjs().toDate());
});

const data = computed(() => ({
  labels: sunData.value.map(d => dayjs(d.time).format('HH:mm')),
  datasets: [
    {
      label: 'Angle du soleil par rapport à l\'horizon (°)',
      backgroundColor: '#f87979',
      data: sunData.value.map(d => d.sunPosition.altitudeDegrees)
    }
  ]
}));

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      min: -90,
      max: 90,
      grid: {
        display: false
      }
    },
    y: {
      min: -90,
      max: 90,
      grid: {
        color: (ctx) => { return ctx.tick.value === 0 ? '#ff0000' : '#d3d3d3'; }
      },
      ticks: {
        callback: (ctx) => { return typeof ctx === 'number' && ctx === 0 ? 'H' : ''; }
      }
    }
  }
}

</script>

<style scoped>
.app {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.part {
  width: 80%;
  align-content: center;
}

.chart {
  height: 300px;
  width: 80%;
}
</style>
