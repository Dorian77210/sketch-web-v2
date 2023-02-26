<template>
    <SketchComponentModal
        title="Dataframe will be shuffled"
        :max-width="1000"
        :max-height="1000"
    >

    <template v-slot:modal-body v-if="component.wrapper.isDataAvailable()">
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


    </SketchComponentModal>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import { SketchComponentModal  } from 'konect-api-vue'

import { SketchDataframeShuffleComponent } from '../../dataframe/SketchDataframeShuffleComponent';

import DataFrame from 'dataframe-js';
import {SketchWrapper} from 'konect-api-types-ts';

export default defineComponent({
    props: {
        component: {
            required: true,
            type: SketchDataframeShuffleComponent
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
    components: {
        SketchComponentModal
    },
    computed: {
        headers() : string[] {
            const wrapper: SketchWrapper<DataFrame> = this.component.wrapper;
            
            if (!wrapper.isDataAvailable()) {
                return [];
            }

            const dataframe = wrapper.getData() as DataFrame;

            return dataframe.listColumns();
        },
        dimensions() : Array<number> {
            const dataframe: DataFrame = this.component.wrapper.getData() as DataFrame;
            console.log(dataframe.toArray());
            return dataframe.dim();
        },
        pageCount() : number {
            let count = this.dimensions[0] / this.chunkSize;
            if ((this.dimensions[0] % this.chunkSize) !== 0) {
                count++;
            }

            return Math.floor(count);
        },
        dataChunks() : Array<unknown> {
            const dataframe: DataFrame = this.component.wrapper.getData() as DataFrame;

            const begin = (this.page - 1) * this.chunkSize;
            let end = this.page * this.chunkSize;
            
            if (end > this.dimensions[0]) {
                end = this.dimensions[0];
            }

            return dataframe.toArray().slice(begin, end);
        }
    }

});

</script>