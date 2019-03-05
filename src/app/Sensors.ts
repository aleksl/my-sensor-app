import { SensorDust } from './SensorDust';
import { SensorTempHumPress } from './SensorTempHumPress';

export class Sensors {
    id: number;
    name: string;
    latitude : string;
    longitude : string;
    enable: boolean;

    sensorDust: SensorDust;
    sensorTempHumPress : SensorTempHumPress;
}