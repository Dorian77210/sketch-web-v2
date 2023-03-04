import { expect } from 'chai'

import SketchSequenceFactory from "@/sketch/app/natif-components/factory/math/SketchSequenceFactory";

import SketchSequenceComponent from "@/sketch/app/natif-components/math/SketchSequenceComponent";

const factory = new SketchSequenceFactory();
let component: SketchSequenceComponent;

describe('Test the factory for the SketchSequenceComponent', () => {
    it('Parse a SketchSequenceComponent from a valid JSON', () => {
        component = factory.fromJSON({
            end: 10,
            begin: 9,
            step: 0.1
        });

        expect(component.getSequenceData().begin).equals(9);
        expect(component.getSequenceData().end).equals(10);
        expect(component.getSequenceData().step).equals(0.1);
    });

    it('Parse a SketchSequenceComponent from a JSON without end', () => {
        component = factory.fromJSON({
            begin: 10,
            step: 0.1
        });

        expect(component.getSequenceData().begin).equals(10);
        expect(component.getSequenceData().step).equals(0.1);
        expect(component.getSequenceData().end).equals(0);
    });

    it('Parse a SketchSequenceComponent from a JSON without begin', () => {
        component = factory.fromJSON({
            step: 0.1,
            end: 10
        });

        expect(component.getSequenceData().begin).equals(0);
        expect(component.getSequenceData().step).equals(0.1);
        expect(component.getSequenceData().end).equals(10);
    });

    it('Parse a SketchSequenceComponent from a JSON without step', () => {
        component = factory.fromJSON({
            begin: 10,
            end: 93
        });

        expect(component.getSequenceData().begin).equals(10);
        expect(component.getSequenceData().step).equals(0);
        expect(component.getSequenceData().end).equals(93);
    });

    it('Parse a SketchSequenceComponent from an empty JSON', () => {
        component = factory.fromJSON({});

        expect(component.getSequenceData().begin).equals(0);
        expect(component.getSequenceData().end).equals(0);
        expect(component.getSequenceData().step).equals(0);
    });


    it('Serialize a SketchSequenceComponent with valid end, begin and step properties', () => {
        component = new SketchSequenceComponent();
        component.getSequenceData().end = 10;
        component.getSequenceData().begin = 11;
        component.getSequenceData().step = 0.1;

        const json = factory.toJSON(component);
        expect(json).deep.equals({
            end: 10,
            begin: 11,
            step: 0.1
        });
    });

    it('Serialize a SketchSequenceComponent with valid end and begin', () => {
        component = new SketchSequenceComponent();
        component.getSequenceData().end = 10;
        component.getSequenceData().begin = 100;

        const json = factory.toJSON(component);
        expect(json).deep.equals({
            end: 10,
            begin: 100,
            step: 0
        });
    });

    it('Serialize a SketchSequenceComponent without values', () => {
        component = new SketchSequenceComponent();

        const json = factory.toJSON(component);
        expect(json).deep.equals({
            end: 0,
            step: 0,
            begin: 0
        });
    });
});