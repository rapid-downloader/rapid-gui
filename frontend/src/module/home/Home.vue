<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ref } from 'vue';
import { useCssVar } from '@vueuse/core'

const elbg = ref(null)
const bg = useCssVar('--background', elbg)
const bgVal = bg.value

const elmuted = ref(null)
const muted = useCssVar('--muted', elmuted)
const mutedVal = muted.value

function changeColor() {
    bg.value = bg.value === bgVal ? mutedVal : bgVal
}
</script>

<template>
    <div class="flex h-screen w-full bg-background">
        <Button @click="changeColor()" class="m-auto rounded flex gap-2">
            <i-fluent-add-16-filled class="text-primary-foreground" />
            <p>Add</p>
        </Button>
    </div>
</template>
