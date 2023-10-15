<script setup lang="ts">
import Header from '@/components/Header.vue';
import P from '@/components/ui/P.vue';
import Calendar from '@/components/Calendar.vue'
import Cato from '@/assets/images/cato.svg'
import { computed, ref, reactive, onMounted } from 'vue';
import { useRouteQuery } from '@vueuse/router';
import Logs from './api'

const now = new Date()

const MONTHS: Record<number, string> = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
};

const date = reactive({
    day: now.getDate(),
    month: MONTHS[now.getMonth()],
    year: now.getFullYear()
})

const search = useRouteQuery('search', '')

const logs = ref<string[]>([])

onMounted(async () => {
    logs.value = await Logs.get(`${date.day}-${now.getMonth()+1}-${date.year}`)
})

const items = computed(() => logs.value.filter(log => log.toLowerCase().includes(search.value.toLowerCase())))

</script>

<template>
    <div class="flex flex-col w-full">
        <Header>
            <div class="flex gap-1 items-center">
                <P class="mr-2 text-sm font-medium">Date:</P>
                <Calendar v-model="date" />
            </div>
        </Header>

        <div :class="`${!items || items.length === 0 ? '' : 'bg-secondary border border-muted mb-3 rounded-md p-2'} mt-5`">
            <div v-if="items.length === 0" class="w-fit mx-auto">
                <img :src="Cato" alt="empty" class="mx-auto my-auto w-[20rem] h-screen -mt-[5rem]">
            </div>
            <div v-else class="w-fit flex flex-col gap-2">
                <div v-for="(item, i) in items" :key="i" class="flex gap-2">
                    <span class="text-left [&:not(:first-child)]:mt-0 text-xs font-mono border-r pr-2 border-muted"><span v-if="i+1 < 10">&nbsp</span>{{ i+1 }}</span>
                    <span class="text-left [&:not(:first-child)]:mt-0 text-xs xl:w-[75rem] font-mono">{{ item }}</span>
                </div>
            </div>
        </div>
    </div>
</template>