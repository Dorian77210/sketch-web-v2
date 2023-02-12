<template>
    <div class="w-100">
        <div id="sketch-board" @click="onBoardClick($event)" @keydown="onKeyDown" tabindex="1">
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

import { isDeleteKey } from '@/sketch/app/core/keyboard-combination';
import { MapUtils } from '../core/utils';

type ComponentSlot = {
    ui: HTMLElement;
    model: ComponentSlotModel;
}

type ComponentWrapper = {
    component: SketchComponent<unknown>;
    x: number;
    y: number;
};

type LinkAssociation = {
    source: SketchComponent<unknown>;
    destination: SketchComponent<unknown>;
}

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
            links: new Map<LinkAssociation, LeaderLine>(),
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
                        
                        // insert the line
                        const linkAssociation: LinkAssociation = {
                            source: source.model.targetComponent,
                            destination: destination.model.targetComponent
                        }

                        this.links.set(linkAssociation, line);
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
            const lines: Array<LeaderLine> = [];
            this.links.forEach((line, association) => {
                if ((association.source === component) || (association.destination === component)) {
                    lines.push(line);
                }
            })

            lines.forEach(line => line.position());
        },

        onComponentSelected(component: SketchComponent<unknown>) {
            this.selectedComponent = component;
        },
        askForExecution(component: SketchComponent<unknown>) {
            try {
                bus.emit('start-execution');
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
            } finally {
                bus.emit('end-execution');
            }
        },
        onKeyDown(event: KeyboardEvent) {
            const { key } = event;
            if (isDeleteKey(key)) {
                if (this.selectedComponent !== undefined) {
                    this.__deleteCurrentComponent();
                }
            }

            event.stopPropagation();
        },
        __deleteCurrentComponent() {
            const currentComponent = this.selectedComponent as SketchComponent<unknown>;

            const wrapper = Array.from(this.componentsMap.keys()).filter(w => w.component === this.selectedComponent)[0];
            this.componentsMap.delete(wrapper)
            // delete associated links
            const newLinks = new Map<LinkAssociation, LeaderLine>();
            const linesToDelete = new Array<LeaderLine>();

            this.links.forEach((line, association) => {
                if ((association.source === currentComponent) || (association.destination === currentComponent)) {
                    linesToDelete.push(line);
                } else {
                    newLinks.set(association, line);
                }
            });

            this.links = newLinks;
            linesToDelete.forEach(line => line.remove());
            // delete the component in the workflow
            this.workflow.deleteComponent(currentComponent);
            this.selectedComponent = undefined;

            console.log(this.workflow);
        }
    },
    
    created() {
        bus.on('ask-for-execution', (component) => {
            this.askForExecution(component as SketchComponent<unknown>);
        })
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