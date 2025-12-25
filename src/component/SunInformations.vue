<template>
    <div class="sun-informations">
        <CardSunInformation :value="sunData.astronomicalDawn" />
        <CardSunInformation :value="sunData.nauticalDawn" />
        <CardSunInformation :value="sunData.civilDawn" />
        <CardSunInformation :value="sunData.sunriseStart" />
        <CardSunInformation :value="sunData.solarNoon" />
        <CardSunInformation :value="sunData.sunsetEnd" />
        <CardSunInformation :value="sunData.civilDusk" />
        <CardSunInformation :value="sunData.nauticalDusk" />
        <CardSunInformation :value="sunData.astronomicalDusk" />
    </div>
</template>

<script setup lang="ts">
import CardSunInformation from '@/component/CardSunInformation.vue';
import { sunPositionService } from '@/services/sunPositionService.ts';
import { useLocationStore } from '@/stores/location';
import type { LocatedSunInformation } from '@/types/locatedSunInformation';
import dayjs from 'dayjs';
import { computed } from 'vue';

const locationStore = useLocationStore();

const sunData = computed(() => {
    const value: LocatedSunInformation = sunPositionService()
        .getSunPositionInformation(
            locationStore.getLocation()!.latitude,
            locationStore.getLocation()!.longitude,
            dayjs().toDate());
    console.log(value);
    return value;
});

</script>

<style scoped>
.sun-informations {
    padding: 16px;
    width: 50%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 10px;
}
</style>