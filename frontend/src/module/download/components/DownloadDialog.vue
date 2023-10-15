<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { required, url, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const form = reactive({
    url: ''
})

const rules = {
    url: {
        required: helpers.withMessage("URL can't be empty", required),
        url: helpers.withMessage('Please provide valid URL', url),
    }
}

const validation = useVuelidate(rules, form)

async function fetch(e: Event) {
    e.preventDefault()
    if (!await validation.value.$validate()) return

    
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
            <Button type="submit" class="inline w-fit ml-auto">Fetch</Button>
        </div>
    </form>
</template>