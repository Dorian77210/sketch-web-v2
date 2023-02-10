import { createStore } from 'vuex'

import ConsoleMessage from '@/sketch/app/core/console-message'

export default createStore({
    state: {
        consoleMessages: Array<ConsoleMessage>()
    },
    getters: {
        consoleMessages: state => state.consoleMessages,
    },
    mutations: {
        ADD_MESSAGE(state, message: ConsoleMessage) {
            state.consoleMessages.push(message);
        }
    },
    actions: {
        addMessage(context, message: ConsoleMessage) {
            console.log(message);
            context.commit('ADD_MESSAGE', message);
        }
    },
    modules: {
    }
})
