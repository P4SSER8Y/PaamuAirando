<script setup lang="ts">
import { CardType } from "../core/cardLibrary";
import BasicCard from "./BasicCard.vue";

defineProps<{
    cardType: CardType;
    cardId: number;
    rotated: boolean;
    flipped: boolean;
    z: number;
}>();

const MAP = new Map([[CardType.Basic, BasicCard]]);
</script>

<template>
    <div class="card-container">
        <component :is="MAP.get(cardType)" class="card card-front" :cardId="cardId" :flipped="false"> </component>
        <component :is="MAP.get(cardType)" class="card card-back" :cardId="cardId" :flipped="true"> </component>
    </div>
</template>

<style scoped lang="postcss">
.card-container {
    @apply transition duration-1000 w-64 shadow-2xl aspect-[2/3];
    display: block;
    transform-style: preserve-3d;
    transform: scale(1);
    perspective: 9999px;
}

@keyframes flip {
    0% {
        transform: rotateY(0deg);
        z-index: 999;
    }

    33% {
        transform: translateX(8em) translateY(5em) rotateY(-30deg) rotateX(15deg) rotateZ(5deg);
        z-index: 999;
    }

    100% {
        transform: rotateY(180deg);
        z-index: 999;
    }
}

.card-container:hover {
    animation-name: flip;
    animation-duration: 1s;
    transform: rotateY(180deg);
}

.card {
    @apply w-full h-full rounded-3xl shadow-xl;
    backface-visibility: hidden;
    position: absolute;
}

.card-front {}

.card-back {
    transform: rotateY(180deg);
}
</style>
