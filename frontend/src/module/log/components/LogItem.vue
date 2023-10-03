<script setup lang="ts">
import Cato from '@/assets/images/cato.svg'
import { computed, ref } from 'vue';
import P from '@/components/ui/P.vue';
import { useRouteQuery } from '@vueuse/router';
import { Separator } from 'radix-vue';

const search = useRouteQuery('search', '')

const logs = ref<string[]>([
    'sit amet, consectetur adipisicing elit. Laboriosam odio quos neque omnis soluta a enim pariatur eos iusto magnam, nobis modi officia deleniti non repellendus consectetur eveniet at dolores?', 
    'Lorem ipsum dolor sit amet, consectetur adipisicing  iusto magnam, nobis modi officia deleniti non repellendus consectetur eveniet at dolores?', 
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam odio quos neque omnis  eos iusto magnam, nobis modi officia deleniti non repellendus consectetur eveniet at dolores?', 
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam odio quos neque omnis soluta a enim pariatur modi officia deleniti non repellendus consectetur eveniet at dolores?', 
    'Lorem ipsum dolor sit amet, consectetur adipisicing  pariatur repellendus consectetur eveniet at dolores?', 
    'consectetur adipisicing elit. Laboriosam odio quos neque omnis soluta a enim pariatur eos iusto magnam repellendus consectetur eveniet at dolores?', 
    'odio quos neque omnis soluta a enim pariatur eos iusto magnam, nobis modi officia deleniti non repellendus consectetur eveniet at dolores?', 
    'elit. Laboriosam odio quos neque omnis soluta a enim pariatur eos iusto magnam', 
])

const items = computed(() => logs.value.filter(log => log.toLowerCase().includes(search.value.toLowerCase())))

</script>

<template>
    
    <div :class="`${!items || items.length === 0 ? '' : 'bg-secondary border border-muted mb-3 rounded-md p-2'}`">
        <div v-if="items.length === 0" class="w-fit mx-auto">
            <img :src="Cato" alt="empty" class="mx-auto my-auto w-[20rem] h-screen -mt-[5rem]">
        </div>
        <div v-else class="w-fit flex flex-col px-2">
            <div v-for="(item, i) in items" :key="i" class="flex gap-2 mb-4">
                <span class="text-base font-medium font-mono">> </span>
                <span class="text-left [&:not(:first-child)]:mt-0 text-sm xl:w-[75rem] font-mono">{{ item }}</span>
            </div>
        </div>
    </div>
</template>