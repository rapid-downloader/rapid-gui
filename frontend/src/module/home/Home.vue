<script setup lang="ts">
import { Button } from '@/components/ui/button'
import SelectInput from '@/components/ui/select/SelectInput.vue';
import Header from '@/components/Header.vue';
import DownloadList from './components/DownloadList.vue';
import { ref } from 'vue';
import { Download } from './types';

const items = [
    { value: 'All', text: 'All' },
    { value: 'Document', text: 'Document' },
    { value: 'Video', text: 'Video' },
    { value: 'Audio', text: 'Audio' },
    { value: 'Compressed', text: 'Compressed' },
    { value: 'Other', text: 'Other' },
]

const dlType = ref('')

const dlitems: Download[] = [
    // {
    //     id: '1',
    //     type: 'Image',
    //     name: 'Singo angop.jpgSingo angop.jpgSingo angop.jpgSingo angop.jpgSingo angop.jpg',
    //     size: 100,
    //     progress: 100,
    //     timeLeft: '00:02:01',
    //     speed: 10000,
    //     status: 'Completed',
    //     date: new Date(),
    // },
    // {
    //     id: '2',
    //     type: 'Compressed',
    //     name: 'Singo angop.jpg',
    //     size: 100,
    //     progress: 100,
    //     timeLeft: '00:02:01',
    //     speed: 10000,
    //     status: 'Completed',
    //     date: new Date(),
    // },
]

</script>

<template>
    <div class="flex flex-col w-full">
        <Header>
            <div class="flex gap-3">
                <Button class="flex gap-2 bg-accent">
                    <i-fluent-add-16-filled class="text-accent-foreground" />
                </Button>
                <Button class="flex gap-2 border border-accent group hover:bg-accent" variant="outline">
                    <i-fluent-play-16-filled class="text-accent group-hover:text-accent-foreground" />
                </Button>
                <Button class="flex gap-2 border border-accent group hover:bg-accent" variant="outline">
                    <i-fluent-pause-16-filled class="text-accent group-hover:text-accent-foreground" />
                </Button>
                <SelectInput :items="items" placeholder="Filter" label="Filter" v-model="dlType" />
            </div>
        </Header>


        <DownloadList class="mt-5" :items="dlitems"/>
    </div>
</template>
