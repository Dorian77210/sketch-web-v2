<template>
        <v-table fixed-header height="500px">
            <thead>
                <tr>
                    <th v-for="(header, index) in headers" :key="index" class="text-center">
                        {{  header }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dataChunk, dataChunkIndex) in dataChunks" :key="dataChunkIndex">
                    <td v-for="(data, dataIndex) in dataChunk" :key="dataIndex" class="text-center">
                        {{ data }}
                    </td>
                </tr> 
            </tbody>
        </v-table>
        <div class="text-center">
            <v-pagination
                v-model="page"
                :length="pageCount"
            ></v-pagination>    
        </div>

        <v-text-field
            label="Data chunk size"
            v-model="chunkSize"
            type="number"
            :rules="fieldRules"
        ></v-text-field>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import DataFrame from 'dataframe-js';

export default defineComponent({
    props: {
        dataframe: {
            required: true,
            type: DataFrame
        }
    },
    data() {
        return {
            chunkSize: 20,
            page: 1,
            fieldRules: [
                (value: number) => value > 0
            ]
        }
    },
    computed: {
        headers() : string[] {
            return this.dataframe.listColumns();
        },
        dimensions() : Array<number> {
            return this.dataframe.dim();
        },
        pageCount() : number {
            let count = this.dimensions[0] / this.chunkSize;
            if ((this.dimensions[0] % this.chunkSize) !== 0) {
                count++;
            }

            return Math.floor(count);
        },
        dataChunks() : Array<unknown> {
            const begin = (this.page - 1) * this.chunkSize;
            let end = this.page * this.chunkSize;
            
            if (end > this.dimensions[0]) {
                end = this.dimensions[0];
            }

            return this.dataframe.toArray().slice(begin, end);
        }
    }

});

</script>