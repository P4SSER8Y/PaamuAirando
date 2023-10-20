<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { BasicCard, Card, CardStatus, CardType } from "../core/card";
import BasicCardUI from "./BasicCardUI.vue";

const props = defineProps<{
    card: Card
}>();

const emit = defineEmits<{ update: [] }>();

const rotated = ref(false);
const flipped = ref(false);
const paid = ref(false);
const cardStatus = ref(CardStatus.FrontUp);

function update() {
    paid.value = props.card.paidStatus;
    cardStatus.value = props.card.cardStatus;
    switch (props.card.cardStatus) {
        case CardStatus.FrontUp:
            flipped.value = false;
            rotated.value = false;
            break;
        case CardStatus.FrontDown:
            flipped.value = false;
            rotated.value = true;
            break;
        case CardStatus.BackUp:
            flipped.value = true;
            rotated.value = false;
            break;
        case CardStatus.BackDown:
            flipped.value = true;
            rotated.value = true;
            break;
        default:
            break;
    }
    emit('update');
}

onMounted(() => {
    update();
});
</script>

<template>
    <div class="card-status" :class="paid ? 'card-paid' : ''">
        <div class="card-status" :class="rotated ? 'card-rotated' : ''">
            <div v-if="card.cardType == CardType.Basic" class="card-container card-status"
                :class="flipped ? 'flipped-card' : ''">
                <BasicCardUI class="card card-front" :card="<BasicCard>card" :card-status="cardStatus" :flipped="false" :paid="paid" :actionable="!flipped" @update="update">
                </BasicCardUI>
                <BasicCardUI class="card card-back" :card="<BasicCard>card" :card-status="cardStatus" :flipped="true" :paid="paid" :actionable="flipped" @update="update">
                </BasicCardUI>
            </div>
        </div>
    </div>
</template>

<style scoped lang="postcss">
.card-status {
    @apply duration-500;
}

.card-paid {
    transform: rotate(90deg);
}

.card-rotated {
    transform: rotate(180deg);
}

.card-flipped {
    transform: rotateY(180deg);
}

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

.flipped-card {
    animation-name: flip;
    animation-duration: 500ms;
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
