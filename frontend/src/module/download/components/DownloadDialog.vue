<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { required, url, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import useDownload from '../api'
import { Download } from '@/module/home/types';

const emit = defineEmits<{
    (e: 'onFetched', val: Download): void
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

const loading = ref(false)
const download = useDownload()

const validation = useVuelidate(rules, form)

async function fetch(e: Event) {
    e.preventDefault()
    loading.value = true

    if (!await validation.value.$validate()) {
        loading.value = false
        return
    }
    
    const result = await download.fetch({
        provider: "default",
        url: form.url
    })

    console.log(result);
    

    if (result) {
        emit('onFetched', result)
    }

    loading.value = false
}

</script>

<template>
    <form @submit="fetch" class="flex flex-col gap-1">
        <Label>URL</Label>
        <div class="flex gap-3">
            <div class="w-full">
                <Input v-model="form.url" class="bg-secondary">
                    <template v-slot:append-icon>
                        <i-fluent-link-16-regular class="bg-secondary w-[1.75rem]" />
                    </template>
                </Input>
                <p v-for="error in validation.url.$errors" :key="error.$uid" class="pt-1 text-xs text-destructive">{{ error.$message }}</p>
            </div>
            <Button type="submit" class="inline w-fit ml-auto">
                <i-svg-spinners-bars-fade v-if="loading" class="text-foreground"/>
                <p v-else>Fetch</p>
            </Button>
        </div>
    </form>
</template>