<template>
    <div class="d-flex" id="sketch-view">
        <SketchComponentList :board-manager="sketchBoardManager" />
        <SketchBoard :board-manager="sketchBoardManager" />
        <SketchMessages />
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import SketchComponentList from '@/sketch/app/ui/SketchComponentList.vue';
import SketchBoard from '@/sketch/app/ui/SketchBoard.vue';
import SketchMessages from '@/sketch/app/ui/SketchMessages.vue';

import SketchBoardManager from '@/sketch/app/core/sketch-board-manager';
import { registerConfigurations } from '@/sketch/api/sketch-component-configuration-manager';

export default defineComponent({
    components: {
        SketchComponentList,
        SketchBoard,
        SketchMessages
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