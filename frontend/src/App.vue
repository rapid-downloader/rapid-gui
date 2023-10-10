<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import Navbar from './components/Navbar.vue';

const jwt = useStorage<string>('jwt', 'kucing')
</script>

<template>
    {{ jwt }}
    <div class="flex bg-background min-w-[50rem]">
        <Navbar />
        <router-view class="mx-5 my-1.5"/>
    </div>
</template>
