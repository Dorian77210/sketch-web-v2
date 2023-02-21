<template>
    <SketchComponentModal
        title="Save file as ..."
        :before-close="() => saveBoard(filename)"
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

import SketchComponentModal from '@/sketch/api/ui/SketchComponentModal.vue';

import { defineComponent, PropType } from 'vue';

export default defineComponent({
    components: {
        SketchComponentModal
    },
    props: {
        saveBoard: {
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