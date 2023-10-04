<script setup lang="ts">
import Cato from '@/assets/images/cato.svg'
import { Download, Sort } from '../types'
import { parseSize, parseDate, truncate, statusColor } from '@/lib/parse';
import FileType from './FileType.vue'
import StatusIcon from './StatusIcon.vue';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { computed, ref } from 'vue';
import { useRouteQuery } from '@vueuse/router';

const props = defineProps<{
    items: Record<string, Download>,
}>()

const asc = ref(true)
const selected = ref<Sort>('date')
function sort(row: Sort) {
    selected.value = row
    asc.value = !asc.value
}

const search = useRouteQuery('search', '')
const items = computed(() => {
    return Object.entries(props.items)
        .filter(([, item]) => item.name.toLowerCase().includes(search.value.toLowerCase()))
        .sort(([, v1], [, v2]) => {
            if (selected.value === 'date') {
                return asc.value
                    ? v1.date.getTime() - v2.date.getTime()
                    : v2.date.getTime() - v1.date.getTime()
            }

            if (selected.value === 'size') {
                return asc.value
                    ? v1.size - v2.size
                    : v2.size - v1.size
            }

            return asc.value
                ? v1.name.localeCompare(v2.name)
                : v2.name.localeCompare(v1.name)
        })
})

</script>

<template>
    <div :class="`${!items || Object.keys(items).length === 0 ? '' : 'bg-secondary border border-muted mb-3 rounded-md p-2'}`">
        <div v-if="!items || Object.keys(items).length === 0" class="w-fit mx-auto">
            <img :src="Cato" alt="empty" class="mx-auto my-auto w-[20rem] h-screen -mt-[5rem]">
        </div>
        <Table v-else class="min-w-max">
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow class="hover:bg-secondary border-muted-foreground">
                    <TableHead class="w-[2rem]">
                        Type
                    </TableHead>
                    <TableHead @click="sort('name')" class="cursor-pointer w-[35%] overflow-x-scroll">
                        Name
                    </TableHead>
                    <TableHead @click="sort('size')" class="cursor-pointer w-[8%]">
                        Size
                    </TableHead>
                    <TableHead class="w-[8%]">
                        Progress
                    </TableHead>
                    <TableHead class="w-[8%]">
                        Time Left
                    </TableHead>
                    <TableHead class="w-[10%]">
                        Speed
                    </TableHead>
                    <TableHead class="w-[10%]">
                        Status
                    </TableHead>
                    <TableHead @click="sort('date')" class="cursor-pointer w-[20%]">
                        Date
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="[_, item] in items" :key="item.id" class="group relative">
                    <TableCell class="font-medium">
                        <FileType :type="item.type" />
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
                    <TableCell :class="`font-medium flex gap-1 items-center ${statusColor(item.status)}`">
                        <StatusIcon :status="item.status" /> {{ item.status }}
                    </TableCell>
                    <TableCell>
                        {{ parseDate(item.date) }}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>