<script setup lang="ts">
import Header from '@/components/Header.vue';
import LogItem from './components/LogItem.vue'
import P from '@/components/ui/P.vue';
import Calendar from '@/components/Calendar.vue'
import { reactive } from 'vue';

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
  10:'October',
  11:'November',
  12:'December',
};
const date = reactive({
    day: now.getDate(),
    month: MONTHS[now.getMonth()],
    year: now.getFullYear()
})

</script>

<template>
    <div class="flex flex-col w-full">
        <Header>
            <div class="flex gap-1 items-center">
                <P class="mr-2 text-sm font-medium">Date:</P>
                <Calendar v-model="date" />
            </div>
        </Header>

        <LogItem class="mt-5" />
    </div>
</template>