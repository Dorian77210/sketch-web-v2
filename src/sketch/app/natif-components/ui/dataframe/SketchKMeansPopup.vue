<template>
    <SketchComponentModal
        title="KMeans"
        :before-close="beforeClose"
    >

    <template v-slot:modal-body v-if="component.wrapper.isDataAvailable()">
        <v-text-field v-model="clusters" type="number" label="Clusters number"></v-text-field>
    </template>


    </SketchComponentModal>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import { SketchComponentModal  } from 'konect-api-vue'

import { SketchKMeansComponent } from '../../dataframe/SketchKMeans';

export default defineComponent({
    props: {
        component: {
            required: true,
            type: SketchKMeansComponent
        }
    },
    data() {
        return {
            clusters: this.component.clusters
        }
    },
    components: {
        SketchComponentModal
    },

    methods: {
        beforeClose() {
            this.component.setClusters(this.clusters);
        }
    }
});

</script>