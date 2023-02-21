<template>
    <SketchBoardNavbar />
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
        <SketchNavigationDrawer />

        <SketchSaveModal :save-board="_saveBoard" v-if="needFilenameForSave" />
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import SketchComponentList from '@/sketch/app/ui/playground/SketchComponentList.vue';
import SketchBoard from '@/sketch/app/ui/playground/SketchBoard.vue';
import SketchMessages from '@/sketch/app/ui/playground/SketchMessages.vue';
import SketchBoardNavbar from '@/sketch/app/ui/playground/SketchBoardNavbar.vue';

import SketchBoardManager from '@/sketch/app/core/sketch-board-manager';
import { registerConfigurations } from '@/sketch/api/sketch-component-configuration-manager';

import SketchNavigationDrawer from '@/sketch/app/ui/playground/SketchNavigationDrawer.vue';

import bus from '@/sketch/app/core/bus';

import SketchSaveModal from '@/sketch/app/ui/playground/SketchSaveModal.vue';

export default defineComponent({
    components: {
        SketchComponentList,
        SketchBoard,
        SketchMessages,
        SketchNavigationDrawer,
        SketchBoardNavbar,
        SketchSaveModal
    },
    data() {
        return {
            sketchBoardManager: new SketchBoardManager(),
            spinnerVisible: false,
            needFilenameForSave: false
        }
    },
    methods: {
        onSaveBoard() {
            const filename = this.sketchBoardManager.saveFilename;
            if (!filename) {
                this.needFilenameForSave = true;
            } else {
                this._saveBoard(filename);
            }
        },
        onSaveBoardAs() {
            console.log('Save board as');
        },

        _saveBoard(filename: string) {
            this.needFilenameForSave = false;
            if (filename) {
                this.sketchBoardManager.saveFilename = filename;
                this.sketchBoardManager.saveBoard();
            }
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

        // saving event
        bus.on('save-board', () => this.onSaveBoard());
        bus.on('save-board-as', () => this.onSaveBoardAs());
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