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
  <div class="flex flex-column flex-wrap items-center justify-center gap-x-5 gap-y-5">
    <Card v-for="idx in ids" :cardId="idx" :cardType="CardType.Basic" :rotated="true" :flipped="false"></Card>
  </div>
</template>

<style scoped></style>
