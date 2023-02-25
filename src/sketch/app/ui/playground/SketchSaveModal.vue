<template>
    <SketchComponentModal
        title="Save file as ..."
        :before-close="() => saveBoard(filename)"
        @close-popup="onClose"
    >
        <template v-slot:modal-body>
            <v-text-field
                label="Name of the file..."
                v-model="filename"
            >
            </v-text-field>
        </template>
    </SketchComponentModal>
</template>

<script lang="ts">

import { SketchComponentModal  } from 'konect-api-vue'

import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        SketchComponentModal
    },
    props: {
        saveBoard: {
            required: true,
            type: Function
        },
        onClose: {
            required: true,
            type: Function
        }
    },
    data() {
        return {
            filename: ''
        }
    }
});

</script>