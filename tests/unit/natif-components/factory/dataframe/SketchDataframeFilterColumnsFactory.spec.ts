import { expect } from "chai";

import SketchDataframeFilterColumnsFactory from "@/sketch/app/natif-components/factory/dataframe/SketchDataframeFilterColumnsFactory";

import { SketchDataframeFilterColumnsComponent } from "@/sketch/app/natif-components/dataframe/SketchDataframeFilterColumnsComponent";

const factory = new SketchDataframeFilterColumnsFactory();

let component: SketchDataframeFilterColumnsComponent;


describe('Test the factory for the SketchDataframeFilterColumnsComponent', () => {
    it('Parse a SketchDataframeFilterColumnsComponent from a valid JSON', () => {
        component = factory.fromJSON({
            selectedColumns: ['a', 'b', 'c']
        });

        expect(component.selectedColumns).deep.equals(['a', 'b', 'c']);
    });

    it('Parse a SketchDataframeFilterColumnsComponent with an empty list of columns', () => {
        component = factory.fromJSON({
            selectedColumns: []
        });

        expect(component.selectedColumns).deep.equals([]);
    });

    it('Parse a SketchDataframeFilterColumnsComponent with an empty JSON', () => {
        component = factory.fromJSON({});

        expect(component.selectedColumns).deep.equals([]);
    });


    it('Serialize a SketchDataframeFilterColumnsComponent with selected columns', () => {
        component = new SketchDataframeFilterColumnsComponent();
        component.setSelectedColumns(['a', 'b']);

        const json = factory.toJSON(component);

        expect(json).deep.equals({
            selectedColumns: ['a', 'b']
        });
    });

    it('Serialize a SketchDataframeFilterColumnsComponent empty selected columns', () => {
        component = new SketchDataframeFilterColumnsComponent();
        component.setSelectedColumns([]);

        const json = factory.toJSON(component);
        
        expect(json).deep.equals({ selectedColumns: [] });
    });

    it('Serialize a SketchDataframeFilterColumnsComponent with none selected columns', () => {
        component = new SketchDataframeFilterColumnsComponent();

        const json = factory.toJSON(component);

        expect(json).deep.equals({ selectedColumns: [] });
    });
});
