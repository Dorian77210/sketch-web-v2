<template>
    <div class="d-flex" id="sketch-view">
        <SketchComponentList :board-manager="sketchBoardManager" />
        <SketchBoard :board-manager="sketchBoardManager" />
        <SketchMessages />

        <v-progress-circular
            v-if="spinnerVisible"
            indeterminate
            color="green"
            id="spinner"
        ></v-progress-circular>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import SketchComponentList from '@/sketch/app/ui/SketchComponentList.vue';
import SketchBoard from '@/sketch/app/ui/SketchBoard.vue';
import SketchMessages from '@/sketch/app/ui/SketchMessages.vue';

import SketchBoardManager from '@/sketch/app/core/sketch-board-manager';
import { registerConfigurations } from '@/sketch/api/sketch-component-configuration-manager';

import bus from '@/sketch/app/core/bus';

export default defineComponent({
    components: {
        SketchComponentList,
        SketchBoard,
        SketchMessages
    },
    data() {
        return {
            sketchBoardManager: new SketchBoardManager(),
            spinnerVisible: false
        }
    },
    beforeCreate() {
        registerConfigurations();
        bus.on('start-execution', () => {
            this.spinnerVisible = true;
        });

        bus.on('end-execution', () => {
            this.spinnerVisible = false;
        });
    }
});


</script>

<style>

#sketch-view {
    margin: auto;
    position: relative;
}

#spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

</style>