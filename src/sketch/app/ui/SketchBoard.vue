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
                @on-slot-selected="onSlotSelected"
            />
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import LeaderLine from 'leader-line-new';

import SketchBoardManager from '../core/sketch-board-manager';

import { Class } from '@/sketch/api/types';
import SketchComponent from '@/sketch/api/sketch-component';
import { ComponentConfiguration } from '@/sketch/api/component-configuration';
import { getConfigurationOf } from '@/sketch/api/sketch-component-configuration-manager';

import SketchComponentUI from './SketchComponentUI.vue';

import { ArrayStack } from '@/sketch/api/data-structures';
import { ComponentSlotModel } from './utils';

import { canCreateLinkBetween } from '@/sketch/api/sketch-component-configuration-manager';

import SketchComponentWorkflow from '../core/sketch-component-workflow';



type ComponentSlot = {
    ui: HTMLElement;
    model: ComponentSlotModel;
}

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
            componentsMap: new Map<ComponentWrapper, ComponentConfiguration>(),
            slots: new ArrayStack<ComponentSlot>(),
            workflow: new SketchComponentWorkflow()
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
        },

        onSlotSelected(model: ComponentSlotModel, ui: HTMLElement) {
            const componentSlot: ComponentSlot = {
                model,
                ui
            }

            if (this.slots.peek()?.model === model) {
                this.slots.clear();
                model.isSelected = false;
            } else {
                this.slots.push(componentSlot);
                model.isSelected = true;
            }

            if (this.slots.size() === 2) {
                const inputSlot: ComponentSlot = this.slots.pop() as ComponentSlot;
                const outputSlot: ComponentSlot = this.slots.pop() as ComponentSlot;

                inputSlot.model.isSelected = false;
                outputSlot.model.isSelected = false;

                this.__createLinkBetween(outputSlot, inputSlot);
            }
        },

        __createLinkBetween(source : ComponentSlot, destination: ComponentSlot) : void {
            if (source.model.type === 'in'
                || destination.model.type === 'out'
                || source.ui === destination.ui
            ) {
                // todo: console component
                console.error('The creation of link has failed')
            } else {
                if (destination.model.entryName && canCreateLinkBetween(source.model.targetComponent, destination.model.targetComponent, destination.model.entryName)) {
                    // check in the workflow that the lnik is not existing
                    if (this.workflow.createLinkBetween(source.model.targetComponent, destination.model.targetComponent, destination.model.entryName) === false) {
                        console.error("Error during the creation of link");
                    } else {
                        console.log('creation');
                        new LeaderLine({
                            start: source.ui,
                            end: destination.ui
                        })
                        // success !
                    }
                } else {
                    console.error('link error');
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