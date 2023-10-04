<script setup lang="ts">
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { ref } from 'vue';

interface Props {
    modelValue?: string[],
    title?: string,
    options?: {
        label: string,
        value: string,
    }[]
}

defineProps<Props>()
const emit = defineEmits<{
    (e: 'update:modelValue', val?: string[]): void
}>()

const selected = ref<string[]>([])

function select(val: string, i: number) {
    if (selected.value.includes(val)) selected.value.splice(i, 1)
    else selected.value.push(val)

    emit('update:modelValue', selected.value)
}
</script>

<template>
    <Popover class="w-fit">
        <PopoverTrigger class="relative">
            <slot/>
        </PopoverTrigger>
        <PopoverContent class="absolute -left-[2.5rem]">
            <div v-for="(option, i) in options" @click="select(option.value, i)" :key="i" class="flex gap-4 cursor-pointer items-center hover:bg-primary hover:text-primbg-primary-foreground rounded -mx-1 -my-1 py-1.5 px-2">
                <Checkbox :checked="selected.includes(option.value)" v-model="selected" :value="option.value"/>
                <Label class="cursor-pointer">{{ option.label }}</Label>
            </div>
        </PopoverContent>
    </Popover>
</template>