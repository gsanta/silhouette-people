import { Vector3 } from "babylonjs";
import { MapData } from "./MapData";
import { ParsedItem, MAP_CONVERSION_RATIO } from "./MapParser";

export class ItemParser {
    private mapData: MapData;

    getItems(mapData: MapData): ParsedItem[] {
        this.mapData = mapData;

        return this.parseItems();
    }

    private parseItems() {
        const parsedItems: ParsedItem[] = [];
        const [cols, rows] = this.mapData.getMapSize();

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const json = this.parseItem(j, i);
                if (json) {
                    parsedItems.push(json);
                }
            }
        }

        return parsedItems;
    }


    private parseItem(x: number, y: number): ParsedItem {
        const map = this.mapData.getMap();
        const [cols] = this.mapData.getMapSize();
        const [colCenter, rowCenter] = this.mapData.getMapCenter();
        
        let char = map[y][x];

        if (char === '.' || isNumeric(char)) { return undefined }

        const posX = x * MAP_CONVERSION_RATIO - colCenter;
        const posY = -(y * MAP_CONVERSION_RATIO - rowCenter);
        const pos = new Vector3(posX, 0, posY);

        x += 1;
        while(cols > x && isNumeric(map[y][x])) {
            char = char + map[y][x];
            x += 1;
        }

        return <ParsedItem> {
            pos,
            str: char
        }
    }
}

function isNumeric(num: any){
    return !isNaN(num);
}