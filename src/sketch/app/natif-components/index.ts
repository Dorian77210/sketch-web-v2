import { ComponentConfiguration } from "konect-api-types";
import { GenericSketchComponentClass } from "konect-api-types";
import { Component } from 'vue';

// ----- Import of component with their configuration ----- //
import { SketchNumberInputComponent, configuration as SketchNumberInputConfiguration } from "../natif-components/SketchNumberInputComponent";
import { SketchSequenceComponent, configuration as SketchSequenceConfiguration } from "..//natif-components/math/SketchSequenceComponent";
import { SketchMathFunctionComponent, configuration as SketchMathFunctionConfiguration } from "..//natif-components/math/SketchMathFunctionComponent";
import { SketchLineChartComponent, configuration as SketchLineChartConfiguration } from "..//natif-components/chart/SketchLineChartComponent";
import { SketchDataframeFromCSVComponent, configuration as SketchDataframeFromCSVConfiguration } from "..//natif-components/dataframe/SketchDataframeFromCSVComponent";
import { SketchDataframeViewerComponent, configuration as SketchDataframeViewerConfiguration } from "..//natif-components/dataframe/SketchDataframeViewerComponent";
import { SketchDataframeFilterColumnsComponent, configuration as SketchDataFilterColumnsConfiguration } from "..//natif-components/dataframe/SketchDataframeFilterColumnsComponent";
import { SketchKMeansComponent, configuration as SketchKMeansConfiguration } from "..//natif-components/dataframe/SketchKMeans";
import { SketchScatterChartComponent, configuration as SketchScatterChartConfiguration } from "..//natif-components/chart/SketchScatterChartComponent";
import { SketchElbowMethodComponent, configuration as SketchElbowMethodConfiguration } from "..//natif-components/dataframe/SketchElbowMethodComponent";
import { SketchDataframeShuffleComponent, configuration as SketchDataframeShuffleConfiguration } from "..//natif-components/dataframe/SketchDataframeShuffleComponent";
import { SketchDataframeToCSVComponent, configuration as SketchDataframeToCSVConfiguration } from "..//natif-components/dataframe/SketchDataframeToCSVComponent";
import { SketchDataframeUnionComponent, configuration as SketchDataframeUnionConfiguration } from "..//natif-components/dataframe/SketchDataframeUnionComponent";
import { SketchCustomFunctionComponent, configuration as SketchCustomFunctionConfiguration } from "..//natif-components/math/SketchCustomFunctionComponent";
import { SketchDerivativeFunctionComponent, configuration as SketchDerivativeFunctionConfiguration } from "..//natif-components/math/SketchDerivativeFunctionComponent";

// ----- Import of the popups ----- //
import SketchLineChartPopup from '@/sketch/app/natif-components/ui/chart/SketchLineChartPopup.vue';
import SketchScatterChartPopup from '@/sketch/app/natif-components/ui/chart/SketchScatterChartPopup.vue';
import SketchNumberInputPopup from "@/sketch/app/natif-components/ui/SketchNumberInputPopup.vue";
import SketchDataframeFilterColumnsPopup from '@/sketch/app/natif-components/ui/dataframe/SketchDataframeFilterColumnsPopup.vue';
import SketchDataframeFromCSVPopup from '@/sketch/app/natif-components/ui/dataframe/SketchDataframeFromCSVPopup.vue';
import SketchDataframeShufflePopup from '@/sketch/app/natif-components/ui/dataframe/SketchDataframeShufflePopup.vue';
import SketchDataframeToCSVPopup from '@/sketch/app/natif-components/ui/dataframe/SketchDataframeToCSVPopup.vue';
import SketchDataframeUnionPopup from '@/sketch/app/natif-components/ui/dataframe/SketchDataframeUnionPopup.vue';
import SketchDataframeViewerPopup from '@/sketch/app/natif-components/ui/dataframe/SketchDataframeViewerPopup.vue';
import SketchElbowMethodPopup from '@/sketch/app/natif-components/ui/dataframe/SketchElbowMethodPopup.vue';
import SketchKMeansPopup from '@/sketch/app/natif-components/ui/dataframe/SketchKMeansPopup.vue';
// for derivative and custom functions components
import SketchCustomFunctionPopup from '@/sketch/app/natif-components/ui/math/SketchCustomFunctionPopup.vue';
import SketchMathFunctionPopup from '@/sketch/app/natif-components/ui/math/SketchMathFunctionPopup.vue';
import SketchSequencePopup from "@/sketch/app/natif-components/ui/math/SketchSequencePopup.vue";
import { SketchComponentFactory } from "konect-api-types";

// ----- Imports of the factories ----- //
import SketchNumberFactory from "./factory/SketchNumberFactory";
import SketchSequenceFactory from "./factory/math/SketchSequenceFactory";
import SketchMathFunctionFactory from "./factory/math/SketchMathFunctionFactory";
import SketchLineChartFactory from "./factory/chart/SketchLineChartFactory";
import SketchScatterChartFactory from "./factory/SketchScatterChartFactory";
import SketchDataframeFromCSVFactory from "./factory/dataframe/SketchDataframeFromCSVFactory";
import SketchDataframeViewerFactory from "./factory/dataframe/SketchDataframeViewerFactory";
import SketchDataframeFilterColumnsFactory from "./factory/dataframe/SketchDataframeFilterColumnsFactory";
import SketchKMeansFactory from "./factory/dataframe/SketchKMeansFactory";
import SketchElbowMethodFactory from "./factory/dataframe/SketchElbowMethodFactory";
import SketchDataframeShuffleFactory from "./factory/dataframe/SketchDataframeShuffleFactory";
import SketchDataframeToCSVFactory from "./factory/dataframe/SketchDataframeToCSVFactory";
import SketchDataframeUnionFactory from "./factory/dataframe/SketchDataframeUnionFactory";
import SketchCustomFunctionFactory from "./factory/math/SketchCustomFunctionFactory";
import SketchDerivativeFunctionFactory from "./factory/math/SketchDerivativeFunctionFactory";
import { SketchComponent } from "konect-api-types";

// Register all configurations for the components
export const mapComponentWithConfiguration = new Map<GenericSketchComponentClass, ComponentConfiguration>();
mapComponentWithConfiguration.set(SketchNumberInputComponent, SketchNumberInputConfiguration);
mapComponentWithConfiguration.set(SketchSequenceComponent, SketchSequenceConfiguration);
mapComponentWithConfiguration.set(SketchMathFunctionComponent, SketchMathFunctionConfiguration);
mapComponentWithConfiguration.set(SketchLineChartComponent, SketchLineChartConfiguration);
mapComponentWithConfiguration.set(SketchDataframeFromCSVComponent, SketchDataframeFromCSVConfiguration);
mapComponentWithConfiguration.set(SketchDataframeViewerComponent, SketchDataframeViewerConfiguration);
mapComponentWithConfiguration.set(SketchDataframeFilterColumnsComponent, SketchDataFilterColumnsConfiguration);
mapComponentWithConfiguration.set(SketchKMeansComponent, SketchKMeansConfiguration);
mapComponentWithConfiguration.set(SketchScatterChartComponent, SketchScatterChartConfiguration);
mapComponentWithConfiguration.set(SketchElbowMethodComponent, SketchElbowMethodConfiguration);
mapComponentWithConfiguration.set(SketchDataframeShuffleComponent, SketchDataframeShuffleConfiguration);
mapComponentWithConfiguration.set(SketchDataframeUnionComponent, SketchDataframeUnionConfiguration);
mapComponentWithConfiguration.set(SketchDataframeToCSVComponent, SketchDataframeToCSVConfiguration);
mapComponentWithConfiguration.set(SketchCustomFunctionComponent, SketchCustomFunctionConfiguration);
mapComponentWithConfiguration.set(SketchDerivativeFunctionComponent, SketchDerivativeFunctionConfiguration);

// register all popup for the components
export const mapComponentWithPopup = new Map<GenericSketchComponentClass, Component>();

mapComponentWithPopup.set(SketchNumberInputComponent, SketchNumberInputPopup);
mapComponentWithPopup.set(SketchSequenceComponent, SketchSequencePopup);
mapComponentWithPopup.set(SketchDataframeFilterColumnsComponent, SketchDataframeFilterColumnsPopup);
mapComponentWithPopup.set(SketchDataframeFromCSVComponent, SketchDataframeFromCSVPopup);
mapComponentWithPopup.set(SketchDerivativeFunctionComponent, SketchCustomFunctionPopup);
mapComponentWithPopup.set(SketchCustomFunctionComponent, SketchCustomFunctionPopup);
mapComponentWithPopup.set(SketchKMeansComponent, SketchKMeansPopup);
mapComponentWithPopup.set(SketchElbowMethodComponent, SketchElbowMethodPopup);
mapComponentWithPopup.set(SketchDataframeViewerComponent, SketchDataframeViewerPopup);
mapComponentWithPopup.set(SketchDataframeUnionComponent, SketchDataframeUnionPopup);
mapComponentWithPopup.set(SketchMathFunctionComponent, SketchMathFunctionPopup);
mapComponentWithPopup.set(SketchDataframeToCSVComponent, SketchDataframeToCSVPopup);
mapComponentWithPopup.set(SketchDataframeShuffleComponent, SketchDataframeShufflePopup);
mapComponentWithPopup.set(SketchLineChartComponent, SketchLineChartPopup);
mapComponentWithPopup.set(SketchScatterChartComponent, SketchScatterChartPopup);

// register a factory for each component
export const mapComponentWithFactory = new Map<GenericSketchComponentClass, SketchComponentFactory<SketchComponent<unknown>>>();
mapComponentWithFactory.set(SketchNumberInputComponent, new SketchNumberFactory());
mapComponentWithFactory.set(SketchSequenceComponent, new SketchSequenceFactory());
mapComponentWithFactory.set(SketchDataframeFilterColumnsComponent, new SketchDataframeFilterColumnsFactory());
mapComponentWithFactory.set(SketchDataframeFromCSVComponent, new SketchDataframeFromCSVFactory());
mapComponentWithFactory.set(SketchDerivativeFunctionComponent, new SketchDerivativeFunctionFactory());
mapComponentWithFactory.set(SketchCustomFunctionComponent, new SketchCustomFunctionFactory());
mapComponentWithFactory.set(SketchKMeansComponent, new SketchKMeansFactory());
mapComponentWithFactory.set(SketchElbowMethodComponent, new SketchElbowMethodFactory());
mapComponentWithFactory.set(SketchDataframeViewerComponent, new SketchDataframeViewerFactory());
mapComponentWithFactory.set(SketchDataframeUnionComponent, new SketchDataframeUnionFactory());
mapComponentWithFactory.set(SketchMathFunctionComponent, new SketchMathFunctionFactory());
mapComponentWithFactory.set(SketchDataframeToCSVComponent, new SketchDataframeToCSVFactory());
mapComponentWithFactory.set(SketchDataframeShuffleComponent, new SketchDataframeShuffleFactory());
mapComponentWithFactory.set(SketchLineChartComponent, new SketchLineChartFactory());
mapComponentWithFactory.set(SketchScatterChartComponent, new SketchScatterChartFactory());