<template>
    <SketchComponentModal
        title="Dataframe union viewer"
        :max-width="1000"
        :max-height="2000"
    >

    <template v-slot:modal-body>
        <div class="d-flex flex-row">
            <div class="w-50">
                <SketchDataframeViewer :dataframe="leftDataframe" v-if="component.leftWrapper.isDataAvailable()"/>
            </div>
            <div class="w-50">
                <SketchDataframeViewer :dataframe="rightDataframe" v-if="component.rightWrapper.isDataAvailable()"/>
            </div>
        </div>
    </template>

    </SketchComponentModal>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import SketchComponentModal from '@/sketch/api/ui/SketchComponentModal.vue';

import { SketchDataframeUnionComponent } from '../../dataframe/SketchDataframeUnionComponent';

import DataFrame from 'dataframe-js';

import SketchDataframeViewer from './SketchDataframeViewer.vue';

export default defineComponent({
    props: {
        component: {
            required: true,
            type: SketchDataframeUnionComponent
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
        rightDataframe() : DataFrame {
            return this.component.rightWrapper.getData() as DataFrame;
        },
        leftDataframe() : DataFrame {
            return this.component.leftWrapper.getData() as DataFrame;
        }
    }

});

</script>