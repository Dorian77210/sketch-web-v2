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

        <SketchSaveModal :save-board="_saveBoard" :on-close="() => needFilenameForSave = false" v-if="needFilenameForSave" />
        <SketchOpenFileModal :on-close="() => needToOpenFile = false" :on-received-file="_onReceivedFile" v-if="needToOpenFile" />
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import SketchComponentList from '@/sketch/app/ui/playground/SketchComponentList.vue';
import SketchBoard from '@/sketch/app/ui/playground/SketchBoard.vue';
import SketchMessages from '@/sketch/app/ui/playground/SketchMessages.vue';
import SketchBoardNavbar from '@/sketch/app/ui/playground/SketchBoardNavbar.vue';

import SketchBoardManager from '@/sketch/app/core/sketch-board-manager';

import { registerConfigurations } from '@/sketch/app/core/sketch-component-configuration-manager';

import SketchNavigationDrawer from '@/sketch/app/ui/playground/SketchNavigationDrawer.vue';

import bus from '@/sketch/app/core/bus';

import SketchSaveModal from '@/sketch/app/ui/playground/SketchSaveModal.vue';
import SketchOpenFileModal from '@/sketch/app/ui/playground/SketchOpenFileModal.vue';

export default defineComponent({
    components: {
        SketchComponentList,
        SketchBoard,
        SketchMessages,
        SketchNavigationDrawer,
        SketchBoardNavbar,
        SketchSaveModal,
        SketchOpenFileModal
    },
    data() {
        return {
            sketchBoardManager: new SketchBoardManager(),
            spinnerVisible: false,
            needFilenameForSave: false,
            needToOpenFile: false
        }
    },
    methods: {
        onSaveBoard() {
            const filename = this.sketchBoardManager.saveFilename;
            console.log('filename = ' + filename);
            if (filename === '') {
                this.needFilenameForSave = true;
            } else {
                this._saveBoard(filename);
            }
        },
        onSaveBoardAs() {
            this.needFilenameForSave = true;
        },
        onOpenFile() {
            this.needToOpenFile = true;
        },

        _saveBoard(filename: string) {
            this.needFilenameForSave = false;
            if (filename) {
                this.sketchBoardManager.saveFilename = filename;
                this.sketchBoardManager.saveBoard();
            }
        },


        async _onReceivedFile(file: File | undefined) {
            this.needToOpenFile = false;
            if (file) {
                const fileContent = await file.text();
                const saveReconstitution = this.sketchBoardManager.reconstructWorkflow(fileContent);

                console.log(saveReconstitution);

                bus.emit('save-reconstitution', saveReconstitution);
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

        // open file events
        bus.on('open-file', () => this.onOpenFile());
    }
});


</script>

<style>

#sketch-view {
    margin: auto;
    position: relative;
    bottom: 0;
    left: 0;
}

#spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

</style>