<template>
    <div id="doc-container">
        <v-card
            color="rgb(38,48,66)"
            style="color: white;"
        >
            <template v-slot:title>
                <v-icon icon="mdi-view-dashboard-outline"></v-icon>
                Available Components
            </template>
              
            <v-text-field
                label="Component search"
                v-model="search"           
            ></v-text-field>
            
            <router-link
                v-for="(config, index) in filteredConfigurations"
                :key="index"
                :to="{ name: 'component-doc', params: { componentName: componentsClass[index].name }}"
                class="white no-style doc-link"
            >
                <v-list-item
                    class="doc-item"
                >
                    <font-awesome-icon :icon="`fa-solid ${config.icon.name}`"></font-awesome-icon>
                    <span class="pl-4">{{ config.name }}</span>
                </v-list-item>
            </router-link>
        </v-card>
    </div>
</template>

<script lang="ts">

import { ComponentConfiguration } from 'konect-api-types-ts';
import { defineComponent } from 'vue';

import { getConfigurations } from '../../core/sketch-component-configuration-manager';

export default defineComponent({
    data() {
        return {
            configurations: Array.from(getConfigurations().values()),
            componentsClass: Array.from(getConfigurations().keys()),
            search: '',
        }
    },
    computed: {
        filteredConfigurations() : Array<ComponentConfiguration> {
            return this.configurations.filter(conf => conf.name.toLowerCase().includes(this.search.toLowerCase()));
        }
    }
});

</script>

<style>

#doc-container {
    width: 20%;
    min-height: 90vh;
    max-height: 90vh;
    overflow: scroll;
}

.doc-item:hover {
    cursor: pointer;
    background-color: red;
}

.doc-link:hover {
    color: inherit;
}

</style>