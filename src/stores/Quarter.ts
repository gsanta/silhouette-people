import { QuarterMap } from "../model/area/QuarterMap";

export class Quarter {
    private map: QuarterMap;

    getMap() {
        return this.map;
    }

    setMap(map: QuarterMap) {
        this.map = map;
    }
}