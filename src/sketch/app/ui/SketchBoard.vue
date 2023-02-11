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
                @on-drag="onDrag"
                @on-component-selected="onComponentSelected"
                @ask-for-execution="askForExecution"
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

import { opt } from '@/sketch/api/types';

import store from '@/store';

import bus from '../core/bus';

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
        SketchComponentUI,
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
            workflow: new SketchComponentWorkflow(),
            links: new Map<SketchComponent<unknown>, Array<LeaderLine>>(),
            selectedComponent: opt<SketchComponent<unknown>>()
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

                    bus.emit('create-component');
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
                store.dispatch('addMessage', {
                    message: 'The creation of the link has failed',
                    level: 'error'
                });
            } else {
                if (destination.model.entryName && canCreateLinkBetween(source.model.targetComponent, destination.model.targetComponent, destination.model.entryName)) {
                    // check in the workflow that the lnik is not existing
                    if (this.workflow.createLinkBetween(source.model.targetComponent, destination.model.targetComponent, destination.model.entryName) === false) {
                        store.dispatch('addMessage', {
                            message: 'The link already exists in the app',
                            level: 'error'
                        })
                    } else {
                        const line = new LeaderLine({
                            start: source.ui,
                            end: destination.ui,
                            color: 'black'
                        })

                        if (!this.links.has(destination.model.targetComponent)) {
                            this.links.set(destination.model.targetComponent, Array<LeaderLine>());
                        }

                        this.links.get(destination.model.targetComponent)?.push(line);

                        if (!this.links.has(source.model.targetComponent)) {
                            this.links.set(source.model.targetComponent, Array<LeaderLine>());
                        }

                        this.links.get(source.model.targetComponent)?.push(line);
                    }
                } else {
                    store.dispatch('addMessage', {
                        message: "None data could pass from the source component to the target component",
                        level: 'error'
                    })
                }
            }
        },
        onDrag(component: SketchComponent<unknown>) {
            // update all the links of the component
            const lines: Array<LeaderLine> | undefined = this.links.get(component);
            lines?.forEach(line => line.position());
        },

        onComponentSelected(component: SketchComponent<unknown>) {
            this.selectedComponent = component;
        },
        askForExecution(component: SketchComponent<unknown>) {
            try {
                this.workflow.execute(component);
                store.dispatch('addMessage', {
                    message: 'Workflow executed successfully !',
                    level: 'success'
                })
            } catch (e) {
                store.dispatch('addMessage', {
                    message: e,
                    level: 'error'
                })
            }
        }
    },
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