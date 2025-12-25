<template>
    <div class="card-information">
        <div class="title">
            <span>{{ stageLabel }}</span>
        </div>
        <div class="content">
            <span>{{ stageHour }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">

import { sunStageFrLabel } from '@/services/sunStageMapper';
import type { SunStage } from '@/types/sunStage';
import dayjs from 'dayjs';
import { computed } from 'vue';

const props = defineProps<{
    value: SunStage
}>();

const stageLabel = computed(() => {
    return sunStageFrLabel(props.value.name);
});

const stageHour = computed(() => {
    return props.value.valid ? dayjs(props.value.ts).format('HH:mm') : 'N/A';
})
</script>

<style scoped>
.card-information {
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 96px;
    height: 96px;
}

.title {
    padding: 4px;
    font-size: small;
    text-align: center;
}

.content {
    padding: 4px;
    font-size: small;
}
</style>