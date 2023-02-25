<template>
    <SketchComponentModal
        title="Dataframe viewer"
        :max-width="1000"
        :max-height="1000"
    >

    <template v-slot:modal-body v-if="component.wrapper.isDataAvailable()">
        <SketchDataframeViewer :dataframe="dataframe" />
    </template>

    </SketchComponentModal>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import { SketchComponentModal  } from 'konect-api-vue'

import { SketchDataframeViewerComponent } from '../../dataframe/SketchDataframeViewerComponent';

import DataFrame from 'dataframe-js';

import SketchDataframeViewer from './SketchDataframeViewer.vue';

export default defineComponent({
    props: {
        component: {
            required: true,
            type: SketchDataframeViewerComponent
        }
    },
    data() {
        return {
            chunkSize: 20,
            page: 1,
            fieldRules: [
                (value: number) => value > 0
            ]
        }
    },
    components: {
        SketchComponentModal,
        SketchDataframeViewer
    },
    computed: {
        dataframe() : DataFrame {
            return this.component.wrapper.getData() as DataFrame;
        }
    }

});

</script>