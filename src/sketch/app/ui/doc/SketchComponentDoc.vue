<template>
    <div class="white" id="component-doc">
        {{ componentName }}
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({

    data() {
        return {
            componentName: this.$route.params.componentName
        }
    }
});

</script>

<style scoped>

#component-doc {
    border-left: 1px solid white;
}

</style>