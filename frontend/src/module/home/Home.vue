<template>
    <div class="flex h-screen">
        <Button class="m-auto rounded flex gap-2">
            <i-fluent-add-16-filled class="text-primary-foreground"/>
            <p>Add</p>
        </Button>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ref } from 'vue';
import { useCssVar } from '@vueuse/core'
import { useRouter } from 'vue-router';

const router = useRouter()
console.log(router);

const el = ref(null)
const color = useCssVar('--background', el)
</script>