import { expect } from 'chai'

import SketchMathFunctionFactory from '@/sketch/app/natif-components/factory/math/SketchMathFunctionFactory'

import { SketchMathFunctionComponent } from '@/sketch/app/natif-components/math/SketchMathFunctionComponent'

const factory = new SketchMathFunctionFactory();

let component: SketchMathFunctionComponent;

describe('Test the factory for the SketchMathFunctionFactory', () => {
    it('Parse a SketchMathFunctionFactory from a valid JSON', () => {
        component = factory.fromJSON({
            functionName: 'tan'
        });

        expect(component.functionName).equals('tan');
    });

    it('Parse a SketchMathFunction from an empty string', () => {
        component = factory.fromJSON({});
        expect(component.functionName).equals('cos');
    });


    it('Serialize a SketchMathFunction with a valid function name', () => {
        component = new SketchMathFunctionComponent();
        component.setFunctionName('acos');

        const json = factory.toJSON(component);
        expect(json).deep.equals({
            functionName: 'acos'
        });
    });

    it('Serialize a SketchMathFunction without a function name', () => {
        component = new SketchMathFunctionComponent();

        const json = factory.toJSON(component);
        expect(json).deep.equals({
            functionName: 'cos'
        });
    });
});