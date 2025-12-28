import { defineStore } from "pinia";
import { ref } from "vue";

export const useDateStore = defineStore('date', () => {
    const selectedDate = ref<Date>(new Date());

    return {
        selectedDate,
    };
});