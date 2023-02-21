import { expect } from 'chai'

import SketchNumberFactory from '@/sketch/app/natif-components/factory/SketchNumberFactory';
import { SketchNumberInputComponent } from '@/sketch/app/natif-components/SketchNumberInputComponent';

const factory = new SketchNumberFactory();
let component: SketchNumberInputComponent;

describe('Test the factory for the SketchNumberComponent', () => {
    it('Parse a SketchNumberComponent from a valid JSON', () => {
        component = factory.fromJSON({ value: 10 });
        expect(component.getValue()).equals(10);
    });

    it('Parse a SketchNumberComponent from a JSON without number value', () => {
        component = factory.fromJSON({});
        expect(component.getValue()).equals(0);
    });

    it('Parse a SketchNumberComponent from an empty JSON', () => {
        component = factory.fromJSON({ });
        expect(component.getValue()).equals(0);
    });

    it('Serialize a SketchNumberComponent with number set', () => {
        component = new SketchNumberInputComponent();
        component.setValue(100);
        const json = factory.toJSON(component);
        expect(json).deep.equals({ value: 100 });
    });

    it('Serialize a SketchNumberComponent with none number set', () => {
        component = new SketchNumberInputComponent();
        const json = factory.toJSON(component);
        expect(json).deep.equals({ value: 0 });
    });
});