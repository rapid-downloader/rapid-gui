<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { required, url, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import useDownload from '../api'
import { Download } from '@/module/home/types';
import { DialogClose } from 'radix-vue';

const emits = defineEmits<{
    (e: 'fetched', val: Download): void
    (e: 'download'): void
}>()

const form = reactive({
    url: ''
})

const rules = {
    url: {
        required: helpers.withMessage("URL can't be empty", required),
        url: helpers.withMessage('Please provide valid URL', url),
    }
}

const download = useDownload()

enum State {
    Init,
    Fetching,
    Fetched,
}

const validation = useVuelidate(rules, form)
const state = ref<State>(State.Init)
const result = ref<Download>()

async function fetch(e: Event) {
    e.preventDefault()
    state.value = State.Fetching

    if (!await validation.value.$validate()) {
        state.value = State.Init
        return
    }
    
    result.value = await download.fetch({
        provider: "default",
        url: form.url
    })

    if (result.value) {
        emits('fetched', result.value)
    }

    state.value = State.Fetched
}

async function doDownload(e: Event) {
    e.preventDefault()

    if (!await validation.value.$validate()) {
        state.value = State.Fetched
        return
    }
    
    if (result.value) {
        await download.download(result.value.id)
        emits('download')
    }
}

</script>

<template>
    <form v-if="state !== State.Fetched" @submit="fetch" class="flex flex-col gap-1">
        <Label>URL</Label>
        <div class="flex gap-3">
            <div class="w-full">
                <Input v-model="form.url" :class="`bg-secondary ${validation.$error ? 'border-destructive focus-visible:ring-destructive' : ''}`">
                    <template v-slot:append-icon>
                        <i-fluent-link-16-regular class="bg-secondary w-[1.75rem]" />
                    </template>
                </Input>
                <p v-for="error in validation.url.$errors" :key="error.$uid" class="pt-1 text-xs text-destructive">{{ error.$message }}</p>
            </div>
            <Button type="submit" class="flex justify-center w-[5rem] ml-auto">
                <i-svg-spinners-bars-fade v-if="state === State.Fetching" class="text-foreground"/>
                <p v-if="state === State.Init">Fetch</p>
            </Button>
        </div>
    </form>
    <form v-else @submit="doDownload" class="flex flex-col gap-1">
        <DialogClose>
            <Button type="submit" class="flex justify-center w-[5rem] ml-auto">
                Download
            </Button>
        </DialogClose>
    </form>
</template>