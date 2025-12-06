<template>
  <h1>Follow the <i>Sunset</i></h1>
  <div class="part">
    <select v-model="selectedLoc">
      <option v-for="loc in useSelectLocation().locationAvailable" :key="loc.name" :value="loc">{{ loc.name }}</option>
  </select>
  </div>
  <div v-if="loaded">
    <SunInformations />
  </div>
  <div class="part" v-if="loaded">
    <Line :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">

import dayjs from 'dayjs';
import { CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'vue-chartjs';
import { computed, ref, type Ref } from 'vue';
import { useSelectLocation } from './composable/selectLocation';
import type { GpsLocation } from './model/gpsLocation';
import { useLocationStore } from './stores/location';
import { sunPositionService } from './services/sunPositionService';
import SunInformations from './component/SunInformations.vue';

const selectedLoc: Ref<GpsLocation | null> = ref(null);
const loaded = computed(() => {
  if (selectedLoc.value !== null) {
    useLocationStore().setLocation({ latitude: selectedLoc.value.latitude, longitude: selectedLoc.value.longitude });
  }
  return selectedLoc.value !== null;
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
  return sunPositionService().getDailySunPositions(selectedLoc.value!.latitude, selectedLoc.value!.longitude, dayjs().toDate());
});

const data = computed(() => ({
  labels: sunData.value.map(d => dayjs(d.time).format('HH:mm')),
  datasets: [
    {
      label: 'Sun Horizon Angle',
      backgroundColor: '#f87979',
      data: sunData.value.map(d => d.sunPosition.altitudeDegrees)
    }
  ]
}));

const options = {
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
        color: (ctx: { tick: { value: number; }; }) => { return ctx.tick.value === 0 ? 2 : 0; }
      },
      ticks: {
        callback: (ctx: number) => { return ctx === 0 ? 'Horizon' : ''; }
      }
    }
  }
}

</script>

<style scoped>
.part {
  width: 50%;
  align-content: center;
}
</style>
