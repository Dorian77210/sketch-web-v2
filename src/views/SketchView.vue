<template>
    <div class="d-flex" id="sketch-view">
        <SketchComponentList :board-manager="sketchBoardManager" />
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import SketchComponentList from '@/sketch/app/ui/SketchComponentList.vue';
import SketchBoardManager from '@/sketch/app/core/sketch-board-manager';
import { registerConfigurations } from '@/sketch/api/sketch-component-configuration-manager';

export default defineComponent({
    components: {
        SketchComponentList,
    },
    data() {
        return {
            sketchBoardManager: new SketchBoardManager()
        }
    },
    beforeCreate() {
        registerConfigurations();
    }
});


</script>

<style>

#sketch-view {
    margin: auto;
}

</style>