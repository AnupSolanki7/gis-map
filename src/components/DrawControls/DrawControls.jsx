import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

const SHAPE_OPTIONS = {
  color: '#1565C0',
  fillColor: '#42A5F5',
  fillOpacity: 0.15,
  weight: 2.5,
  dashArray: null,
};

export function DrawControls({ activeDrawTool, onShapeDrawn, onDrawStop, clearCount }) {
  const map = useMap();
  const drawnItemsRef = useRef(null);
  const activeHandlerRef = useRef(null);

  // One-time setup: FeatureGroup + event listeners
  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    drawnItemsRef.current = drawnItems;
    map.addLayer(drawnItems);

    const handleCreated = (e) => {
      drawnItems.clearLayers();
      drawnItems.addLayer(e.layer);
      onShapeDrawn(e.layer, e.layerType);
      activeHandlerRef.current = null;
    };

    const handleDrawStop = () => {
      onDrawStop();
    };

    map.on(L.Draw.Event.CREATED, handleCreated);
    map.on(L.Draw.Event.DRAWSTOP, handleDrawStop);

    return () => {
      map.off(L.Draw.Event.CREATED, handleCreated);
      map.off(L.Draw.Event.DRAWSTOP, handleDrawStop);
      map.removeLayer(drawnItems);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  // Activate / deactivate draw handler when activeDrawTool changes
  useEffect(() => {
    if (activeHandlerRef.current) {
      activeHandlerRef.current.disable();
      activeHandlerRef.current = null;
    }

    if (!activeDrawTool) return;

    const opts = { shapeOptions: SHAPE_OPTIONS };
    let handler = null;

    if (activeDrawTool === 'rectangle') {
      handler = new L.Draw.Rectangle(map, opts);
    } else if (activeDrawTool === 'polygon') {
      handler = new L.Draw.Polygon(map, { ...opts, allowIntersection: false });
    } else if (activeDrawTool === 'circle') {
      handler = new L.Draw.Circle(map, { shapeOptions: SHAPE_OPTIONS });
    }

    if (handler) {
      handler.enable();
      activeHandlerRef.current = handler;
    }
  }, [activeDrawTool, map]);

  // Clear drawn shapes when clearCount increments
  useEffect(() => {
    if (clearCount > 0 && drawnItemsRef.current) {
      drawnItemsRef.current.clearLayers();
    }
  }, [clearCount]);

  return null;
}
