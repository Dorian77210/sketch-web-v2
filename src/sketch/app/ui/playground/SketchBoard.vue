<template>
    <div class="w-100">
        <div id="sketch-board" @click="onBoardClick($event)" @keydown="onKeyDown" tabindex="1">
            <SketchComponentUI
                v-for="[componentModel, configuration] in componentsMap"
                :key="componentModel.component.getID()"
                :component-model="componentModel"
                :configuration="configuration"
                @on-slot-selected="onSlotSelected"
                @on-drag="onDrag"
                :ref="componentModel.component.getID()"
            />
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import LeaderLine from 'leader-line-new';

import SketchBoardManager from '../../core/sketch-board-manager';

import { ComponentConfiguration } from 'konect-api-types';
import { getConfigurationOf } from '@/sketch/app/core/sketch-component-configuration-manager';

import SketchComponentUI from './SketchComponentUI.vue';

import { ArrayStack, SketchComponent } from 'konect-api-types';
import { ComponentSlotModel } from '../utils';

import { canCreateLinkBetween } from '@/sketch/app/core/sketch-component-configuration-manager';

import store from '@/store';

import bus from '../../core/bus';

import { GenericSketchComponentClass, opt } from 'konect-api-types';

import { isDeleteKey } from '@/sketch/app/core/keyboard-combination';

import { ComponentModel, ComponentModelConfig } from '../utils';
import { SaveReconstitution } from '../../core/save';

import { ComponentLink } from '../../core/save';

type ComponentSlot = {
    ui: HTMLElement;
    model: ComponentSlotModel;
}


type LinkAssociation = {
    source: SketchComponent<unknown>;
    destination: SketchComponent<unknown>;
    entryName: string;
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
            componentsMap: this.boardManager.componentModels,
            slots: new ArrayStack<ComponentSlot>(),
            workflow: this.boardManager.workflow,
            links: new Map<LinkAssociation, LeaderLine>(),
            selectedComponent: opt<SketchComponent<unknown>>(),
            selectedComponentModel: opt<ComponentModel>(),
            finishReconsitution: true,
            linksToRestitute: Array<ComponentLink>()
        }
    },

    methods: {
        onBoardClick(event: MouseEvent) {
            const x: number = event.x;
            const y: number = event.y;
            const selectedComponentClass: GenericSketchComponentClass | undefined = this.$props.boardManager.getAndRemoveComponentClass();

            if (selectedComponentClass) {
                const associatedConfiguration : ComponentConfiguration = getConfigurationOf(selectedComponentClass);
                if (associatedConfiguration) {
                    const component = new selectedComponentClass();
                    const model: ComponentModel = {
                        component: component,
                        x,
                        y,
                        config: {
                            text: {
                                value: associatedConfiguration.name,
                                color: 'black'
                            },
                            backgroundColor: '#ceeaee',
                            iconColor: 'black'
                        }
                    };

                    this.componentsMap.set(model, associatedConfiguration);

                    this.workflow.insertComponent(component);

                    bus.emit('create-component');
                    bus.emit('on-component-selected', model);
                }
            } else {
                const target: HTMLElement = event.target as HTMLElement;
                if (target.id === 'sketch-board') {
                    bus.emit('on-component-unselected');
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
                            destination: destination.model.targetComponent,
                            entryName: destination.model.entryName
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
        onDrag(componentModel: ComponentModel, x: number, y: number) {
            // update coords
            componentModel.x = x;
            componentModel.y = y;
            const component = componentModel.component;

            // update all the links of the component
            const lines: Array<LeaderLine> = [];
            this.links.forEach((line, association) => {
                if ((association.source === component) || (association.destination === component)) {
                    lines.push(line);
                }
            })

            lines.forEach(line => line.position());
        },

        onComponentSelected(model: ComponentModel) {
            this.selectedComponent = model.component;
            this.selectedComponentModel = model;
        },
        async askForExecution(component: SketchComponent<unknown>) {
            try {
                bus.emit('start-execution');
                const executionResult = await this.workflow.execute(component);
                if (executionResult) {
                        store.dispatch('addMessage', {
                        message: 'Workflow executed successfully !',
                        level: 'success'
                    });
                }
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
        },

        clear() {
            this.boardManager.componentModels.clear();
            this.slots.clear();
            this.links.forEach(line => line.remove());
            this.links.clear();
            this.selectedComponent = undefined;
            this.selectedComponentModel = undefined;
        }
    },
    computed: {
        refs() {
            return this.$refs;
        }
    },
    
    created() {
        bus.on('ask-for-execution', async (component) => {
            await this.askForExecution(component as SketchComponent<unknown>);
        });

        bus.on('on-component-unselect', () => {
            this.selectedComponent = undefined;
        });

        bus.on('on-component-selected', (componentModel) => {
            this.onComponentSelected(componentModel as ComponentModel);
        });

        bus.on('on-settings-updated', (settings) => {
            if (this.selectedComponentModel !== undefined) {
                this.selectedComponentModel.config = settings as ComponentModelConfig;
            }
        });

        bus.on('save-reconstitution', (s) => {
            this.clear();

            const save = s as SaveReconstitution;

            // create the component models
            save.componentModels.forEach(model => {
                const configuration = getConfigurationOf(model.component.constructor as GenericSketchComponentClass);
                this.boardManager.componentModels.set(model, configuration);
            });
            
            this.linksToRestitute = save.links;
        })
    },

    updated() {
        if (this.linksToRestitute.length > 0) {
            // here, we need to recreate the links
            this.linksToRestitute.forEach(link => {
                const { child, parent, entryName } = link;

                // find ref of parent and child
                const childRef = this.$refs[child.getID()] as any;
                const parentRef = this.$refs[parent.getID()] as any;

                // simulate click on the slots for creating a link
                // click on the parent, then the child entry name
                const parentSlotRef = parentRef[0].$refs[`${parent.getID()}-out`] as HTMLElement;
                const childSlotRef = childRef[0].$refs[`${child.getID()}-${entryName}`][0] as HTMLElement;

                parentSlotRef.click();
                childSlotRef.click();

                this.linksToRestitute = [];
            });
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