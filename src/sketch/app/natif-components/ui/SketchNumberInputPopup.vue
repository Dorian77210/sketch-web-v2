<template>
    <SketchComponentModal
        :before-close="beforeClose"
        title="Configuration of the input"
    >
        <template v-slot:modal-body>
            <v-text-field v-model="inputValue" type="number" label="Input value"></v-text-field>
        </template>
    </SketchComponentModal>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

import SketchNumberInputComponent from '../SketchNumberInputComponent';

import { SketchComponentModal  } from 'konect-api-vue'

export default defineComponent({
    components: {
        SketchComponentModal
    },
    props: {
        component: {
            required: true,
            type: Object as PropType<SketchNumberInputComponent>
        }
    },
    data() {
        return {
            visible: true,
            inputValue: this.component.getValue()?.toString() || ''
        }
    },
    methods: {
        beforeClose() {
            this.component.setValue(parseFloat(this.inputValue));
        }
    }
})

</script>