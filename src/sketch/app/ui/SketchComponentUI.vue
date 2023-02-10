<template>
    <div ref="ui">
        <Vue3DraggableResizable class="component-ui text-center"
            :initW="componentUIConfiguration.width"
            :initH="componentUIConfiguration.height"
            v-model:x="componentUIConfiguration.x"
            v-model:y="componentUIConfiguration.y"
            :active="true"
            :draggable="true"
            :resizable="false"
            :dragging="$emit('on-drag', $props.component)"
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
                    <span class="align-text-bottom noselect">{{ configuration.name }}</span>
                    <br/>
                    <font-awesome-icon icon="fa-solid fa-play"></font-awesome-icon>
                </div>
            </div>

            <div v-if="outputSlotModel" class="slot-container d-flex flex-column"
                @click="selectSlot($event, outputSlotModel as ComponentSlotModel)"
            >
                <div
                    class="slot output-slot"
                    :class="{ 'selected-slot': outputSlotModel.isSelected }"
                    ref="outputSlotUI"
                >
                    <pre></pre>
                </div>
            </div>
        </div>
        </Vue3DraggableResizable>
    </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

import Vue3DraggableResizable from 'vue3-draggable-resizable';
import { ComponentConfiguration } from '@/sketch/api/component-configuration';

import { ComponentSlotModel } from './utils';
import SketchComponent from '@/sketch/api/sketch-component';
import { opt } from '@/sketch/api/types';

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
                y: this.$props.y
            },
            inputSlotModels: Array<ComponentSlotModel>(),
            outputSlotModel: opt<ComponentSlotModel>(),
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
    methods: {
        selectSlot(event: Event, slot: ComponentSlotModel) {
            this.$emit('on-slot-selected', slot, event.target as HTMLElement)
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

.slot-container {
    align-items: center;
    display: flex;
    justify-content: center;
    gap: 15%;
}

.slot {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
}

.input-slot {
    background-color: green;
}

.output-slot {
    background-color: black;
}

.slot:hover, .selected-slot
{
    background-color: red;
}

.component-ui
{
    background-color: #ceeaee;
    position: absolute;
}

</style>