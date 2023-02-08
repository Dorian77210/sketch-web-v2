<template>
    <div>
        
    </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

import { SketchNumberInputComponent } from '../SketchNumberInputComponent';

export default defineComponent({
    props: {
        component: {
            required: true,
            type: Object as PropType<SketchNumberInputComponent>
        }
    }
})

</script>