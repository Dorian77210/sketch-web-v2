<template>
    <SketchComponentModal
        title="Marketplace"
        :before-close="beforeClose"
        @close-popup="onClose"
        :max-width="800"
    >
        <template v-slot:modal-body>
            <div class="ml-6">
                <p>Here are the different component modules you can use in the application :</p>
                <v-list lines="one">
                    <v-list-item
                        v-for="(plugin, index) in plugins"
                        :key="index"
                        :title="plugin.name"
                    >
                        {{  plugin.description }}
                        <v-btn-toggle v-model="models[index]">
                            <v-btn
                                value="selected"
                                @click="selectPlugin(plugin.name, index)"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-check"
                                    :style="{ 'color': 'green' }"
                                ></font-awesome-icon>
                            </v-btn>
                            <v-btn
                                value="unselected"
                                @click="unselectPlugin(plugin.name, index)"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-xmark"
                                    :style="{ 'color': 'red' }"
                            ></font-awesome-icon>
                            </v-btn>
                        </v-btn-toggle>
                    </v-list-item>
                </v-list>
            </div>

            <v-alert
                type="warning"
                title="Warning !"
                text="When you will click on save, you current progression will be lost. Save your work before to 
                change the modules preferences."
            >
            </v-alert>
        </template>
    </SketchComponentModal>
</template>

<script lang="ts">

import { SketchComponentModal  } from 'konect-api-vue'

import { defineComponent } from 'vue';

import { getActivatedPlugins, getPlugins, saveSelectedPlugins } from '../../core/marketplace';

export default defineComponent({
    components: {
        SketchComponentModal
    },
    props: {
        onClose: {
            required: true,
            type: Function
        }
    },
    data() {
        return {
            plugins: getPlugins(),
            activatedPlugins: getActivatedPlugins(),
            models: Array<string>()
        }
    },

    methods: {
        beforeClose() {
            // save selected modules
            saveSelectedPlugins(this.activatedPlugins);
        },

        selectPlugin(plugin: string, index: number) {
            this.activatedPlugins.push(plugin);
            this.models[index] = "selected";
        },

        unselectPlugin(plugin: string, index: number) {
            this.activatedPlugins = this.activatedPlugins.filter(p => p !== plugin);
            this.models[index] = "unselected";
        }
    },

    mounted() {
        this.plugins.forEach(plugin => {
            const value = this.activatedPlugins.includes(plugin.name) ? "selected" : "unselected";
            this.models.push(value);
        });
    }
});

</script>