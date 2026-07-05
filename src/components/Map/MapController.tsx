import { useMapEvents } from 'react-leaflet';
import { useMapStore } from '@/store';

export function MapController() {
  const setZoom = useMapStore((s) => s.setZoom);
  const setMousePos = useMapStore((s) => s.setMousePos);
  const setCenter = useMapStore((s) => s.setCenter);

  useMapEvents({
    zoomend: (e) => setZoom(e.target.getZoom()),
    moveend: (e) => {
      const c = e.target.getCenter();
      setCenter([c.lat, c.lng]);
    },
    mousemove: (e) => setMousePos({ lat: e.latlng.lat, lng: e.latlng.lng }),
    mouseout: () => setMousePos(null),
  });

  return null;
}
