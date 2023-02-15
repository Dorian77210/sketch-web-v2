import HTTPService from "@/sketch/api/service/HTTPService";

import DataFrame, { Row } from "dataframe-js";
import axios from "axios";

export default class DataframeService extends HTTPService {

    constructor() {
        super();
    }

    public static async kmeans(data: DataFrame, clusters: number) : Promise<DataFrame> {
        const url = this.buildURL("kmeans");

        const result = await axios.post(url, {
            data: {
                dataframe: data.toCSV(),
                clusters
            }
        });

        const dict = data.toDict();
        dict.labels = result.data.labels;

        console.log(dict)

        const dataframe: DataFrame = new DataFrame(dict);
        
        return dataframe;
    }
}