<template>
    <router-view/>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import { registerConfigurations } from '@/sketch/app/core/sketch-component-configuration-manager';

import store from './store';

export default defineComponent({
    created() {
        store.dispatch('initMarketplace');
        registerConfigurations();
    }
});

</script>