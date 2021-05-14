import { Vector2, Vector3 } from "babylonjs";
import { MapSplitter } from "./MapSplitter";
import { IndexPosition, ItemParser } from "./ItemParser";
import { MapData } from "./MapData";

export const MAP_CONVERSION_RATIO = 2;
export const QUARTER_SIZE = 10;

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
    private map: string[][] = [];
    
    private readonly mapSplitter: MapSplitter;
    private readonly mapData: MapData;
    private readonly itemParser: ItemParser;

    constructor(skipCharacters: string[] = []) {

        this.mapSplitter = new MapSplitter(skipCharacters);
        this.mapData = new MapData();
        this.itemParser = new ItemParser();
    }

    parse(mapStr: string, indexPositions: Set<IndexPosition>): MapResult {
        this.map = this.mapSplitter.split(mapStr);
        this.mapData.setMap(this.map);

        const parsedItems = this.itemParser.getItems(this.mapData, indexPositions);
        const [cols, rows] = this.mapData.getMapSize()

        return {
            size: new Vector2(cols * MAP_CONVERSION_RATIO, rows * MAP_CONVERSION_RATIO),
            quarterNum: new Vector2(cols / QUARTER_SIZE, rows / QUARTER_SIZE),
            items: parsedItems
        }
    }
}