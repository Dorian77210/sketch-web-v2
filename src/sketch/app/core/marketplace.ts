import store from "@/store";

import { plugin as MatricesPlugin } from "konect-matrices";

export interface PluginInformation {
    name: string;
    description: string;
}

export function getActivatedPlugins() : Array<string>{
    return store.getters.marketplace.plugins;
}

export function getPlugins() : Array<PluginInformation> {
    return [
        {
            name: MatricesPlugin.pluginInformation.name,
            description: MatricesPlugin.pluginInformation.description
        }
    ];
}

export function saveSelectedPlugins(plugins: Array<string>) {
    store.dispatch('updateSelectedPlugins', plugins);
}