import { createStore } from 'vuex';

import Message from '@/sketch/app/core/message'

export default createStore({
    state: {
        messages: Array<Message>()
    },
    getters: {
        messages: state => state.messages,
    },
    mutations: {
        ADD_MESSAGE(state, message: Message) {
            state.messages.push(message);
        },
        DELETE_MESSAGE(state, message: Message) {
            state.messages = state.messages.filter(currentMessage => currentMessage !== message)
        }
    },
    actions: {
        addMessage(context, message: Message) {
            context.commit('ADD_MESSAGE', message);
        },
        deleteMessage(context, message: Message) {
            context.commit('DELETE_MESSAGE', message);
        }
    },
    modules: {
    }
})
