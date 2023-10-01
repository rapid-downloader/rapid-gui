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
    items?: { value: string, text: string, icon?: any }[]
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
        <SelectTrigger class="border border-muted bg-secondary rounded">
            <SelectValue :placeholder="placeholder" />
        </SelectTrigger>
        <SelectContent class="rounded border-primary">
            <SelectGroup>
                <SelectLabel>{{ label }}</SelectLabel>
                <SelectItem v-for="(item, i) in items" :key="i" :value="item.value" class="rounded">
                    {{ item.text }}
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>