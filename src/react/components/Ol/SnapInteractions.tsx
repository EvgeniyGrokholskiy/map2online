import React, {useEffect} from 'react';
import {Snap as SnapInteraction} from 'ol/interaction';
import Collection from 'ol/Collection';
import olMapContext from './context/map';
import useVisibleFeatures from './hooks/useVisibleFeatures';
import OlFeature from 'ol/Feature';
import {Feature, ID} from '../../../app-rx/catalog';
import {merge} from 'rxjs';
import {getCatalog} from '../../../di-default';
import {setOlFeatureCoordinates} from './lib/feature';

const catalog = getCatalog()

const SnapInteractions: React.FunctionComponent = (): React.ReactElement => {
  const map = React.useContext(olMapContext);
  const olFeatures: OlFeature[] = useVisibleFeatures();
  const snapInteractionRef = React.useRef(null);

  useEffect(() => {
    if (snapInteractionRef.current) {
      map.removeInteraction(snapInteractionRef.current);
    }
    snapInteractionRef.current = new SnapInteraction({features: new Collection(olFeatures)});
    map.addInteraction(snapInteractionRef.current);

    const featuresObservables = olFeatures.map(olFeature => catalog.featureById(olFeature.getId().toString()).observable())
    const olFeaturesById: Record<ID, OlFeature> = {}
    olFeatures.forEach(olFeature => olFeaturesById[olFeature.getId()] = olFeature)
    const featuresObservable = merge(...featuresObservables).subscribe((feature: Feature) => {
      if (!feature) return; // feature deletion is handled in the other useEffect
      const olFeature = olFeaturesById[feature.id]
      if (olFeature) setOlFeatureCoordinates(olFeature, feature)
    })
    return () => {
      featuresObservable.unsubscribe();
      if (snapInteractionRef.current) {
        map.removeInteraction(snapInteractionRef.current);
        snapInteractionRef.current = null;
      }
    }
  }, [olFeatures, map]);

  return null;
};

export default SnapInteractions;