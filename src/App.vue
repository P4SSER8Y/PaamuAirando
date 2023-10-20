<script setup lang="ts">
import { Ref, ref } from 'vue';
import CardUI from './components/CardUI.vue';
import { cardFactory } from './core/cardLibrary';
import { CardType } from './core/card';

let ids: number[] = [];
let isPaid: any[] = [];
let isRotated: any[] = [];
let isFlipped: any[] = [];
for (let i = 1; i <= 16; i++) {
  ids.push(i);
  isPaid.push(ref(false));
  isRotated.push(ref(false));
  isFlipped.push(ref(false));
}
</script>

<template>
  <div class="items-center justify-center justify-items-center gap-x-5 gap-y-5 relative flex flex-row flex-wrap">
    <CardUI v-for="(item, index) in ids" class="shrink-0" :card="cardFactory(CardType.Basic, item)">
    </CardUI>
  </div>
</template>

<style scoped></style>
