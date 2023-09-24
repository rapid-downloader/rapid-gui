<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ref } from 'vue';
import { useCssVar } from '@vueuse/core'
import { cp } from 'fs';


const el = ref(null)
const bg = useCssVar('--background', el)

function changeColor() {
    bg.value = bg.value === '222.2 47.4% 11.2%' ? '0 %0 %0' : '222.2 47.4% 11.2%'
}
</script>

<template>
    <div class="flex h-screen w-full">
        <Button @click="changeColor()" class="m-auto rounded flex gap-2">
            <i-fluent-add-16-filled class="text-primary-foreground" />
            <p>Add</p>
        </Button>
    </div>
</template>
