<template>
    <SketchComponentModal
        :before-close="beforeClose"
        title="Configuration of the input"
    >
        <template v-slot:modal-body>
            <v-file-input
                accept=".csv"
                placeholder="Choose CSV file"
                prepend-icon="mdi-paperclip"
                label="CSV file"
                @change="updateFile"
                ref="upload"
            >

            </v-file-input>
        </template>
    </SketchComponentModal>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

import { SketchDataframeFromCSVComponent } from '../../dataframe/SketchDataframeFromCSVComponent';

import { SketchComponentModal  } from 'konect-api-vue'

export default defineComponent({
    components: {
        SketchComponentModal
    },
    props: {
        component: {
            required: true,
            type: Object as PropType<SketchDataframeFromCSVComponent>
        }
    },
    data() {
        return {
            file: this.component.wrapper.getData()
        }
    },
    methods: {
        beforeClose() {
            if (this.file) {
                this.component.setCSVFile(this.file as File);
            }
        },
        updateFile() {
            const upload = this.$refs.upload as HTMLInputElement;

            if (upload.files) {
                this.file = upload.files[0];
            }
        }
    },
})

</script>