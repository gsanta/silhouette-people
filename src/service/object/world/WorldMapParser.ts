import { Vector2 } from "babylonjs";
import { GameObjectJson, MeshObjType } from "../../../model/object/mesh/MeshObj";
import { toStrVector } from "../../base/import/AbstractPropertyParser";
import { WorldJson } from "./WorldJson";
import { ParsedItem, WorldJsonParser } from "./WorldJsonParser";

export class WorldMapParser {
    private jsons: GameObjectJson[];
    private worldJsonParser: WorldJsonParser;

    constructor() {
        this.worldJsonParser = new WorldJsonParser();
    }

    getSize(): Vector2 {
        return this.worldJsonParser.getWorldSize();
    }

    getGameObjJsons(): GameObjectJson[] {
        return this.jsons;
    }

    getQuarterNum(): Vector2 {
        return this.worldJsonParser.getQuarterNum();
    }

    parse(json: WorldJson): void {
        this.worldJsonParser.parse(json);

        this.jsons = this.worldJsonParser.getParsedItems().map(item => this.createGameObject(item, json));
    }

    private createGameObject(parsedItem: ParsedItem, worldJson: WorldJson): GameObjectJson {
        const type = worldJson.charToType[parsedItem.str];

        const typeFeatures = worldJson.features[type] || [];
        const charFeatures = worldJson.features[parsedItem.str] || [];
        const features = [...typeFeatures, ...charFeatures];
        features.splice(1, 0, `Position ${toStrVector(parsedItem.pos)}`);

        return {
            position: parsedItem.pos,
            type: <MeshObjType> type,
            ch: parsedItem.str,
            features: features
        };
    }
}