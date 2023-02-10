<template>
    <div class="console-container">
        <button
        type="button"
        class="btn btn-secondary"
        @click="visible = !visible"    
    >
        <span v-if="visible">
            <font-awesome-icon icon="fa-solid fa-angle-up"></font-awesome-icon>
        </span>
        <span v-else>
            <font-awesome-icon icon="fa-solid fa-angle-down"></font-awesome-icon>
        </span>
    </button>
    <div class="flex-column" :class="consoleClass">
        <div v-for="(message, index) in messages" :key="index"
            class="border-top p-3"
        >
            <font-awesome-icon v-if="message.level === 'error' || message.level === 'warning'"
                icon="fa-solid fa-triangle-exclamation"
                :style="{color: message.level === 'error' ? 'red' : 'orange'}"
            >
            </font-awesome-icon>
            {{  message.message }}
        </div>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import store from '@/store';

export default defineComponent({
    data() {
        return {
            visible: true
        }
    },
    computed: {
        messages() {
            console.log(store.state.consoleMessages);
            return store.state.consoleMessages
        },
        consoleClass() : string {
            return this.visible ? 'console-container-open' : 'console-container-close';
        }
    }
})
</script>

<style>

.console-container {
    overflow-y: auto;
    max-height: 100px;
}

.console-container-open {
    display: flex;
}

.console-container-close {
    display: none;
}

</style>