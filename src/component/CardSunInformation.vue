<template>
    <h2>foo</h2>
    <div class="card-information">
        <div class="title">
            <span>{{ props.value.name }}</span>
        </div>
        <div class="content">
            <span>{{ props.value.ts }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">

import type { SunStage } from '@/types/SunStage.ts';

const props = defineProps({
    value: SunStage
})
</script>

<style scoped>
.card-information {
    display: flex;
    align-items: center;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.title {
    font-size: small;
}

.content {
    font-size: smaller;
}
</style>