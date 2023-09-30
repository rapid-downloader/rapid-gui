<script setup lang="ts">
import { computed } from 'vue';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const props = defineProps<{
    modelValue?: string
    label?: string
    placeholder?: string
    items?: { value: string, text: string }[]
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', val?: string): void
}>()

const select = computed({
    get: () => props.modelValue,
    set: val => emit('update:modelValue', val)
})

</script>

<template>
    <Select v-model="select">
        <SelectTrigger class="border-none bg-primary rounded">
            <SelectValue :class="`${select ? '' : 'text-muted-foreground'}`" :placeholder="placeholder" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>{{ label }}</SelectLabel>
                <SelectItem v-for="(item, i) in items" :key="i" :value="item.value">
                    {{ item.text }}
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>