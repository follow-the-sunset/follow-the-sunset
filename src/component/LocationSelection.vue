<template>
    <div class="location-selection">
        <div class="location-search">
            <div class="autocomplete-search-box">
                <input type="input" name="search" placeholder="Search" aria-label="Search" v-model="locationName" class="search-box" />
                <ul v-if="search.length > 0" class="search-result">
                    <li v-for="loc in search" :key="loc.city"
                        @click="selectedLoc = { latitude: loc.lat, longitude: loc.lng }; locationName = ''">
                        {{ loc.city }}, {{ loc.country }}
                    </li>
                </ul>
            </div>
            <div>
                <button @click="updateLocation" class="btn">
                    <FontAwesomeIcon :icon="faLocationDot" />
                </button>
            </div>
        </div>
        <div v-if="selectedLoc" class="location-inputs">
            <input type="text" v-model="selectedLoc.latitude" placeholder="Latitude" class="location-input" />
            <input type="text" v-model="selectedLoc.longitude" placeholder="Longitude" class="location-input" />
        </div>
    </div>
</template>

<script setup lang="ts">

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useSelectLocation } from '@/composable/selectLocation';
import { useLocationStore } from '@/stores/location';
import { storeToRefs } from 'pinia';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { computed, ref } from 'vue';

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

const locationName = ref('');

const search = computed(() => {
    if (locationName.value !== '') {
        return useSelectLocation().locationAvailable.filter(loc =>
            loc.city.toLowerCase().includes(locationName.value.toLowerCase())).slice(0, 5);
    } else {
        return [];
    }
});

</script>

<style scoped>
.location-selection {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.location-inputs {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 8px;
    width: 100%;
}

.location-search {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px;
    padding: 8px;
    gap: 8px;
    text-align: center;
    width: 100%;
}

.btn {
    height: 64px;
    background: #3498db;
    border: none;
}

.autocomplete-search-box {
    width: 100%;
    box-shadow: 0 2px 10px 0px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    overflow: hidden;;
}

.autocomplete-search-box .search-box {
    width: 100%;
    height: 40px;
    padding: 30px 20px;
    outline: none;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 20px;
    text-align: center
}

.autocomplete-search-box .search-result {
    width: 100%;
    padding: 0;
    margin: 0;
}

.autocomplete-search-box .search-result li {
    width: 100%;
    list-style-type: none;
    padding: 10px 20px;
}

.autocomplete-search-box .search-result li:hover {
    background: #3498db;
    color: white;
}
</style>