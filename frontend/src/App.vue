<template>
    <div class="flex h-screen">
        <Button class="m-auto rounded" @click="color = toHSL('#000000')" :style="{ color: '' }">{{ color }}</Button>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ref } from 'vue';
import { useCssVar } from '@vueuse/core'
import { toHSL } from '@/lib/color'

const el = ref(null)
const color = useCssVar('--background', el)
</script>