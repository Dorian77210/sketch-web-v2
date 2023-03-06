import { createStore } from 'vuex';

import Message from '@/sketch/app/core/message'

export default createStore({
    state: {
        messages: Array<Message>(),
        marketplace: {
            plugins: Array<string>()
        }
    },
    getters: {
        messages: state => state.messages,
        marketplace: state => state.marketplace
    },
    mutations: {
        ADD_MESSAGE(state, message: Message) {
            state.messages.push(message);
        },
        DELETE_MESSAGE(state, message: Message) {
            state.messages = state.messages.filter(currentMessage => currentMessage !== message)
        },

        // marketplace
        UPDATE_SELECTED_PLUGINS(state, plugins: Array<string>) {
            state.marketplace.plugins = plugins;
            // save the marketplace in the local storage
            const json = JSON.stringify(state.marketplace);
            localStorage.setItem('marketplace', json);
        },
        INIT_MARKETPLACE(state) {
            const rawMarketplace = localStorage.getItem('marketplace');
            if (rawMarketplace !== undefined) {
                state.marketplace = JSON.parse(rawMarketplace as string);
            }
        }
    },
    actions: {
        addMessage(context, message: Message) {
            context.commit('ADD_MESSAGE', message);
        },
        deleteMessage(context, message: Message) {
            context.commit('DELETE_MESSAGE', message);
        },

        // marketplace
        updateSelectedPlugins(context, plugins: Array<string>) {
            context.commit('UPDATE_SELECTED_PLUGINS', plugins);
        },
        initMarketplace(context) {
            context.commit('INIT_MARKETPLACE');
        }
    },
});
