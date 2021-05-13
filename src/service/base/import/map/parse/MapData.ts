import { MAP_CONVERSION_RATIO } from "./MapParser";

export class MapData {
    private map: string[][];

    setMap(map: string[][]) {
        this.map = map;
    }

    getMap(): string[][] {
        return this.map;
    }

    getMapSize(): [number, number] {
        const rows = this.map.length;
        const cols = this.map[0].length;
        return [cols, rows];
    }

    getMapCenter(): [number, number] {
        const [cols, rows] = this.getMapSize();
        const colCenter = cols / 2 * MAP_CONVERSION_RATIO;
        const rowCenter = rows / 2 * MAP_CONVERSION_RATIO;
        return [colCenter, rowCenter];
    }
}