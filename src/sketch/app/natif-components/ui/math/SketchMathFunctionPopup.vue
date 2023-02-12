<template>
    <SketchComponentModal
        title="Sequence configuration"
        :beforeClose="beforeClose"
    >
        <template v-slot:modal-body>
            <v-select
                label="Function name"
                :items="functionNames"
                v-model="name"
            >
            </v-select>
        </template>
    </SketchComponentModal>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import SketchComponentModal from '@/sketch/api/ui/SketchComponentModal.vue';

import { SketchMathFunctionComponent } from '../../math/SketchMathFunctionComponent';

export default defineComponent({
    components: {
        SketchComponentModal
    },
    data() {
        return {
            name: this.component.functionName,
        }
    },
    props: {
        component: {
            required: true,
            type: Object as PropType<SketchMathFunctionComponent>
        }
    },

    methods: {
        beforeClose() {
            this.component.setFunctionName(this.name);
        }
    },
    computed: {
        functionNames() : Array<string>{
            return Array.from(SketchMathFunctionComponent.FUNCTIONS_AVAILABLE.keys());
        }
    }
});

</script>