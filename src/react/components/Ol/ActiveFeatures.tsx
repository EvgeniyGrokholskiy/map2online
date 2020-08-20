import React, {useEffect} from 'react';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import useVisibleFeatures from './hooks/useVisibleFeatures';
import log from '../../../log';
import olMapContext from './context/map';
import OlFeature from 'ol/Feature';
import OlPoint from 'ol/geom/Point';
import OlLineString from 'ol/geom/LineString';
import {getCatalog} from '../../../di-default';
import {merge} from 'rxjs';
import {Coordinate, Feature, ID, isLineString, isPoint} from '../../../app-rx/catalog';
import {coordinate2ol, coordinates2ol} from './lib/coordinates';
import {Coordinate as OlCoordinate} from 'ol/coordinate';
import {setOlFeatureCoordinates} from './lib/feature';

const catalog = getCatalog();

const source = new VectorSource({wrapX: false});
const layer = new VectorLayer({source: source});

let olFeaturesById: Record<ID, OlFeature> = {}

// used by zoom 2 extent control
export const visibleOlFeatures = (): OlFeature[] => Object.values(olFeaturesById)

const ActiveFeatures: React.FunctionComponent = (): React.ReactElement => {
  const olFeatures: OlFeature[] = useVisibleFeatures();
  const map = React.useContext(olMapContext);


  useEffect(() => {
    map.addLayer(layer);
    return () => {
      map.removeLayer(layer)
    }
  }, [map]);

  useEffect(() => {
    source.clear();
    source.addFeatures(olFeatures);

    const featuresObservables = olFeatures.map(olFeature => catalog.featureById(olFeature.getId().toString()).observable())
    olFeaturesById = {}
    olFeatures.forEach(olFeature => olFeaturesById[olFeature.getId()] = olFeature)
    const featuresObservable = merge(...featuresObservables).subscribe((feature: Feature) => {
      if (!feature) return; // feature deletion is handled in the other useEffect
      const olFeature = olFeaturesById[feature.id]
      setOlFeatureCoordinates(olFeature, feature);
    })
    return () => featuresObservable.unsubscribe()
  })

  log.render('ActiveFeatures');

  return null;
};

export default ActiveFeatures;