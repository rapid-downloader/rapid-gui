<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

</script>

<template>
    <div class="flex justify-between w-full">
        <div>
            <Button class="flex gap-2 py-4">
                <i-fluent-add-16-filled class="text-primary-foreground" />
            </Button>
            
        </div>

        <Input placeholder="Search" class="w-[20rem] rounded"></Input>
    </div>
</template>
