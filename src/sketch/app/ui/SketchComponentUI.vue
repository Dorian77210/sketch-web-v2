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
        >
        <div class="table border-0">            
            <div 
                v-if="configuration.slotsConfigurations" 
                class="row-fluid" 
                >
                <div 
                    v-for="(slotConfiguration, index) in configuration.slotsConfigurations" :key="index"
                    class="slot"
                    ref="inputSlotUI"
                >
                    <pre></pre>
                </div>
            </div>
            <div class="row-fluid">
                <span class="align-text-bottom noselect">{{ configuration.name }}</span>
                <br/>
                <font-awesome-icon icon="fa-solid fa-play"></font-awesome-icon>
            </div>

            <div v-if="configuration.returnType" class="row-fluid">
                <div
                    class="slot"
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

import { ComponentUIConfiguration } from './utils';

import { ComponentConfiguration } from '@/sketch/api/component-configuration';

export default defineComponent({
    components: {
        Vue3DraggableResizable
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
        }
    },
    data() {
        return {
            componentUIConfiguration: {
                height: 120,
                width: 120,
                x: this.$props.x,
                y: this.$props.y
            }
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
.centering {
    float: none;
    margin: 0 auto;
}
.unselected-slot
{
    background-color: black;
}
.slot:hover, .selected-slot
{
    background-color: red;
}

.component-ui
{
    background-color: yellow;
    position: absolute;
}

</style>