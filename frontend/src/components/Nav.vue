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
                    <Button :class="`group shadow-none bg-background py-5 px-2 m-0.5 ${route.path === props.to ? 'bg-background brightness-150' : ''}`">
                        <slot />
                    </Button>
                </TooltipTrigger>
                <TooltipContent class="rounded" avoid-collisions side="right">
                    <p class="brightness-75">{{ props.tooltip }}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </router-link>
</template>