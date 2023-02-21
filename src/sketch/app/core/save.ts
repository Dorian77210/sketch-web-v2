export interface ComponentSaveConfiguration {
    type: string;
    json: object;
}

export default interface Save {
    components: Array<ComponentSaveConfiguration>;
}