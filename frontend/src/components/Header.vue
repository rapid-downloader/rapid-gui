<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { useRouteQuery } from '@vueuse/router'
import { Button } from './ui/button';

const search = useRouteQuery<string>('search')
defineProps<{
    noSearch?: boolean

}>()

</script>

<template>
    <div class="flex gap-5 justify-between">
        <div class="flex gap-5 items-center">
            <span class="flex">
                <Button variant="link" class="hover:bg-muted py-5 px-4">
                    <i-fluent-arrow-left-16-filled @click="$router.back()" class="text-lg text-foreground"/>
                </Button>
                <Button variant="link" class="hover:bg-muted py-5 px-4">
                    <i-fluent-arrow-right-16-filled @click="$router.forward()" class="text-lg text-foreground"/>
                </Button>
            </span>

            <slot />
        </div>

        <Input v-if="!noSearch" placeholder="Search" v-model="search" class="max-w-[20rem] rounded bg-secondary"></Input>
    </div>
</template>