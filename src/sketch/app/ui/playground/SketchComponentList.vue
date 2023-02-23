<template>
    <aside id="component-list" class="border border-dark p-3">
        <h6>List of available components</h6>
        <v-text-field
            label="Search components..."
            v-model="componentFilter"
        >
        </v-text-field>
        <div class="d-flex flex-column">
            <div class="w-100 mt-4" v-for="(configurations, namespace, index) in configurationsByNamespaces" :key="index">
                <h6>{{ namespace }} components</h6>
                <div class="d-flex flex-wrap collapse collapse-horizontal" :id="`collapse${namespace}`">
                    <div v-for="(sketchConfiguration, configIndex) in configurations" :key="configIndex"
                        class="d-flex flex-column component-list-item"
                        @click="onComponentSelected($event, sketchConfiguration.componentClass)"
                    >
                        <font-awesome-icon :icon="`fa-solid ${sketchConfiguration.configuration.icon.name}`"></font-awesome-icon>
                        <span class="text-center">{{ sketchConfiguration.configuration.name }}</span>
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

import { opt, GenericSketchComponentClass } from '@/sketch/api/types';

import bus from '../../core/bus';

type SketchComponentConfiguration = {
    configuration: ComponentConfiguration;
    componentClass: GenericSketchComponentClass;
}

interface ConfigurationsByNamespace {
    [name: string]: Array<SketchComponentConfiguration>;
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
            componentFilter: '',
            currentElementSelected: opt<HTMLElement>(),
            visible: false 
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
                const associatedConfigurations: Array<SketchComponentConfiguration> = new Array<SketchComponentConfiguration>();

                // filter components in the configurations maps
                this.configurations.forEach((configuration, componentClass) => {
                    if (configuration.name.toLowerCase().includes(this.componentFilter.toLowerCase()) && namespace === configuration.namespace) {
                        associatedConfigurations.push({
                            configuration,
                            componentClass
                        });
                    }
                })

                configs[namespace] = associatedConfigurations;
                if (configs[namespace].length === 0) {
                    delete configs[namespace];
                }
            })

            return configs;
        }
    },
    methods: {
        onComponentSelected(event: Event, selectedComponent: GenericSketchComponentClass) : void {
            if (this.currentElementSelected) {
                this.currentElementSelected.classList.remove('component-list-item-selected');
            }

            this.currentElementSelected = event.target as HTMLElement;
            while (!this.currentElementSelected.classList.contains('component-list-item')) {
                this.currentElementSelected = this.currentElementSelected.parentElement as HTMLElement;
            }
            
            this.currentElementSelected.classList.add('component-list-item-selected');
            this.$props.boardManager.setSelectedComponent(selectedComponent);
        },
        open() {
            this.visible = true;
        }
    },
    created() {
        bus.on('create-component', () => {
            this.currentElementSelected?.classList.remove('component-list-item-selected');
            this.currentElementSelected = undefined;
        })
    }
})

</script>

<style>

#component-list {
    max-height: 92vh;
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

.component-list-item-selected {
    background-color: #ceeaee;
}

</style>