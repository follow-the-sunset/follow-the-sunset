import type { GpsLocation } from "@/types/gpsLocation"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useLocationStore = defineStore('location', () => {
  const location = ref<GpsLocation | null>(null)

  const setLocation = (newLocation: GpsLocation) => {
    location.value = newLocation
  }

  const getLocation = () => { return location.value }

  return { getLocation, setLocation }
});