<template>
    <div class="d-flex flex-column" id="messages">
        <SketchMessage v-for="(message, index) in messages" :key="index" :message="message" />
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import Message from '../core/message';

import SketchMessage from './SketchMessage.vue';

import bus from '../core/bus';

import store from '@/store';

export default defineComponent({
    components: {
        SketchMessage
    },
    computed: {
        messages() : Array<Message> {
            return store.getters.messages;
        }
    },
    mounted() {
        bus.on('delete-message', message => store.dispatch('deleteMessage', message))
    }
})

</script>

<style>

#messages {
    position: absolute;
    bottom: 0;
    left: 0;
}

</style>