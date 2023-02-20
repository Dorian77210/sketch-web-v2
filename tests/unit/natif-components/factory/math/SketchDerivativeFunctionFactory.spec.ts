import { expect } from 'chai'

import SketchDerivativeFunctionFactory from '@/sketch/app/natif-components/factory/math/SketchDerivativeFunctionFactory';

import { SketchDerivativeFunctionComponent } from '@/sketch/app/natif-components/math/SketchDerivativeFunctionComponent';

const factory = new SketchDerivativeFunctionFactory();

let component: SketchDerivativeFunctionComponent;

describe('Test the factory for the SketchDerivativeFunctionFactory', () => {
    it('Parse a SketchDerivativeFunctionComponent from a valid JSON', () => {
        component = factory.fromJSON(JSON.stringify({
            customFunction: 'x^2'
        }));

        expect(component.customFunction).equals('x^2');
    });

    it('Parse a SketchDerivativeFunctionComponent from an empty string', () => {
        component = factory.fromJSON(JSON.stringify({}));
        expect(component.customFunction).equals('');
    });


    it('Serialize a SketchDerivativeFunctionComponent with a valid function name', () => {
        component = new SketchDerivativeFunctionComponent();
        component.setCustomFunction('x^2');

        const json = factory.toJSON(component);
        expect(json).deep.equals({
            customFunction: 'x^2'
        });
    });

    it('Serialize a SketchDerivativeFunctionComponent without a function name', () => {
        component = new SketchDerivativeFunctionComponent();

        const json = factory.toJSON(component);
        expect(json).deep.equals({
            customFunction: ''
        });
    });
});