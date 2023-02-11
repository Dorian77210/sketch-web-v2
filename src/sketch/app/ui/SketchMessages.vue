<template>
    <div class="d-flex flex-column" id="messages">
        <v-alert
            :type="message.level"
            closable
            class="mt-1"
      v-for="(message, index) in messages" :key="index">
        {{  message.message }}
    </v-alert>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import Message from '../core/message';

import store from '@/store';

export default defineComponent({
    computed: {
        messages() : Array<Message> {
            return store.getters.messages;
        }
    }
})

</script>

<style>

#messages {
    position: absolute;
    bottom: 0;
    right: 0;
}

</style>