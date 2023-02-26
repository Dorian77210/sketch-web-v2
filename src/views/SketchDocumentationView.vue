<template>
    <div class="app-bg">
        <div
            style="border-bottom: 1px solid white"
        >
            <SketchNavBar />
        </div>

        <SketchComponentListDoc /> 
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import SketchNavBar from '@/sketch/app/ui/common/SketchNavBar.vue';

import SketchComponentListDoc from '@/sketch/app/ui/doc/SketchComponentListDoc.vue';

export default defineComponent({
    components: {
        SketchNavBar,
        SketchComponentListDoc,
    }
});

</script>