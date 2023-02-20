<template>
    <SketchComponentModal
        title="Name of file"
        :before-close="beforeClose"
    >

    <template v-slot:modal-body>
        <v-text-field v-model="filename" label="File name">

        </v-text-field>
    </template>


    </SketchComponentModal>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import SketchComponentModal from '@/sketch/api/ui/SketchComponentModal.vue';

import { SketchDataframeToCSVComponent } from '../../dataframe/SketchDataframeToCSVComponent';


export default defineComponent({
    props: {
        component: {
            required: true,
            type: SketchDataframeToCSVComponent
        }
    },
    data() {
        return {
            filename: this.component.filename,
        }
    },
    components: {
        SketchComponentModal
    },
    methods: {
        beforeClose() {
            this.component.setFilename(this.filename);
        }
    }
});

</script>