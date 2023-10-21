<script setup lang="ts">
import { Button } from '@/components/ui/button'
import Header from '@/components/Header.vue';
import DownloadList from './components/DownloadList.vue';
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue';
import { Download } from './types';
import XTooltip from '@/components/ui/tooltip/XTooltip.vue';
import Filter from './components/Filter.vue';
import Entries from '../download/api'
import XDialog from '@/components/ui/dialog/XDialog.vue';
import DownloadDialog from '../download/components/DownloadDialog.vue';
import { Websocket } from '@/composable'
import { useProgressbar } from '../download/store';

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

const dlentries = ref<Record<string, Download>>({})

const entries = Entries()
const ws = Websocket()

onMounted(async () => {
    dlentries.value = await entries.all()
})

onUnmounted(() => {
    // TODO: update all the entries

    if (ws.conn && ws.conn.readyState === ws.conn.OPEN) {
        ws.close()
    }
})

const dlprogress = useProgressbar()
watch(dlprogress, () => {
    // TODO: update the entries progress
    const p = dlprogress.progress
    dlentries.value[p.id].progress = p.progress
    dlentries.value[p.id].status = 'Downloading'

    if (p.done) {
        dlentries.value[p.id].status = 'Completed'
    }
})

const filteredtype = ref<string[]>([])
const filteredstatus = ref<string[]>([])

const items = computed(() => {
    let filtered = dlentries.value
    if (filteredtype.value.length > 0) {
        filtered = Object.fromEntries(
            Object.entries(dlentries.value).filter(([, entry]) => filteredtype.value.some(val => val.includes(entry.type)))
        )
    }

    if (filteredstatus.value.length > 0) {
        filtered = Object.fromEntries(
            Object.entries(dlentries.value).filter(([, entry]) => filteredstatus.value.some(val => val.includes(entry.status)))
        )
    }
    
    return filtered
})

function download() {
    if (!ws.conn) ws.connect()
}

</script>

<template>
    <Header>
        <div class="flex gap-3">
            <x-tooltip text="New Download" location="bottom">
                <x-dialog title="New Download" description="Provide a link to start a new download">
                    <template v-slot:trigger>
                        <Button class="flex gap-2 bg-accent justify-center hover:bg-accent/90">
                            <i-fluent-add-16-filled class="text-accent-foreground" />
                        </Button>
                    </template>

                    <template v-slot:content>
                        <download-dialog @fetched="res => dlentries[res.id] = res" @download="download" /> 
                    </template>
                </x-dialog>
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
            
            <x-tooltip text="Stop all" location="bottom">
                <Button class="flex gap-2 border border-accent group hover:bg-accent" variant="outline">
                    <i-fluent-stop-16-filled class="text-accent group-hover:text-accent-foreground" />
                </Button>    
            </x-tooltip>
        </div>
    </Header>

    <div class="flex flex-col gap-2 mt-5 items-start">
        <div class="flex gap-3">
            <Filter v-if="Object.keys(dlentries).length > 0" :options="types" v-model="filteredtype">
                <Button variant="outline" size="sm" class="flex gap-1 border-muted rounded-md">
                    <i-radix-icons-mixer-horizontal />
                    <p>Type</p>
                </Button>
            </Filter>

            <Filter v-if="Object.keys(dlentries).length > 0" :options="statuses" v-model="filteredstatus">
                <Button variant="outline" size="sm" class="flex gap-1 border-muted rounded-md">
                    <i-radix-icons-mixer-horizontal />
                    <p>Status</p>
                </Button>
            </Filter>
        </div>

        {{ $progress }}
        <download-list class="w-full" :items="items"/>
    </div>
</template>
