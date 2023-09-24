<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'

const route = useRoute()

const props = defineProps<{
    to: string
    tooltip: string
}>()
</script>
<template>
    <router-link :to="props.to">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger as-child>
                    <Button :class="`rounded-none group py-5 px-2 border-2 border-primary ${route.path === props.to ? 'border-l-accent' : 'hover:border-l-accent hover:brightness-125'}`">
                        <slot />
                    </Button>
                </TooltipTrigger>
                <TooltipContent class="rounded" avoid-collisions side="right">
                    <p>{{ props.tooltip }}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </router-link>
</template>