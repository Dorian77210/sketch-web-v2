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

import { defineComponent, PropType } from 'vue';

import { SketchComponentModal  } from 'konect-api-vue'

import { SketchDerivativeFunctionComponent } from '../../math/SketchDerivativeFunctionComponent';
import { SketchCustomFunctionComponent } from '../../math/SketchCustomFunctionComponent';

type MathComponent = SketchCustomFunctionComponent | SketchDerivativeFunctionComponent

export default defineComponent({
    props: {
        component: {
            required: true,
            type: Object as PropType<MathComponent>
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