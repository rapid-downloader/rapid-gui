<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { useRouteQuery } from '@vueuse/router'

const search = useRouteQuery<string>('search')

</script>

<template>
    <div class="flex justify-between w-full">
        <slot />

        <Input placeholder="Search" v-model="search" class="max-w-[20rem] rounded bg-secondary"></Input>
    </div>
</template>