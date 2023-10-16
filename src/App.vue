<script setup lang="ts">
import Card from './components/Card.vue';
import { CardType } from './core/cardLibrary';

let ids:number[] = [];
for (let i = 1; i <= 16; i++)
{
  ids.push(i);
}
</script>

<template>
  <div class="items-center justify-center justify-items-center gap-x-5 gap-y-5 relative flex flex-row flex-wrap">
    <Card v-for="(item, index) in ids" class="shrink-0" :cardId="item" :cardType="CardType.Basic" :rotated="true" :flipped="true" :z="index"></Card>
  </div>
</template>

<style scoped></style>
