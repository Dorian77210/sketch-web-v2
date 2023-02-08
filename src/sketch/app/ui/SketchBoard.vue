<template>
    <div class="w-100">
        <div id="sketch-board" @click="onBoardClick($event)">
            <SketchComponentUI
                v-for="[componentWrapper, configuration] in componentsMap"
                :key="componentWrapper.component.getID()"
                :component="componentWrapper.component"
                :configuration="configuration"
                :x="componentWrapper.x"
                :y="componentWrapper.y"
            />
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import SketchBoardManager from '../core/sketch-board-manager';

import { Class, opt } from '@/sketch/api/types';
import SketchComponent from '@/sketch/api/sketch-component';
import { ComponentConfiguration } from '@/sketch/api/component-configuration';
import { getConfigurationOf } from '@/sketch/api/sketch-component-configuration-manager';

import SketchComponentUI from './SketchComponentUI.vue';

type ComponentWrapper = {
    component: SketchComponent<unknown>;
    x: number;
    y: number;
};

export default defineComponent({
    components: {
        SketchComponentUI
    },
    props: {
        boardManager: {
            required: true,
            type: SketchBoardManager
        }
    },
    data() {
        return {
            componentsMap: new Map<ComponentWrapper, ComponentConfiguration>()
        }
    },

    methods: {
        onBoardClick(event: MouseEvent) {
            const x: number = event.x;
            const y: number = event.y;
            const selectedComponentClass: Class<SketchComponent<unknown>> | undefined = this.$props.boardManager.getAndRemoveComponentClass();

            if (selectedComponentClass) {
                const associatedConfiguration : ComponentConfiguration = getConfigurationOf(selectedComponentClass);
                if (associatedConfiguration) {
                    const component: SketchComponent<unknown> = new selectedComponentClass();
                    const wrapper: ComponentWrapper = {
                        component: component,
                        x: x,
                        y: y
                    };
                    this.componentsMap.set(wrapper, associatedConfiguration);
                }
            }
        }
    }
});

</script>

<style>
#sketch-board
{
    width: 100%;
    height: 100%;
    background-color: gray;
}

#sketch-board:hover
{
    cursor: pointer;
}
</style>