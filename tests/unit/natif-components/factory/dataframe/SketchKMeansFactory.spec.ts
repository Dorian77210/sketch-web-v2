import { expect } from 'chai'

import SketchKMeansFactory from '@/sketch/app/natif-components/factory/dataframe/SketchKMeansFactory'

import { SketchKMeansComponent } from '@/sketch/app/natif-components/dataframe/SketchKMeans'

let component: SketchKMeansComponent;

const factory = new SketchKMeansFactory();

describe('Test the factory for the SKetchKMeansComponent', () => {
    it('Parse a SketchKMeansComponent with a valid JSON', () => {
        component = factory.fromJSON({
            clusters: 10
        });

        expect(component.clusters).equals(10);
    });

    it('Parse a SketchKMeansComponent with an empty JSON', () => {
        component = factory.fromJSON({});

        expect(component.clusters).equals(0);
    });


    it('Serialize a SketchKMeansComponent with defined clusters value', () => {
        component = new SketchKMeansComponent();
        component.setClusters(100);

        const json = factory.toJSON(component);

        expect(json).deep.equals({ clusters: 100 });
    });

    it('Serialize a SketchKMeansComponent with undefined clusters value', () => {
        component = new SketchKMeansComponent();
        
        const json = factory.toJSON(component);
        
        expect(json).deep.equals({ clusters: 0 });
    });
});