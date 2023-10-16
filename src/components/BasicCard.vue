<script setup lang="ts">
import { CardStatus } from '../core/card';
import { CardType, cardFactory } from '../core/cardLibrary';
import HalfCard from './HalfCard.vue';

const props = defineProps<{ cardId: number, flipped: boolean }>();

const card = cardFactory(CardType.Basic, props.cardId);
</script>

<template>
    <div v-if="card" class="rounded-md shadow-md bg-orange-200 text-black text-center grid grid-cols-1 grid-rows-1">
        <div v-if="!flipped" class="angle-mark">
            <div class="triangle"> </div>
            <p class="label">{{ cardId }}</p>
        </div>
        <div class="grid grid-cols-1 grid-rows-2 divide-y divide-dotted divide-gray-500">
            <div v-if="!flipped">
                <HalfCard class="" style="z-index: 0;" :card="card" :status="CardStatus.FrontUp"></HalfCard>
            </div>
            <div v-else>
                <HalfCard class="" :card="card" :status="CardStatus.BackUp"></HalfCard>
            </div>
            <div v-if="!flipped">
                <HalfCard class="rotate-180" :card="card" :status="CardStatus.FrontDown"></HalfCard>
            </div>
            <div v-else>
                <HalfCard class="rotate-180" :card="card" :status="CardStatus.BackDown"></HalfCard>
            </div>
        </div>
    </div>
</template>

<style scoped lang="postcss">
.angle-mark {
    @apply -rotate-45 fixed;
    top: 0.5em;
    left: 1em;

    .triangle {
        width: 0;
        height: 0;
        border-top: 1.5em solid transparent;
        border-left: 1.5em solid transparent;
        border-bottom: 1.5em solid white;
        border-right: 1.5em solid transparent;
    }

    .label {
        font-size: 0.75rem;
        text-align: center;
        position: relative;
        top: -1.2rem;
    }
}
</style>