<script setup lang="ts">
import { Type } from '../types'

defineProps<{
    type?: Type
}>()
</script>

<template>
    <div v-if="type === 'Document' ">
        <i-fluent-document-text-16-regular class="group-hover:hidden mx-auto" />
        <i-fluent-document-text-16-filled class="hidden group-hover:block mx-auto" />
    </div>
    <div v-if="type === 'Video' ">
        <i-fluent-video-clip-16-regular class="group-hover:hidden mx-auto" />
        <i-fluent-video-clip-16-filled class="hidden group-hover:block mx-auto" />
    </div>
    <div v-if="type === 'Audio' ">
        <i-fluent-speaker-16-regular class="group-hover:hidden mx-auto" />
        <i-fluent-speaker-16-filled class="hidden group-hover:block mx-auto" />
    </div>
    <div v-if="type === 'Compressed' ">
        <i-fluent-folder-zip-16-regular class="group-hover:hidden mx-auto" />
        <i-fluent-folder-zip-16-filled class="hidden group-hover:block mx-auto" />
    </div>
    <div v-if="type === 'Image' ">
        <i-fluent-image-16-regular class="group-hover:hidden mx-auto" />
        <i-fluent-image-16-filled class="hidden group-hover:block mx-auto" />
    </div>
    <div v-if="type === 'Other' ">
        <i-fluent-document-16-regular class="group-hover:hidden mx-auto" />
        <i-fluent-document-16-filled class="hidden group-hover:block mx-auto" />
    </div>
</template>