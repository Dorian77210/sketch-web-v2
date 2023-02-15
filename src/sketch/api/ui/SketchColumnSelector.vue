<template>
    <div class="selector-container w-100">
        <v-table style="width: 35%">
            <thead>
                <tr>
                    <th>Selected columns</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(col, index) in allSelectedColumns"
                    :key="index"
                    class="text-center"
                    :class="{ 'selected-column': col === currentUnselectedColumn }"
                >
                    <td @click="selectColumn(col)">{{ col }}</td>
                </tr>
            </tbody>
        </v-table>

        <div class="icon-container" style="width: 30%;">
            <div>
                <v-btn icon="mdi-skip-backward" @click="_onSelectAll"></v-btn>
            </div>

            <div>
                <v-btn icon="mdi-chevron-left" @click="_onSelect"></v-btn>
            </div>

            <div>
                <v-btn icon="mdi-skip-forward" @click="_onUnselectAll"></v-btn>
            </div>

            <div>
                <v-btn icon="mdi-chevron-right" @click="_onUnselect"></v-btn>
            </div>
        </div>

        <v-table style="width: 35%">
            <thead>
                <tr>
                    <th>Unselected columns</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(col, index) in allUnselectedColumns"
                    :key="index"
                    class="text-center"
                    :class="{ 'selected-column': col === currentSelectedColumn }"
                >
                    <td @click="unSelectColumn(col)">{{ col }}</td>
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
                const index = this.allUnselectedColumns.indexOf(this.currentSelectedColumn);

                this.allSelectedColumns.push(this.currentSelectedColumn)
                this.allUnselectedColumns = this.allUnselectedColumns.filter(col => col !== this.currentSelectedColumn);
                this.onSelect(this.currentSelectedColumn);                

                if (index !== -1) {
                    if (index < this.allUnselectedColumns.length - 1) {
                        this.currentSelectedColumn = this.allUnselectedColumns[index];
                    } else  {
                        this.currentSelectedColumn = this.allUnselectedColumns[index - 1];
                    }
                } else {
                    this.currentSelectedColumn = '';
                }
            }
        },

        _onUnselect() {
            if (this.currentUnselectedColumn) {
                const index = this.allSelectedColumns.indexOf(this.currentUnselectedColumn);

                this.allUnselectedColumns.push(this.currentUnselectedColumn);
                this.allSelectedColumns = this.allSelectedColumns.filter(col => col !== this.currentUnselectedColumn);
                this.onUnselect(this.currentUnselectedColumn);

                if (index !== -1) {
                    if (index < this.allSelectedColumns.length) {
                        this.currentUnselectedColumn = this.allSelectedColumns[index];
                    } else {
                        this.currentUnselectedColumn = this.allSelectedColumns[index - 1];
                    }
                } else {
                    this.currentUnselectedColumn = '';
                }
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
        },

        selectColumn(col: string) {
            this.currentUnselectedColumn = col;
            this.currentSelectedColumn = '';
        },

        unSelectColumn(col: string) {
            this.currentSelectedColumn = col; 
            this.currentUnselectedColumn = ''
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
    background-color: #ceeaee;
}

.selected-column {
    background-color: #ceeaee;
}

.icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}


</style>