<script setup lang="ts">
import { Button } from '@/components/ui/button'
import SelectInput from '@/components/ui/select/SelectInput.vue';
import Header from '@/components/Header.vue';
import { ref } from 'vue';

const items = [
    { value: 'All', text: 'All' },
    { value: 'Document', text: 'Document' },
    { value: 'Video', text: 'Video' },
    { value: 'Audio', text: 'Audio' },
    { value: 'Compressed', text: 'Compressed' },
    { value: 'Other', text: 'Other' },
]

const dlType = ref('')

</script>

<template>
    <Header>
        <div class="flex gap-3">
            <Button class="flex gap-2 bg-accent">
                <i-fluent-add-16-filled class="text-accent-foreground" />
            </Button>
            <SelectInput :items="items" placeholder="Filter Download" label="Filter" v-model="dlType" />
        </div>
    </Header>
</template>
