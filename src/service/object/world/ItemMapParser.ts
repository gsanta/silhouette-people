import { Vector2 } from "babylonjs";
import { MeshConfig, MeshObjType } from "../../../model/object/mesh/MeshObj";
import { toStrVector } from "../../base/import/AbstractPropertyParser";
import { WorldMap } from "./WorldMap";
import { ParsedItem, MapParser } from "./MapParser";

export class ItemMapParser {
    private jsons: MeshConfig[];
    private mapParser: MapParser;

    constructor() {
        this.mapParser = new MapParser();
    }

    getSize(): Vector2 {
        return this.mapParser.getWorldSize();
    }

    getGameObjJsons(): MeshConfig[] {
        return this.jsons;
    }

    getQuarterNum(): Vector2 {
        return this.mapParser.getQuarterNum();
    }

    parse(json: WorldMap): void {
        this.mapParser.parse(json, json.map);

        this.jsons = this.mapParser.getParsedItems().map(item => this.createGameObject(item, json));
    }

    private createGameObject(parsedItem: ParsedItem, worldJson: WorldMap): MeshConfig {
        const type = worldJson.charToType[parsedItem.str];

        const typeProps = worldJson.objects[type] ? worldJson.objects[type].properties || {} : {};
        const charProps = worldJson.objects[parsedItem.str] ? worldJson.objects[parsedItem.str].properties || {} : {};
        const props = {...typeProps, ...charProps};
        props.position = toStrVector(parsedItem.pos);

        return {
            type: <MeshObjType> type,
            ch: parsedItem.str,
            props: props
        };
    }
}