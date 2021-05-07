import { Vector2 } from "babylonjs";
import { GameObjectJson, MeshObjType } from "../../../model/object/mesh/MeshObj";
import { toStrVector } from "../../base/import/AbstractPropertyParser";
import { WorldMap } from "./WorldMap";
import { ParsedItem, MapParser } from "./MapParser";

export class ItemMapParser {
    private jsons: GameObjectJson[];
    private mapParser: MapParser;

    constructor() {
        this.mapParser = new MapParser();
    }

    getSize(): Vector2 {
        return this.mapParser.getWorldSize();
    }

    getGameObjJsons(): GameObjectJson[] {
        return this.jsons;
    }

    getQuarterNum(): Vector2 {
        return this.mapParser.getQuarterNum();
    }

    parse(json: WorldMap): void {
        this.mapParser.parse(json, json.map);

        this.jsons = this.mapParser.getParsedItems().map(item => this.createGameObject(item, json));
    }

    private createGameObject(parsedItem: ParsedItem, worldJson: WorldMap): GameObjectJson {
        const type = worldJson.charToType[parsedItem.str];

        const typeFeatures = worldJson.features[type] || [];
        const charFeatures = worldJson.features[parsedItem.str] || [];
        const features = [...typeFeatures, ...charFeatures];
        features.splice(1, 0, `Position ${toStrVector(parsedItem.pos)}`);

        return {
            type: <MeshObjType> type,
            ch: parsedItem.str,
            features: features
        };
    }
}