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
                const item = this.parseItem(j, i);
                if (item) {
                    parsedItems.push(item);
                }
            }
        }

        return parsedItems;
    }


    private parseItem(x: number, y: number): ParsedItem {
        const map = this.mapData.getMap();
        const [colCenter, rowCenter] = this.mapData.getMapCenter();
        
        let char = map[y][x];

        if (char !== '.' && !isNumeric(char)) {
            const pos = new Vector3(x * MAP_CONVERSION_RATIO - colCenter, 0, -(y * MAP_CONVERSION_RATIO - rowCenter));
            const str = this.parseChar(x, y);

            return <ParsedItem> { pos, str }
        }
    }

    private parseChar(x: number, y: number): string {
        let char = this.mapData.getChar(x, y);

        if (isNumeric(this.mapData.getRightChar(x, y))) {
            char += this.getIndex(x, y, (x, y) => [x + 1, y]);
        } 
        
        // else if (isNumeric(this.mapData.getLeftChar(x, y))) {
        //     char += this.getIndex(x, y, (x, y) => [x - 1, y]);
        // } else if (isNumeric(this.mapData.getBottomChar(x, y))) {
        //     char += this.getIndex(x, y, (x, y) => [x, y - 1]);
        // } else if (isNumeric(this.mapData.getTopChar(x, y))) {
        //     char += this.getIndex(x, y, (x, y) => [x, y + 1]);
        // }

        return char;
    }

    private getIndex(x: number, y: number, getNextIndex: (x: number, y: number) => [number, number]): string {
        let index: string = ''; 

        while (true) {
            [x, y] = getNextIndex(x, y);
            const char = this.mapData.getChar(x, y);
            
            if (isNumeric(char)) {
                index += char;
            } else {
                break;
            }
        }

        return index !== '' ? index : undefined;
    }
}

function isNumeric(num: any){
    return !isNaN(num);
}