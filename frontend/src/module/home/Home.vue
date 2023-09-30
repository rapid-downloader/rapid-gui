<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
</script>

<template>
    <div class="flex justify-between w-full">
        <div>
            <Button class="flex gap-2 py-4">
                <i-fluent-add-16-filled class="text-primary-foreground" />
            </Button>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">
                            Apple
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>

        <Input placeholder="Search" class="w-[20rem] rounded"></Input>
    </div>
</template>
