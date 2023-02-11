<template>
    <v-dialog
        v-model="visible"
        :max-width="$props.maxWidth"
        persistent
    >
    <v-card>
        <v-card-title class="text-h5">
            {{  title }}
        </v-card-title>

        <slot name="modal-body"></slot>
        
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="close"
            >
            Save
            </v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        maxWidth: {
            type: Number,
            default: 400
        },
        beforeClose: {
            type: Function,
            default: () => 0
        },
        title: {
            type: String,
            default: 'Title of the modal'
        }
    },
    data() {
        return {
            visible: true
        }
    },
    methods: {
        close() {
            this.beforeClose();
            this.visible = false;
            this.$emit('close-popup');
        }
    }
})

</script>