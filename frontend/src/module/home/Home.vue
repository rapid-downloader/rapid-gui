<script setup lang="ts">
import { Button } from '@/components/ui/button'
import SelectInput from '@/components/ui/select/SelectInput.vue';
import Header from '@/components/Header.vue';
import DownloadList from './components/DownloadList.vue';
import { ref } from 'vue';
import { Download } from './types';
import XTooltip from '@/components/ui/tooltip/XTooltip.vue';

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
    {
        id: '1',
        type: 'Image',
        name: 'some-image.jpg',
        size: 1024 * 1024,
        progress: 100,
        timeLeft: '00:00:00',
        speed: 10000,
        status: 'Completed',
        date: new Date(),
    },
    {
        id: '2',
        type: 'Compressed',
        name: 'this-is-zip-file.zip',
        size: 1024 * 1024 * 520,
        progress: 81,
        timeLeft: '00:02:01',
        speed: (1024 * 1024) + 247103,
        status: 'Downloading',
        date: new Date(),
    },
    {
        id: '3',
        type: 'Video',
        name: 'random-cat-video.mp4',
        size: 1024 * 1024 * 15,
        progress: 97,
        timeLeft: '00:0:02',
        speed: 1000000,
        status: 'Failed',
        date: new Date(),
    },
    {
        id: '4',
        type: 'Audio',
        name: 'goofy-ah-sound.mp3',
        size: 100,
        progress: 58,
        timeLeft: '00:02:01',
        speed: 10000,
        status: 'Paused',
        date: new Date(),
    },
    {
        id: '5',
        type: 'Document',
        name: 'pirated-thesis.pdf',
        size: 10000000,
        progress: 100,
        timeLeft: '00:00:00',
        speed: 10000,
        status: 'Completed',
        date: new Date(),
    },
    {
        id: '6',
        type: 'Other',
        name: 'this-is-big-file.exe',
        size: 1024 * 1024 * 2190,
        progress: 0,
        timeLeft: '00:00:00',
        speed: 0,
        status: 'Queued',
        date: new Date(),
    },
]

</script>

<template>
    <div class="flex flex-col w-full">
        <Header>
            <div class="flex gap-3">
                <x-tooltip text="New Download" location="bottom">
                    <Button class="flex gap-2 bg-accent">
                        <i-fluent-add-16-filled class="text-accent-foreground" />
                    </Button>
                </x-tooltip>

                <x-tooltip text="New batch download" location="bottom">
                    <Button class="flex gap-2 border border-accent group hover:bg-accent" variant="outline">
                        <i-fluent-add-square-multiple-16-filled class="text-accent text-lg group-hover:text-accent-foreground" />
                    </Button>
                </x-tooltip>

                <x-tooltip text="Resume all" location="bottom">
                    <Button class="flex gap-2 border border-accent group hover:bg-accent" variant="outline">
                        <i-fluent-play-16-filled class="text-accent group-hover:text-accent-foreground" />
                    </Button>
                </x-tooltip>

                <x-tooltip text="Pause all" location="bottom">
                    <Button class="flex gap-2 border border-accent group hover:bg-accent" variant="outline">
                        <i-fluent-pause-16-filled class="text-accent group-hover:text-accent-foreground" />
                    </Button>
                </x-tooltip>
                
                <x-tooltip text="New Download" location="bottom">
                    <Button class="flex gap-2 border border-accent group hover:bg-accent" variant="outline">
                        <i-fluent-stop-16-filled class="text-accent group-hover:text-accent-foreground" />
                    </Button>    
                </x-tooltip>
                <SelectInput :items="items" placeholder="Filter" label="Filter" v-model="dlType" />
            </div>
        </Header>


        <DownloadList class="mt-5" :items="dlitems"/>
    </div>
</template>
