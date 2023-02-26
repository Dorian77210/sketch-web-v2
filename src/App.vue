<template>
    <router-view/>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import { registerConfigurations } from '@/sketch/app/core/sketch-component-configuration-manager';

export default defineComponent({
    created() {
        registerConfigurations();
    }
});

</script>