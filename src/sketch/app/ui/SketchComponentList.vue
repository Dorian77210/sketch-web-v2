<template>
    <aside id="component-list" class="border border-dark p-3">
        <h6>List of available components</h6>
        <input type="text" placeholder="Search components..." v-model="componentFilter"/>
        <div class="d-flex flex-column">
            <div class="w-100 mt-4" v-for="(configurations, namespace, index) in configurationsByNamespaces" :key="index">
                <h6>{{ namespace }} components</h6>
                <div class="d-flex flex-wrap collapse collapse-horizontal" :id="`collapse${namespace}`">
                    <div v-for="(configuration, configIndex) in configurations" :key="configIndex"
                    class="d-flex flex-column component-list-item"
                    >
                        <font-awesome-icon :icon="`fa-solid ${configuration.icon.name}`"></font-awesome-icon>
                        <span class="text-center">{{ configuration.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import SketchBoardManager from '@/sketch/app/core/sketch-board-manager';

import { getConfigurations } from '@/sketch/api/sketch-component-configuration-manager';
import { ComponentConfiguration } from '@/sketch/api/component-configuration';

interface ConfigurationsByNamespace {
    [name: string]: Array<ComponentConfiguration>;
}

export default defineComponent({
    props: {
        boardManager: {
            required: true,
            type: SketchBoardManager
        }
    },
    data() {
        return {
            configurations: getConfigurations(),
            componentFilter: ''
        }
    },
    computed: {
        configurationsByNamespaces() : ConfigurationsByNamespace {
            const configs: ConfigurationsByNamespace = {};

            // retrieve all namespaces
            const namespaces: Array<string> = [];
            this.configurations.forEach(configuration => {
                const currentNamespace: string = configuration.namespace;
                if (!namespaces.includes(currentNamespace)) {
                    namespaces.push(currentNamespace);
                }
            })

            namespaces.forEach(namespace => {
                const associatedConfigurations: Array<ComponentConfiguration> = Array.from(this.configurations.values())
                    .filter(config => config.namespace === namespace &&
                        config.name.toLowerCase().includes(this.componentFilter.toLowerCase())
                    )

                configs[namespace] = associatedConfigurations;
            })

            return configs;
        }
    },
})

</script>

<style>

#component-list {
    min-height: 100vh;
    width: calc(100%/4);
    overflow-y: scroll;
}

.component-list-item {
    width: calc(100% / 3);
    border: solid 1px #ceeaee;
    padding-top: 15px;
    padding-bottom: 15px;
}

.component-list-item:hover {
    cursor: pointer;
    background-color: #ceeaee;
}

</style>