<template>
    <div class="sun-informations">
        <CardSunInformation :value="sunData.astronomicalDawn">
            <FontAwesomeIcon :icon="faStar" />
        </CardSunInformation>
        <CardSunInformation :value="sunData.nauticalDawn">
            <FontAwesomeIcon :icon="faAnchor" />
        </CardSunInformation>
        <CardSunInformation :value="sunData.civilDawn">
            <FontAwesomeIcon :icon="faBuilding" />
        </CardSunInformation>
        <CardSunInformation :value="sunData.sunriseStart">
            <FontAwesomeIcon :icon="faSun" />
            <FontAwesomeIcon :icon="faUpLong" />
        </CardSunInformation>
        <CardSunInformation :value="sunData.solarNoon">
            <FontAwesomeIcon :icon="faSun" />
        </CardSunInformation>
        <CardSunInformation :value="sunData.sunsetStart">
            <FontAwesomeIcon :icon="faSun" />
            <FontAwesomeIcon :icon="faDownLong" />
        </CardSunInformation>
        <CardSunInformation :value="sunData.civilDusk">
            <FontAwesomeIcon :icon="faBuilding" />
        </CardSunInformation>
        <CardSunInformation :value="sunData.nauticalDusk">
            <FontAwesomeIcon :icon="faAnchor" />
        </CardSunInformation>
        <CardSunInformation :value="sunData.astronomicalDusk">
            <FontAwesomeIcon :icon="faStar" />
        </CardSunInformation>
    </div>
</template>

<script setup lang="ts">
import CardSunInformation from '@/component/CardSunInformation.vue';
import { sunPositionService } from '@/services/sunPositionService.ts';
import { useLocationStore } from '@/stores/location';
import type { LocatedSunInformation } from '@/types/locatedSunInformation';
import { faAnchor, faBuilding, faDownLong, faStar, faSun, faUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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