<template>
    <SketchComponentModal
        title="Elbow method"
        :before-close="beforeClose"
    >

    <template v-slot:modal-body v-if="component.wrapper.isDataAvailable()">
        <v-text-field v-model="clusters" type="number" label="Max clusters number > 0" :rules="fieldRules"></v-text-field>
    </template>


    </SketchComponentModal>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import { SketchComponentModal  } from 'konect-api-vue'

import { SketchElbowMethodComponent } from '../../dataframe/SketchElbowMethodComponent';

export default defineComponent({
    props: {
        component: {
            required: true,
            type: SketchElbowMethodComponent
        }
    },
    data() {
        return {
            clusters: this.component.maxClusters,
            fieldRules: [
                (value: number) => value > 0
            ]
        }
    },
    components: {
        SketchComponentModal
    },

    methods: {
        beforeClose() {
            this.component.setMaxClusters(this.clusters);
        }
    }
});

</script>