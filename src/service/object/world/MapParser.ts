import { Vector2, Vector3 } from "babylonjs";
import { WorldMap } from "./WorldMap";

export const MAP_CONVERSION_RATIO = 2;

export interface ParsedItem {
    pos: Vector3;
    str: string;
}

export interface MapResult {
    size: Vector2;
    quarterNum: Vector2;

    items: ParsedItem[];
}

export class MapParser {
    private readonly skipCharacters: string[] = [];
    private mapRows: number;
    private mapCols: number;
    
    private mapLines: string[];
    private size: Vector2;
    private quartersX: number;
    private quartersY: number;
    
    private mapCenter: Vector2;
    
    private parsedItems: ParsedItem[] = [];

    constructor(skipCharacters: string[] = []) {
        this.skipCharacters = skipCharacters;
    }

    parse(json: WorldMap, map: string): MapResult {
        this.parseMap(json, map);
        this.parseItems();

        return {
            size: this.size,
            quarterNum: new Vector2(this.quartersX, this.quartersY),
            items: this.parsedItems
        }
    }

    private parseMap(json: WorldMap, map: string) {
        map = map.trim();

        const firstLineRegex = /^.*$/m;
        const firstLineMatch = map.match(firstLineRegex);

        this.quartersX = firstLineMatch[0].split(' ').length;
        this.quartersY = map.split('\n').filter(line => line.trim() === '').length + 1;
        
        this.mapLines = this.normalizeMap(map);

        this.mapRows = this.mapLines.length;
        this.mapCols = this.mapLines[0].length;

        const colCenter = this.mapCols / 2 * MAP_CONVERSION_RATIO;
        const rowCenter = this.mapRows / 2 * MAP_CONVERSION_RATIO;
        this.mapCenter = new Vector2(colCenter, rowCenter);

        json.size = `${this.mapCols * 2}:${this.mapRows * 2}`;
        this.size = new Vector2(this.mapCols * 2, this.mapRows * 2);
    }

    private normalizeMap(map: string): string[] {
        map = map.split(' ').join('')
        
        this.skipCharacters.forEach(skipChar => map = map.replace(new RegExp(skipChar, 'g'), '.'));

        const lines = map.split("\n").map(line => line.trim()).filter(line => line !== '');

        return lines;
    }

    private parseItems() {
        const parsedItems: ParsedItem[] = [];

        for (let i = 0; i < this.mapRows; i++) {
            for (let j = 0; j < this.mapCols; j++) {
                const json = this.parseItem(j, i);
                if (json) {
                    parsedItems.push(json);
                }
            }
        }

        this.parsedItems = parsedItems;
    }

    private parseItem(x: number, y: number): ParsedItem {
        const mapLines = this.mapLines;

        let char = mapLines[y][x];
        if (char === '.' || isNumeric(char)) { return undefined }

        const posX = x * MAP_CONVERSION_RATIO - this.mapCenter.x;
        const posY = -(y * MAP_CONVERSION_RATIO - this.mapCenter.y);
        const pos = new Vector3(posX, 0, posY);

        x += 1;
        while(mapLines[y].length > x && isNumeric(mapLines[y][x])) {
            char = char + mapLines[y][x];
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