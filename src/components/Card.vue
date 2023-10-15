<script setup lang="ts">
import { CardType } from '../core/cardLibrary';
import BasicCard from './BasicCard.vue';

defineProps<{ cardType: CardType, cardId: number, rotated: boolean, flipped: boolean }>();

const MAP = new Map([[CardType.Basic, BasicCard],]);
</script>

<template>
    <component :is="MAP.get(cardType)" class="card" :cardId="cardId" :flipped="flipped"></component>
</template>

<style scoped lang="postcss">
.card {
    @apply rotate-45 transition duration-1000 hover:rotate-180 aspect-[2/3] w-64 m-5 rounded-3xl shadow-xl;
    transform: scale(1);
}
</style>
