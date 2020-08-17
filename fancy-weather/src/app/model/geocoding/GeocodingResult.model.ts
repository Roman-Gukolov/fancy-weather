import { LatLng } from './LatLng.model';
import { Components } from './Components.model';

export class GeocodingResult {
  public components: Components;
  public formatted: string;
  public geometry: LatLng;
}
