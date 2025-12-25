<template>
    <CardSunInformation 
        :value="sunData" />
    <!-- <div class="sun-informations">
        <h1>Sun Informations</h1>
        <table>
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, key) in sunData" :key="key">
                    <td>{{ key }}</td>
                    <td>{{ value.value }}</td>
                </tr>
            </tbody>
        </table>
    </div> -->
</template>

<script setup lang="ts">
import { sunPositionService } from '@/services/sunPositionService.ts';
import { useLocationStore } from '@/stores/location';
import dayjs from 'dayjs';
import { computed } from 'vue';
import CardSunInformation from '@/component/CardSunInformation.vue';

const locationStore = useLocationStore();

const sunData = computed(() => {
    const value =  sunPositionService()
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
    padding: 20px;
    width: 50%;
}
</style>