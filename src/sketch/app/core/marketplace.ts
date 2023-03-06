import store from "@/store";

export default function getActivatedPlugins() : Array<string>{
    return store.getters.marketplace.plugins;
}