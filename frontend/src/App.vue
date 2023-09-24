<script setup lang="ts">
import { useRoute } from 'vue-router';
import Navbar from './components/nav/Navbar.vue';

const router = useRoute()

</script>

<template>
    <div class="flex">
        <Navbar />
        <router-view />
    </div>
</template>
