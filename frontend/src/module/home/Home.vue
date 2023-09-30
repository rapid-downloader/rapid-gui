<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SelectInput from '@/components/ui/select/SelectInput.vue';
import { ref } from 'vue';

const items = [
    { value: 'All', text: 'All'},
    { value: 'Document', text: 'Document'},
    { value: 'Video', text: 'Video'},
    { value: 'Audio', text: 'Audio'},
    { value: 'Compressed', text: 'Compressed'},
    { value: 'Other', text: 'Other'},
]

const dlType = ref('')

</script>

<template>
    <div class="flex justify-between w-full">
        <div class="flex gap-3">
            <Button class="flex gap-2 py-4">
                <i-fluent-add-16-filled class="text-primary-foreground" />
            </Button>
            <SelectInput :items="items" placeholder="Filter Download" label="Filter" v-model="dlType" />
        </div>

        <Input placeholder="Search" class="max-w-[20rem] rounded bg-primary border-none"></Input>
    </div>
</template>
