import { expect } from 'chai'

import SketchCustomFunctionFactory from '@/sketch/app/natif-components/factory/math/SketchCustomFunctionFactory'

import { SketchCustomFunctionComponent } from '@/sketch/app/natif-components/math/SketchCustomFunctionComponent'

const factory = new SketchCustomFunctionFactory();

let component: SketchCustomFunctionComponent;

describe('Test the factory for the SketchCustomFunctionComponent', () => {
    it('Parse a SketchCustomFunctionComponent from a valid JSON', () => {
        component = factory.fromJSON(JSON.stringify({
            customFunction: 'x^2 + 4'
        }));

        expect(component.customFunction).equals('x^2 + 4');
    });

    it('Parse a SketchCustomFunctionComponent from an empty JSON', () => {
        component = factory.fromJSON(JSON.stringify({}));

        expect(component.customFunction).equals('');
    });


    it('Serialize a SketchCustomFunctionComponent from a valid custom function', () => {
        component = new SketchCustomFunctionComponent();
        component.setCustomFunction('x^2 - 9');

        const json = factory.toJSON(component);

        expect(json).deep.equals({
            customFunction: 'x^2 - 9'
        });
    });

    it('Serialize a SketchCustomFunctionComponent from an empty string', () => {
        component = new SketchCustomFunctionComponent();

        const json = factory.toJSON(component);

        expect(json).deep.equals({
            customFunction: ''
        });
    });
});