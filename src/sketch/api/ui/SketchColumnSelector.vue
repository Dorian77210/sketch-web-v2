<template>
    <div class="selector-container w-100">
        <v-table style="width: 35%">
            <thead>
                <tr>
                    <th>Selected columns</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(col, index) in allSelectedColumns" :key="index" class="text-center">
                    <td @click="currentUnselectedColumn = col">{{ col }}</td>
                </tr>
            </tbody>
        </v-table>

        <div class="d-flex  justify-content-center" style="width: 30%;">
            <v-btn icon="mdi-skip-backward" @click="_onSelectAll"></v-btn>

            <v-btn icon="mdi-chevron-left" @click="_onSelect"></v-btn>

            <v-btn icon="mdi-fast-forward" @click="_onUnselectAll"></v-btn>

            <v-btn icon="mdi-chevron-right" @click="_onUnselect"></v-btn>
        </div>

        <v-table style="width: 35%">
            <thead>
                <tr>
                    <th>Unselected columns</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(col, index) in allUnselectedColumns" :key="index" class="text-center">
                    <td @click="currentSelectedColumn = col">{{ col }}</td>
                </tr>
            </tbody>
        </v-table>

    </div>
</template>


<script lang="ts">

import { defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        selectedColumns: {
            type: Array as PropType<Array<string>>,
            required: true
        },
        unselectedColumns: {
            type: Array as PropType<Array<string>>,
                required: true
        },
        onSelect: {
            type: Function as PropType<(s: string) => void>,
            required: true
        },
        onUnselect: {
            type: Function as PropType<(s: string) => void>,
            required: true
        },
        onSelectAll: {
            type: Function,
            required: true
        },
        onUnselectAll: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            allSelectedColumns: [...this.selectedColumns],
            allUnselectedColumns: [...this.unselectedColumns],
            currentSelectedColumn: '',
            currentUnselectedColumn: '',
        }
    },

    methods: {
        _onSelect() {
            if (this.currentSelectedColumn) {
                this.allSelectedColumns.push(this.currentSelectedColumn)
                this.allUnselectedColumns = this.allUnselectedColumns.filter(col => col !== this.currentSelectedColumn);
                this.onSelect(this.currentSelectedColumn);
                this.currentSelectedColumn = '';
            }
        },

        _onUnselect() {
            if (this.currentUnselectedColumn) {
                this.allUnselectedColumns.push(this.currentUnselectedColumn);
                this.allSelectedColumns = this.allSelectedColumns.filter(col => col !== this.currentUnselectedColumn);
                this.onUnselect(this.currentUnselectedColumn);
                this.currentUnselectedColumn = '';
            }
        },

        _onSelectAll() {
            this.currentUnselectedColumn = this.currentSelectedColumn = '';
            this.allSelectedColumns.push(...this.allUnselectedColumns);
            this.allUnselectedColumns = [];
            this.onSelectAll();
        },

        _onUnselectAll() {
            this.currentUnselectedColumn = this.currentSelectedColumn = '';
            this.allUnselectedColumns.push(...this.allSelectedColumns);
            this.allSelectedColumns = [];
            this.onUnselectAll();
        }
    }
});

</script>

<style>

.selector-container {
    display: flex;
    margin: auto;
}

td:hover {
    cursor: pointer;
}

</style>