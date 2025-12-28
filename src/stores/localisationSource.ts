import type { City } from "@/types/city";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useLocationSourceStore = defineStore('localisationSource', () => {

    const source = ref<City[]>([]);

    const setSource = (newSource: City[]) => {
        source.value = newSource;
    }

    const getSource = () => { return source.value; }

    const sourceLoaded = computed(() => source.value.length > 0);

    return { getSource, setSource, sourceLoaded, source }

});