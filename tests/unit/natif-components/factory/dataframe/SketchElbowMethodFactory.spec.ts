import { expect } from 'chai'

import SketchElbowMethodFactory from '@/sketch/app/natif-components/factory/dataframe/SketchElbowMethodFactory'

import { SketchElbowMethodComponent } from '@/sketch/app/natif-components/dataframe/SketchElbowMethodComponent'

const factory = new SketchElbowMethodFactory();

let component: SketchElbowMethodComponent;

describe('Test the factory for the SketchElbowMethodComponent', () => {
    it('Parse a SketchElbowMethodComponent with a valid JSON', () => {
        component = factory.fromJSON(JSON.stringify({
            maxClusters: 10
        }));

        expect(component.maxClusters).equals(10);
    });

    it('Parse a SketchElbowMethodComponent with an empty JSON', () => {
        component = factory.fromJSON(JSON.stringify({}));

        expect(component.maxClusters).equals(0);
    });


    it('Serialize a SketchElbowMethodComponent from a valid JSON', () => {
        component = new SketchElbowMethodComponent();
        component.setMaxClusters(100);

        const json = factory.toJSON(component);
        expect(json).deep.equals({ maxClusters: 100 });
    });

    it('Serialize a SketchElbowMethodComponent from an empty JSON', () => {
        component = new SketchElbowMethodComponent();

        const json = factory.toJSON(component);

        expect(json).deep.equals({ maxClusters: 0 });
    })
});