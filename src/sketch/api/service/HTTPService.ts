export default class HTTPService {

    private static BASE_URL: string = process.env.VUE_APP_API_BASE_URL

    constructor() {
        // empty constructor
    }

    /**
     * Build full URL from the BASE URL
     * @param url The url
     * @returns The full url
     */
    protected static buildURL(url: string): string {
        return `${HTTPService.BASE_URL}/${url}`;
    }
}