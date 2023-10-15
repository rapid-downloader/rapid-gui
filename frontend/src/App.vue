<script setup lang="ts">
import Navbar from './components/Navbar.vue';

</script>

<template>
    <div class="flex bg-background min-w-[50rem]">
        <Navbar />

        <div class="flex flex-col w-full mx-3">
            <router-view class="mx-5 my-1.5"/>
        </div>

    </div>
</template>
