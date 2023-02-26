<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
          position="right"
          absolute
          width="500"
        >
            <v-list-item
                prepend-icon="mdi-cog"
                title="Component settings"
                nav
            >
                <template v-slot:append>
                <v-btn
                    variant="text"
                    icon="mdi-chevron-left"
                    @click.stop="rail = !rail"
                ></v-btn>
                </template>
            </v-list-item>
  
            <v-divider></v-divider>
            <div  v-if="!rail && componentModel !== undefined">
                <v-expansion-panels
                    multiple
                >
                    <v-expansion-panel>
                        <v-expansion-panel-title>Background style</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-color-picker v-model="backgroundColor"></v-color-picker>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    
                    <v-expansion-panel>
                        <v-expansion-panel-title>Text settings</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-text-field
                                label="Name of the component"
                                v-model="text.value"
                            >
                            </v-text-field>
                            <v-color-picker v-model="text.color"></v-color-picker>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title>Icon settings</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-color-picker v-model="iconColor"></v-color-picker>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            
                <v-divider></v-divider>
                <div class="-flex justify-space-around align-center flex-column flex-sm-row fill-height">
                    <v-btn
                        color="success"
                        @click="saveSettings"
                    >
                        Save
                    </v-btn>
                </div>
            </div>
        </v-navigation-drawer>
        <v-main style="height: 250px"></v-main>
      </v-layout>
    </v-card>
  </template>

<script lang="ts">

import { defineComponent } from 'vue';

import bus from '../../core/bus';

import { opt } from 'konect-api-types-ts';

import { ComponentModel, ComponentModelConfig } from '../utils';

export default defineComponent({
    data() {
        return {
            drawer: true,
            rail: true,
            componentModel: opt<ComponentModel>(),
            backgroundColor: '',
            text: {
                value: '',
                color: ''
            },
            iconColor: ''
        }
    },
    methods: {
        saveSettings() {
            // emit event with the new settings
            const settings: ComponentModelConfig = {
                text: {
                    value: this.text.value,
                    color: this.text.color
                },
                backgroundColor: this.backgroundColor,
                iconColor: this.iconColor
            }

            bus.emit('on-settings-updated', settings);
        }
    },
    mounted() {
        bus.on('on-component-selected', (componentModel) => {
            this.componentModel = componentModel as ComponentModel;
            this.backgroundColor = this.componentModel.config.backgroundColor;
            this.text = {
                value: this.componentModel.config.text.value,
                color: this.componentModel.config.text.color
            }
        });

        bus.on('on-component-unselected', () => {
            this.componentModel = undefined;
        });
    }
})

</script>