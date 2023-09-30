<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { useRouteQuery } from '@vueuse/router'
const search = useRouteQuery('search')
</script>

<template>
    <div class="flex justify-between w-full">
        <slot />

        <Input v-model="(search as string)" placeholder="Search" class="max-w-[20rem] rounded bg-primary border-none"></Input>
    </div>
</template>