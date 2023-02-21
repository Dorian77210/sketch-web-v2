<template>
    <Transition name="slide-fade">
        <v-alert
            v-if="show"
            :type="message.level"
            class="mt-1"

        >
            {{  message.message }}
        </v-alert>
    </Transition>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import Message from '../../core/message';
import bus from '../../core/bus';

export default defineComponent({
    props: {
        message: {
            required: true,
            type: Object as PropType<Message>
        }
    },
    data() {
        return {
            show: true
        }
    },
    mounted() {
        setTimeout(() => {
            this.show = false;
            setTimeout(() => bus.emit('delete-message', this.message), 500)
        }, 3000);
    }
})

</script>

<style>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }
  
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>