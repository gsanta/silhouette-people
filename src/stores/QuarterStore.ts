import { QuarterMap } from "../model/area/QuarterMap";

export class QuarterStore {
    private map: QuarterMap;

    getMap() {
        return this.map;
    }

    setMap(map: QuarterMap) {
        this.map = map;
    }
}