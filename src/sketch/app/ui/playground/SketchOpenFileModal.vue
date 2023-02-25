<template>
    <SketchComponentModal
        title="Save file as ..."
        :before-close="() => onReceivedFile(file)"
        @close-popup="onClose"
    >
        <template v-slot:modal-body>
            <v-file-input
                :accept="`.${extension}`"
                placeholder="Choose CSV file"
                prepend-icon="mdi-paperclip"
                label="Konect file"
                @change="updateFile"
                ref="upload"
            >
            </v-file-input>
        </template>
    </SketchComponentModal>
</template>

<script lang="ts">

import { opt } from 'konect-api-types';
import { SketchComponentModal  } from 'konect-api-vue'

import { defineComponent } from 'vue';

import { SAVE_EXTENSION } from '../../core/save';

export default defineComponent({
    components: {
        SketchComponentModal
    },
    props: {
        onReceivedFile: {
            required: true,
            type: Function
        },
        onClose: {
            required: true,
            type: Function
        }
    },
    data() {
        return {
            file: opt<File>(),
            extension: SAVE_EXTENSION
        }
    },
    methods: {
        updateFile() {
            const upload = this.$refs.upload as HTMLInputElement;

            if (upload.files) {
                this.file = upload.files[0];
            }
        }
    }
});

</script>