<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { useRouteQuery } from '@vueuse/router'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const search = useRouteQuery<string>('search')
defineProps<{
    noSearch?: boolean

}>()

</script>

<template>
    <div class="flex gap-5 justify-between">
        <div class="flex gap-5 items-center">
            <span class="flex gap-5 top-0">
                <button >
                    <i-fluent-arrow-left-16-filled @click="$router.back()" class="text-lg"/>
                </button>
                <button>
                    <i-fluent-arrow-right-16-filled @click="$router.forward()" class="text-lg"/>
                </button>
            </span>

            <slot />
        </div>

        <Input v-if="!noSearch" placeholder="Search" v-model="search" class="max-w-[20rem] rounded bg-secondary"></Input>
    </div>
</template>