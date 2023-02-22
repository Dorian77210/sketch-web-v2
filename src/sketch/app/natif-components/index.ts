import { ComponentConfiguration } from "@/sketch/api/component-configuration";
import SketchComponent from "@/sketch/api/sketch-component";
import { Class } from "@/sketch/api/types";


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


const mapComponentWithConfiguration = new Map<Class<SketchComponent<unknown>>, ComponentConfiguration>();

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


export default mapComponentWithConfiguration;