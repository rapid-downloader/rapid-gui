<script setup lang="ts">
import Navbar from './components/Navbar.vue';

</script>

<template>
    <div class="flex bg-background">
        <Navbar />
        <router-view class="mx-5 my-1.5"/>
    </div>
</template>
