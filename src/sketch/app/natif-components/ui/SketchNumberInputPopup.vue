<template>
    <v-dialog
    v-model="visible"
    max-width="400"
    persistent
  >
    <v-card>
        <v-card-title class="text-h5">
            Configure the input
        </v-card-title>
        <v-text-field v-model="inputValue" type="number" label="Input value"></v-text-field>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="close"
            >
            Save data
            </v-btn>
        </v-card-actions>
        </v-card>
  </v-dialog>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

import { SketchNumberInputComponent } from '../SketchNumberInputComponent';

export default defineComponent({
    name: 'NumberInputComponent',
    props: {
        component: {
            required: true,
            type: Object as PropType<SketchNumberInputComponent>
        }
    },
    data() {
        return {
            visible: true,
            inputValue: this.component.getValue() || 0
        }
    },

    methods: {
        close() {
            console.log('ok');
            this.visible = false;
            this.component.setValue(this.inputValue);
            this.$emit('close-popup');
        }
    },
})

</script>