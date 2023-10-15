<template>
    <span>
        <span class="main">
            {{ icon }}
        </span>
        <slot></slot>
    </span>
</template>

<script setup lang="ts">
defineProps<{ icon: string }>();
</script>

<style scoped>
.main {
    font-family: 'Noto Color Emoji';
}
</style>