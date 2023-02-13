<template>
    <SketchComponentModal
        title="Configuration of the input"
        :max-width="1250"
        :max-height="1250"
    >
        <template v-slot:modal-body>
            <v-alert
                v-if="!wrapper.isDataAvailable()"
                type="warning"
            >
                No data available to show the line chart
            </v-alert>
            <LineChart v-if="wrapper.isDataAvailable() && chartConfiguration !== undefined" :chart-data="chartConfiguration" />
        </template>
    </SketchComponentModal>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

import { SketchLineChartComponent } from '../../chart/SketchLineChartComponent';

import SketchComponentModal from '@/sketch/api/ui/SketchComponentModal.vue';
import { LineChart } from 'vue-chart-3';
import { Chart, ChartData, registerables } from 'chart.js';

import DataFrame from 'dataframe-js';

Chart.register(...registerables);

export default defineComponent({
    components: {
        SketchComponentModal,
        LineChart
    },
    props: {
        component: {
            required: true,
            type: Object as PropType<SketchLineChartComponent>
        }
    },
    data() {
        return {
            wrapper: this.component.wrapper
        }
    },
    computed: {
        chartConfiguration() : ChartData<"line"> | undefined {
            if (!this.wrapper.isDataAvailable()) {
                return undefined;
            }


            const data: DataFrame = this.wrapper.getData() as DataFrame;
            const configuration : ChartData<"line"> = {
                labels: data.toArray().map(data => data[0].toFixed(2)),
                datasets: [{
                    label: 'Chart of data',
                    data: data.toArray().map(data => {
                        return {
                            x: data[0],
                            y: data[1]
                        }
                    }),
                    borderColor: 'purple'
                }]
            }

            console.log(configuration);

            return configuration;
        }
    }
})

</script>