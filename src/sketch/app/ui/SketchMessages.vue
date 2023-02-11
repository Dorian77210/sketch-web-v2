<template>
    <v-alert
    style="position: absolute;"
    type="error"
    closable
      v-for="(message, index) in messages" :key="index">
        {{  message.message }}
    </v-alert>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import Message from '../core/message';

import store from '@/store';

export default defineComponent({
    computed: {
        messages() : Array<Message> {
            console.log(store.getters.messages);
            return store.getters.messages;
        }
    }
})

</script>