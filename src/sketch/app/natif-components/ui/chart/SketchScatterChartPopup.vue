<template>
    <SketchComponentModal
        title="Configuration of the input"
        :max-width="1250"
        :max-height="1250"
    >
        <template v-slot:modal-body>
            <v-alert
                v-if="!component.wrapper.isDataAvailable()"
                type="warning"
            >
                No data available to show the scatter chart
            </v-alert>
            <ScatterChart v-if="component.wrapper.isDataAvailable() && chartConfiguration !== undefined" :chart-data="chartConfiguration" />
        </template>
    </SketchComponentModal>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

import { SketchScatterChartComponent } from '../../chart/SketchScatterChartComponent';

import SketchComponentModal from '@/sketch/api/ui/SketchComponentModal.vue';
import { ScatterChart } from 'vue-chart-3';
import { Chart, ChartData, registerables } from 'chart.js';

import DataFrame from 'dataframe-js';

import { randomColor } from '@/sketch/app/natif-components/utils/utils';

Chart.register(...registerables);

export default defineComponent({
    components: {
        SketchComponentModal,
        ScatterChart
    },
    props: {
        component: {
            required: true,
            type: Object as PropType<SketchScatterChartComponent>
        }
    },
    computed: {
        chartConfiguration() : ChartData<"scatter"> | undefined {
            if (!this.component.wrapper.isDataAvailable()) {
                return undefined;
            }

            const data: DataFrame = this.component.wrapper.getData() as DataFrame;
            const columns: Array<string> = data.listColumns();
            if (columns.includes('labels')) {
                return this.chartConfigurationWithLabel;
                //
            } else {
                // no labels, so we'll apply just normal color
                return this.normalChartConfiguration;
            }
        },
        normalChartConfiguration() : ChartData<"scatter"> {
            const data = this.component.wrapper.getData() as DataFrame;

            const configuration : ChartData<"scatter"> = {
                labels: data.toArray().map(data => {
                    return typeof data[0] == "string" ? parseFloat(data[0]).toFixed(2) : data[0].toFixed(2)
                }),
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

            return configuration;
        },
        chartConfigurationWithLabel() : ChartData<"scatter"> {
            const dataframe = this.component.wrapper.getData() as DataFrame;

            const labels: Array<string> = dataframe.distinct('labels').toDict().labels;
            const data = dataframe.toArray();
            const colors: Array<string> = [];

            labels.forEach(() => {
                colors.push(randomColor());
            })

            const configuration : ChartData<"scatter"> = {
                labels: dataframe.toArray().map(data => {
                    return typeof data[0] == "string" ? parseFloat(data[0]).toFixed(2) : data[0].toFixed(2)
                }),
                datasets: labels.map((label, index) => {
                    return {
                        label: `Dataset #${index + 1}`,
                        data: data.filter(data => data[2] === label).map(data => {
                            return { x: data[0], y: data[1]}
                        }),
                        borderColor: colors[index],
                        pointBackgroundColor: colors[index]
                    }
                })
            }

            return configuration;
        }
    }
})

</script>