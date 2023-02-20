<template>
    <SketchComponentModal
        title="Custom function"
        :before-close="beforeClose"
    >

    <template v-slot:modal-body>
        <v-text-field v-model="customFunction" label="Example: x^2 + 3x">
        </v-text-field>
    </template>

    </SketchComponentModal>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import SketchComponentModal from '@/sketch/api/ui/SketchComponentModal.vue';

import { SketchCustomFunctionComponent } from '../../math/SketchCustomFunctionComponent';

export default defineComponent({
    props: {
        component: {
            required: true,
            type: SketchCustomFunctionComponent
        }
    },
    data() {
        return {
            customFunction: this.component.customFunction
        }
    },
    components: {
        SketchComponentModal
    },

    methods: {
        beforeClose() {
            this.component.setCustomFunction(this.customFunction)
        }
    }
});

</script>