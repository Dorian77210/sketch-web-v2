<template>
    <v-toolbar color="rgba(111,203,226,255)">
        <v-toolbar-title>
            <router-link to="/">
                <img :src="require('@/assets/images/logo.png')" id="logo"/>
            </router-link>

                <v-btn>
                    File
                    <v-menu activator="parent">
                        <v-list>
                            <v-list-item 
                                v-for="(fileItem, index) in fileItems"
                                :key="index"
                                @click="fileItem.onClick"
                                class="navbar-item"
                            >
                                {{  fileItem.title }}
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>

        </v-toolbar-title>
    </v-toolbar>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import bus from '../../core/bus';

export default defineComponent({
    data() {
        return {
            fileItems: [{
                title: 'Save',
                onClick: () => {
                    bus.emit('save-board');
                }
            }, {
                title: 'Save as',
                onClick: () => {
                    bus.emit('save-board-as');
                }
            }, {
                title: 'Open file',
                divider: true,
                onClick: () => {
                    bus.emit('open-file');
                }
            }] 
        }
    }
});

</script>

<style>

#logo {
    width: 6%;
}

.navbar-item:hover {
    cursor: pointer;
}

</style>