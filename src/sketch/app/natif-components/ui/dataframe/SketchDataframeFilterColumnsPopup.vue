<template>
    <SketchComponentModal
        title="Dataframe columns filter"
        :min-width="600"
    >

    <template v-slot:modal-body>
        <SketchColumnSelector
            :selectedColumns="component.selectedColumns"
            :unselectedColumns="dataframeHeaders"
            :on-select="onSelect"
            :on-unselect="onUnselect"
            :on-select-all="onSelectAll"
            :on-unselect-all="onUnselectAll"
        />
    </template>

    </SketchComponentModal>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import SketchComponentModal from '@/sketch/api/ui/SketchComponentModal.vue';

import { SketchDataframeFilterColumnsComponent } from '../../dataframe/SketchDataframeFilterColumnsComponent';

import SketchColumnSelector from '@/sketch/api/ui/SketchColumnSelector.vue';

export default defineComponent({
    props: {
        component: {
            required: true,
            type: SketchDataframeFilterColumnsComponent
        }
    },
    components: {
        SketchComponentModal,
        SketchColumnSelector
    },
    methods: {
        onSelect(col: string) {
            //
        },
        onUnselect(col: string) {
            //
        },
        onSelectAll() {
            //
        },
        onUnselectAll() {
            //
        }
    },
    computed: {
        dataframeHeaders() : Array<string> {
            return this.component.dataframe ? this.component.dataframe.listColumns() : [];
        }
    }
});

</script>