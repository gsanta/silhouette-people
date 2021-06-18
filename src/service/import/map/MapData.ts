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

    getChar(x: number, y: number) {
        const [cols, rows] = this.getMapSize();
        
        if (x >= cols - 1 || y >= rows - 1 || x < 0 || y < 0) {
            return undefined;
        } 

        return this.map[y][x];
    }

    getLeftChar(x: number, y: number) {
        if (x === 0) { return undefined; }

        return this.map[y][x - 1];
    }

    getRightChar(x: number, y: number) {
        const [cols] = this.getMapSize();

        if (x >= cols - 1) {
            return undefined;
        }

        return this.map[y][x + 1];
    }

    getTopChar(x: number, y: number) {
        if (y === 0) { return undefined; }

        return this.map[y - 1][x];
    }

    
    getBottomChar(x: number, y: number) {
        const [_cols, rows] = this.getMapSize();

        if (y >= rows - 1) { return undefined; }

        return this.map[y + 1][x];
    }
}