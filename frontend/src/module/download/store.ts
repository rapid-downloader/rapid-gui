import { Progress } from '@/plugins/ws'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProgressbar = defineStore('progressbar', () => {
    const progress = ref<Progress>({
        id: '',
        index: 0,
        downloaded: 0,
        size: 0,
        progress: 0,
        done: false
    })

    function updateProgress(val: Progress) {
        progress.value = val
    }

    return {
        progress,
        updateProgress
    }
})