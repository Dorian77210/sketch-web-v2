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

import SketchComponentModal from '@/sketch/api/ui/SketchComponentModal.vue';

import { SketchDataframeViewerComponent } from '../../dataframe/SketchDataframeViewerComponent';

import DataFrame from 'dataframe-js';
import SketchWrapper from '@/sketch/api/sketch-wrapper';

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
        headers() : string[] {
            const wrapper: SketchWrapper<DataFrame> = this.component.wrapper;
            
            if (!wrapper.isDataAvailable()) {
                return [];
            }

            const dataframe = wrapper.getData() as DataFrame;

            return dataframe.listColumns();
        },
        dimensions() : Array<number> {
            const dataframe: DataFrame = this.component.wrapper.getData() as DataFrame;
            console.log(dataframe.toArray());
            return dataframe.dim();
        },
        pageCount() : number {
            let count = this.dimensions[0] / this.chunkSize;
            if ((this.dimensions[0] % this.chunkSize) !== 0) {
                count++;
            }

            return Math.floor(count);
        },
        dataChunks() : Array<unknown> {
            const dataframe: DataFrame = this.component.wrapper.getData() as DataFrame;

            const begin = (this.page - 1) * this.chunkSize;
            let end = this.page * this.chunkSize;
            
            if (end > this.dimensions[0]) {
                end = this.dimensions[0];
            }

            return dataframe.toArray().slice(begin, end);
        },
        dataframe() : DataFrame {
            return this.component.wrapper.getData() as DataFrame;
        }
    }

});

</script>