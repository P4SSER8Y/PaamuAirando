<script setup lang="ts">
import { watch } from 'vue';
import { BasicCard, CardStatus } from '../core/card';
import HalfBasicCardUI from './HalfBasicCardUI.vue';

const emits = defineEmits<{ update: [] }>();

const props = defineProps<{ card: BasicCard, cardStatus: CardStatus, flipped: boolean, paid: boolean, actionable: boolean }>();

</script>

<template>
    <div v-if="card" class="rounded-md shadow-md bg-orange-200 text-black text-center grid grid-cols-1 grid-rows-1">
        <div v-if="!flipped" class="angle-mark">
            <div class="triangle"> </div>
            <p class="label">{{ card.id }}</p>
        </div>
        <div class="grid grid-cols-1 grid-rows-2 divide-y divide-dotted divide-gray-500">
            <div v-if="!flipped">
                <HalfBasicCardUI class="" style="z-index: 0;" :card="card" :status="CardStatus.FrontUp"
                    :paid="actionable && paid && (cardStatus == CardStatus.FrontUp)"
                    :actionable="actionable && (!paid) && (cardStatus == CardStatus.FrontUp)"
                    @update="emits('update')">
                </HalfBasicCardUI>
            </div>
            <div v-else>
                <HalfBasicCardUI class="" :card="card" :status="CardStatus.BackUp"
                    :paid="actionable && paid && (cardStatus == CardStatus.BackUp)"
                    :actionable="actionable && (!paid) && (cardStatus == CardStatus.BackUp)" @update="emits('update')">
                </HalfBasicCardUI>
            </div>
            <div v-if="!flipped">
                <HalfBasicCardUI class="rotate-180" :card="card" :status="CardStatus.FrontDown"
                    :paid="actionable && paid && (cardStatus == CardStatus.FrontDown)"
                    :actionable="actionable && (!paid) && (cardStatus == CardStatus.FrontDown)"
                    @update="emits('update')">
                </HalfBasicCardUI>
            </div>
            <div v-else>
                <HalfBasicCardUI class="rotate-180" :card="card" :status="CardStatus.BackDown"
                    :paid="actionable && paid && (cardStatus == CardStatus.BackDown)"
                    :actionable="actionable && (!paid) && (cardStatus == CardStatus.BackDown)"
                    @update="emits('update')">
                </HalfBasicCardUI>
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
}</style>