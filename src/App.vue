<template>
  <h1>Follow the <i>Sunset</i></h1>
  <div class="part">
    <Line :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">

import SunCalc from 'suncalc3';
import dayjs from 'dayjs';
import { CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'vue-chartjs';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const location = {
  lat: 69.6489,
  lon: 18.95508 
}

const sunData = Array.from({ length: 48 }, (_, i) => {
  const time = dayjs().startOf('day').add(i * 30, 'minute').toDate();
  const pos = SunCalc.getPosition(time, location.lat, location.lon);
  return {
    time: time,
    sunPosition: pos
  }
});
const pos = SunCalc.getPosition(dayjs().toDate(), location.lat, location.lon);

console.log(pos);

const data = {
  labels: sunData.map(d => dayjs(d.time).format('HH:mm')),
  datasets: [
    {
      label: 'Sun Horizon Angle',
      backgroundColor: '#f87979',
      data: sunData.map(d => d.sunPosition.altitudeDegrees)
    }
  ]
}

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
        color: (ctx) => {console.log("ctx"); console.log(ctx); return ctx.tick.value === 0 ? 2 : 0;}
      },
      ticks: {
        callback: (ctx) => {console.log("ctx"); console.log(ctx); return ctx === 0 ? 'Horizon' : '';}
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
