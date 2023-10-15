<script setup lang="ts">
import { Button } from '@/components/ui/button'
import Header from '@/components/Header.vue';
import DownloadList from './components/DownloadList.vue';
import { computed, ref } from 'vue';
import { Download } from './types';
import XTooltip from '@/components/ui/tooltip/XTooltip.vue';
import Filter from './components/Filter.vue';

const types = [
    { value: 'Document', label: 'Document' },
    { value: 'Video', label: 'Video' },
    { value: 'Audio', label: 'Audio' },
    { value: 'Compressed', label: 'Compressed' },
    { value: 'Other', label: 'Other' },
]
const statuses = [
    { value: 'Downloading', label: 'Downloading' },
    { value: 'Queued', label: 'Queued' },
    { value: 'Paused', label: 'Paused' },
    { value: 'Failed', label: 'Failed' },
    { value: 'Stoped', label: 'Stoped' },
    { value: 'Completed', label: 'Completed' },
]

const dlType = ref('')

function randomDate(start: Date, end: Date): Date {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const timeDiff = endTime - startTime;
  
  const randomTime = Math.random() * timeDiff;
  
  const randomDate = new Date(startTime + randomTime);
  
  return randomDate;
}

const start = new Date('2020-01-01')
const end = new Date('2021-12-31')

const dlitems = ref<Record<string, Download>>({
    '1': {
        id: '1',
        type: 'Image',
        name: 'some-image.jpg',
        size: 1024 * 1024,
        progress: 100,
        timeLeft: '00:00:00',
        speed: 10000,
        status: 'Completed',
        date: randomDate(start, end),
    },
    '2': {
        id: '2',
        type: 'Compressed',
        name: 'this-is-zip-file.zip',
        size: 1024 * 1024 * 520,
        progress: 81,
        timeLeft: '00:02:01',
        speed: (1024 * 1024) + 247103,
        status: 'Downloading',
        date: randomDate(start, end),
    },
    '3': {
        id: '3',
        type: 'Video',
        name: 'random-cat-video.mp4',
        size: 1024 * 1024 * 15,
        progress: 97,
        timeLeft: '00:0:02',
        speed: 1000000,
        status: 'Failed',
        date: randomDate(start, end),
    },
    '4': {
        id: '4',
        type: 'Audio',
        name: 'goofy-ah-sound.mp3',
        size: 100,
        progress: 58,
        timeLeft: '00:02:01',
        speed: 10000,
        status: 'Paused',
        date: randomDate(start, end),
    },
    '5': {
        id: '5',
        type: 'Document',
        name: 'pirated-thesis.pdf',
        size: 10000000,
        progress: 90,
        timeLeft: '00:00:10',
        speed: 10000,
        status: 'Stoped',
        date: randomDate(start, end),
    },
    '6': {
        id: '6',
        type: 'Other',
        name: 'this-is-big-file.exe',
        size: 1024 * 1024 * 2190,
        progress: 0,
        timeLeft: '00:00:00',
        speed: 0,
        status: 'Queued',
        date: randomDate(start, end),
    },
})

const filteredtype = ref<string[]>([])
const filteredstatus = ref<string[]>([])

const items = computed(() => {
    let filtered = dlitems.value
    if (filteredtype.value.length > 0) {
        filtered = Object.fromEntries(
            Object.entries(dlitems.value).filter(([, entry]) => filteredtype.value.some(val => val.includes(entry.type)))
        )
    }

    if (filteredstatus.value.length > 0) {
        filtered = Object.fromEntries(
            Object.entries(dlitems.value).filter(([, entry]) => filteredstatus.value.some(val => val.includes(entry.status)))
        )
    }
    
    return filtered
})

</script>

<template>
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
        </div>
    </Header>

    <div class="flex flex-col gap-2 mt-5 items-start">
        <div class="flex gap-3">
            <Filter v-if="Object.keys(dlitems).length > 0" :options="types" v-model="filteredtype">
                <Button variant="outline" size="sm" class="flex gap-1 border-muted rounded-md">
                    <i-radix-icons-mixer-horizontal />
                    <p>Type</p>
                </Button>
            </Filter>

            <Filter v-if="Object.keys(dlitems).length > 0" :options="statuses" v-model="filteredstatus">
                <Button variant="outline" size="sm" class="flex gap-1 border-muted rounded-md">
                    <i-radix-icons-mixer-horizontal />
                    <p>Status</p>
                </Button>
            </Filter>
        </div>

        <download-list class="w-full" :items="items"/>
    </div>
</template>
