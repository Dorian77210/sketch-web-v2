<template>
    <SketchComponentModal
        title="Sequence configuration"
        :beforeClose="beforeClose"
    >
        <template v-slot:modal-body>
            <v-text-field v-model="begin" type="number" label="Sequence begin"></v-text-field>
            <v-text-field v-model="end" type="number" label="Sequence end"></v-text-field>
            <v-text-field v-model="step" type="number" label="Sequence step"></v-text-field>
        </template>
    </SketchComponentModal>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

import { SketchSequenceComponent } from '../../math/SketchSequenceComponent';

import SketchComponentModal from '@/sketch/api/ui/SketchComponentModal.vue';

export default defineComponent({
    components: {
        SketchComponentModal
    },
    props: {
        component: {
            required: true,
            type: Object as PropType<SketchSequenceComponent>
        }
    },
    data() {
        return {
            visible: true,
            begin: this.component.getSequenceData().begin.toString(),
            end: this.component.getSequenceData().end.toString(),
            step: this.component.getSequenceData().step.toString()
        }
    },

    methods: {
        beforeClose() {
            this.component.getSequenceData().begin = parseFloat(this.begin);
            this.component.getSequenceData().end = parseFloat(this.end);
            this.component.getSequenceData().step = parseFloat(this.step);
        }
    },
})

</script>