<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Button } from '@/components/ui/button';

import Nav from './Nav.vue';

const route = useRoute()
</script>

<template>
    <div class="flex">
        <div class="h-screen bg-primary flex flex-col">
            <Nav to="/" tooltip="Downloads">
                <i-fluent-document-multiple-16-regular
                    :class="`text-2xl p-0 text-primary-foreground ${route.path === '/' ? 'brightness-100' : 'brightness-75 group-hover:brightness-100'}`" />
            </Nav>
            <Nav to="/log" tooltip="Logs">
                <i-fluent-bug-16-regular
                    :class="`text-2xl p-0 text-primary-foreground ${route.path === '/log' ? 'brightness-100' : 'brightness-75 group-hover:brightness-100'}`" />
            </Nav>
            <Nav to="/setting" tooltip="Settings">
                <i-fluent-settings-16-regular
                    :class="`text-2xl p-0 text-primary-foreground ${route.path === '/setting' ? 'brightness-100' : 'brightness-75 group-hover:brightness-100'}`" />
            </Nav>
        </div>
        <div class="w-[0.4px] bg-primary brightness-75 h-screen"></div>
    </div>
</template>