<script setup lang="ts">
import { Ref, ref } from 'vue';
import Card from './components/Card.vue';
import { CardType } from './core/cardLibrary';

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
    <Card v-for="(item, index) in ids" class="shrink-0" :cardId="item" :cardType="CardType.Basic"
      :rotated="isRotated[index].value" :paid="isPaid[index].value" :flipped="isFlipped[index].value" :z="index">
    </Card>
  </div>
</template>

<style scoped></style>
