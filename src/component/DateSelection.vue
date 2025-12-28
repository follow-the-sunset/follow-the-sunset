<template>
    <div>
        <div>
            <input type="date" v-model="baseDate" />
        </div>
        <div>
            <input type="range" min="-180" max="180" :change="foo" v-model="cursorIndex" />
            <p>Selected Date: {{ selectedDate }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useDateStore } from '@/stores/date';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const baseDate = ref(dayjs().toDate());
const selectedDate = storeToRefs(useDateStore()).selectedDate;
const cursorIndex = ref(0);
const foo = computed(() => { selectedDate.value = dayjs(baseDate.value).add(cursorIndex.value, 'day').toDate() });
</script>
<style scoped></style>