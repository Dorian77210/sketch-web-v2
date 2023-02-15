import HTTPService from "@/sketch/api/service/HTTPService";

import DataFrame from "dataframe-js";
import axios from "axios";

export default class DataframeService extends HTTPService {

    constructor() {
        super();
    }

    public static async kmeans(data: DataFrame, clusters: number) : Promise<DataFrame> {
        const url = this.buildURL("kmeans");

        console.log(await axios.post(url, {
            data: {
                dataframe: data.toCSV(),
                clusters
            }
        }));

        return data;
    }
}