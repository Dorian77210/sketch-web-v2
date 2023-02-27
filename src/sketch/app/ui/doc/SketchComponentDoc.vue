<template>
    <div class="white" id="component-doc">
        <v-breadcrumbs :items="items" class="no-hover">
            <template v-slot:prepend>
                <v-icon size="small" icon="mdi-link"></v-icon>
            </template>
        </v-breadcrumbs>
        <div v-if="docAsComponentDocumentation" class="ml-10">
            <div class="w-75">
                <h4 class="ml-4">Description of the component</h4>
                <p class="ml-4">{{ docAsComponentDocumentation.description }}</p>
            </div>

            <div v-if="docAsComponentDocumentation.slotsDocumentation" class="ml-4">
                <h4>Description of the inputs</h4>
                <ul>
                    <li v-for="(slotDoc, index) in docAsComponentDocumentation.slotsDocumentation" :key="index">
                        {{  slotDoc.name }} : {{ slotDoc.description }}. Corresponding type : {{ slotDoc.type }}
                    </li>
                </ul>
            </div>

            <div v-if="docAsComponentDocumentation.output" class="ml-4">
                <h4>Description of the output</h4>
                <p>Output name : {{ docAsComponentDocumentation.output.name }}</p>
                <p>Type of the output : {{  docAsComponentDocumentation.output.type }} </p>
                <p>Description : {{ docAsComponentDocumentation.output.description }}</p>
            </div>

        </div>


        <div v-else-if="docAsComponent">
            <component :is="docAsComponent">

            </component>
        </div>


        <div v-else>
            No documentation found
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent, Component } from 'vue';

import { getDocumentationOf } from '../../core/sketch-component-configuration-manager';

import { ComponentDocumentation } from 'konect-api-types-ts';

export default defineComponent({

    data() {
        return {
            componentName: this.$route.params.componentName,
            items: [{
                title: 'Documentation',
                disabled: false,
            }, {
                title: this.$route.params.componentName,
                disabled: false,
            }],
            docAsComponent: getDocumentationOf(this.$route.params.componentName as string) as Component,
            docAsComponentDocumentation: getDocumentationOf(this.$route.params.componentName as string) as ComponentDocumentation
        }
    },
    computed: {
    }
});

</script>

<style scoped>

#component-doc {
    border-left: 1px solid white;
}

.no-hover *:hover {
    color: inherit;
    text-decoration: none;
}

</style>