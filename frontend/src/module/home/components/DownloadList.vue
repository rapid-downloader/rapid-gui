<script setup lang="ts">
import Cato from '@/assets/images/cato.svg'
import { Status, Download } from '../types'
import { parseSize, parseDate, truncate } from '@/lib/parse';
import FileType from './FileType.vue'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

function statusColor(status: Status): string {
    const records: Record<Status, string> = {
        'Completed': 'text-success',
        'Downloading': 'text-info',
        'Failed': 'text-destructive',
        'Paused': '',
        'Queued': 'text-info'
    }

    return records[status]
}

defineProps<{
    items?: Download[]
}>()

</script>

<template>
    <div :class="`bg-secondary border border-muted px-3 py-3 mb-3 rounded-md ${items ? '' : 'h-screen/2'}`">
        <div v-if="!items || items.length === 0">
            <div class="w-fit mx-auto">
                <img :src="Cato" alt="empty" class="mx-auto my-auto w-[20rem] h-screen">
            </div>
        </div>

        <Table v-else class="min-w-max">
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[2rem]">
                        Type
                    </TableHead>
                    <TableHead class="w-[30rem] overflow-x-scroll">
                        Name
                    </TableHead>
                    <TableHead class="w-[7rem]">
                        Size
                    </TableHead>
                    <TableHead class="w-[7rem]">
                        Progress
                    </TableHead>
                    <TableHead class="w-[7rem]">
                        Time Left
                    </TableHead>
                    <TableHead class="w-[7rem]">
                        Speed
                    </TableHead>
                    <TableHead class="w-[7rem]">
                        Status
                    </TableHead>
                    <TableHead>
                        Date
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="item in items" :key="item.id" class="group">
                    <TableCell class="font-medium">
                        <FileType :type="item.type"/>
                    </TableCell>
                    <TableCell class="w-[30rem] overflow-x-scroll">
                        {{ truncate(item.name) }}
                    </TableCell>
                    <TableCell>
                        {{ parseSize(item.size) }}
                    </TableCell>
                    <TableCell>
                        {{ `${item.progress}%` }}
                    </TableCell>
                    <TableCell>
                        {{ item.timeLeft }}
                    </TableCell>
                    <TableCell>
                        {{ `${parseSize(item.speed)}/s` }}
                    </TableCell>
                    <TableCell :class="`font-medium ${statusColor(item.status)}`">
                        {{ item.status }}
                    </TableCell>
                    <TableCell>
                        {{ parseDate(item.date) }}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>