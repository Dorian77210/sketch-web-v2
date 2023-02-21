import { expect } from "chai";

import SketchDataframeToCSVFactory from "@/sketch/app/natif-components/factory/dataframe/SketchDataframeToCSVFactory";

import { SketchDataframeToCSVComponent } from "@/sketch/app/natif-components/dataframe/SketchDataframeToCSVComponent";

const factory = new SketchDataframeToCSVFactory();

let component: SketchDataframeToCSVComponent;

describe('Test the factory for the SketchDataframeToCSVComponent', () => {
    it('Parse a SketchDataframeToCSVComponent from a valid JSON', () => {
        component = factory.fromJSON({
            filename: 'file'
        });

        expect(component.filename).equals('file');
    });

    it('Parse a SketchDataframeToCSVComponent from an empty JSON', () => {
        component = factory.fromJSON({ });

        expect(component.filename).equals('');
    });


    it('Serialize a SketchDataframeToCSVComponent with a filename', () => {
        component = new SketchDataframeToCSVComponent();
        component.setFilename('filename-test');

        const json = factory.toJSON(component);

        expect(json).deep.equals({ filename: 'filename-test' });
    });

    it('Serialize a SketchDataframeToCSVComponent with no filename', () => {
        component = new SketchDataframeToCSVComponent();

        const json = factory.toJSON(component);

        expect(json).deep.equals({ filename: '' });
    });
});