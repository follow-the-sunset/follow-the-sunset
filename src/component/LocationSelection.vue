<template>
    <div class="location-selection">
        <div class="location-inputs">
            <select v-model="selectedLoc">
                <option v-for="loc in useSelectLocation().locationAvailable" :key="loc.name" :value="loc">{{ loc.name }}
                </option>
            </select>
            <button @click="updateLocation" class="btn"><FontAwesomeIcon :icon="faLocationDot" /></button>
        </div>
        <div v-if="selectedLoc" class="location-inputs">
            <input type="text" v-model="selectedLoc.latitude" placeholder="Latitude" />
            <input type="text" v-model="selectedLoc.longitude" placeholder="Longitude" />
        </div>
    </div>
</template>

<script setup lang="ts">

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useSelectLocation } from '@/composable/selectLocation';
import { useLocationStore } from '@/stores/location';
import { storeToRefs } from 'pinia';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const selectedLoc = storeToRefs(useLocationStore()).location;

const updateLocation = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(

            (position) => {
                selectedLoc.value = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );
    }
}

</script>

<style scoped>
.location-selection {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 16px;
}

.location-inputs {
    display: flex;
    gap: 8px;
}

.btn {
    height: 100%;
}
</style>