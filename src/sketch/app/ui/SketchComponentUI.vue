<template>
    <div ref="ui">
        <Vue3DraggableResizable class="component-ui text-center"
            :initW="componentUIConfiguration.width"
            :initH="componentUIConfiguration.height"
            v-model:x="componentUIConfiguration.x"
            v-model:y="componentUIConfiguration.y"
            :active="true"
            :draggable="true"
            :resizable="true"
            :dragging="$emit('on-drag', $props.component)"
            @click="$emit('on-component-selected', $props.component)"
            @dblclick="openPopupConfiguration"
            @deactivated="bus.emit('on-component-unselect')"
        >
        <div class="border-0 d-flex mh-100" style="height: 100%">            
            <div class="d-flex flex-column slot-container" v-if="inputSlotModels.length">
                <div 
                    v-for="(slotConfiguration, index) in inputSlotModels" :key="index"
                    class="slot input-slot"
                    :class="{ 'selected-slot': slotConfiguration.isSelected }"
                    data-toggle="tooltip" data-placement="left" :title="slotConfiguration.entryName"
                    @click="selectSlot($event, slotConfiguration as ComponentSlotModel)"
                >
                    <pre></pre>
                </div>
            </div>
            <div class="table p-1">
                <div class="row-fluid">
                    <span class="align-text-bottom noselect" contenteditable @input="updateComponentName">{{ componentName }}</span>
                    <br/>
                    <font-awesome-icon
                        icon="fa-solid fa-play"
                        class="play-icon"
                        @click="bus.emit('ask-for-execution', component)"    
                    ></font-awesome-icon>
                </div>
            </div>

            <div v-if="outputSlotModel" class="slot-container d-flex flex-column"
                @click="selectSlot($event, outputSlotModel as ComponentSlotModel)"
            >
                <font-awesome-icon
                    icon="fa-solid fa-play"
                    :style="{ 'color': outputSlotModel.isSelected ? 'red' : 'black' }"
                    class="play-icon"
                    style="height: 20px;"
                ></font-awesome-icon>
            </div>
        </div>
        </Vue3DraggableResizable>
        <component v-if="popupVisible"
            :is="popup"
            :component="$props.component"
            @close-popup="onClosePopup"
        ></component>
    </div>
</template>

<script lang="ts">

import { defineComponent, PropType, Component } from 'vue';

import Vue3DraggableResizable from 'vue3-draggable-resizable';
import { ComponentConfiguration } from '@/sketch/api/component-configuration';

import { ComponentSlotModel } from './utils';
import SketchComponent from '@/sketch/api/sketch-component';
import { opt } from '@/sketch/api/types';
import { getConfigurationOf } from '@/sketch/api/sketch-component-configuration-manager';
import { Class } from '@/sketch/api/types';

import bus from '../core/bus';

export default defineComponent({
    components: {
        Vue3DraggableResizable,
    },
    props: {
        x: {
            required: true,
            type: Number
        },
        y: {
            required: true,
            type: Number
        },
        configuration: {
            required: true,
            type: Object as PropType<ComponentConfiguration>
        },
        component: {
            required: true,
            type: Object as PropType<SketchComponent<unknown>>
        }
    },
    data() {
        return {
            componentUIConfiguration: {
                height: 130,
                width: 130,
                x: this.$props.x,
                y: this.$props.y,
            },
            inputSlotModels: Array<ComponentSlotModel>(),
            outputSlotModel: opt<ComponentSlotModel>(),
            popupVisible: false,
            componentName: this.configuration.name,
            editingName: true,
            bus
        }
    },
    beforeMount() {
        if (this.$props.configuration.slotsConfigurations) {
            const models: Array<ComponentSlotModel> = this.$props.configuration.slotsConfigurations.map(configuration => {
                return {
                    isSelected: false,
                    targetComponent: this.$props.component,
                    entryName: configuration.entryName,
                    type: 'in'
                }
            })

            this.inputSlotModels.push(...models);
        }

        if (this.$props.configuration.returnType) {
            this.outputSlotModel = {
                isSelected: false,
                targetComponent: this.$props.component,
                type: 'out'
            }
        }
    },
    computed: {
        popup() : Component {
            const configuration = getConfigurationOf(this.$props.component.constructor as Class<SketchComponent<unknown>>);
            return configuration.popup;
        }
    },
    methods: {
        selectSlot(event: Event, slot: ComponentSlotModel) {
            this.$emit('on-slot-selected', slot, event.target as HTMLElement)
        },
        openPopupConfiguration() : void {
            this.popupVisible = true;
        },
        updateComponentName(event: Event) {
            const element: HTMLElement = event.target as HTMLElement;
            this.componentName = element.innerText;
        },
        onClosePopup() {
            this.popupVisible = false;
            this.component.setIsDirty(true);
        },
        onFocusOut() {
            console.log('ok');
        }
    }
});

</script>

<style>

/* https://stackoverflow.com/questions/22196587/how-to-vertically-center-a-container-in-bootstrap */
.table{
    height:100%;
    display:table;
    width: 100%;
    padding: 0;
}

.row-fluid {height: 100%; display:table-cell; vertical-align: middle;}

</style>