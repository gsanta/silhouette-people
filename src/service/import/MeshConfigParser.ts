import { GameObjectConfig, GameObjectType } from "../../model/objects/game_object/GameObject";
import { toStrVector } from "./AbstractPropertyParser";
import { IndexPosition } from "./map/ItemParser";
import { SceneParser, ParsedItem } from "./map/SceneParser";
import { WorldMap } from "./WorldMap";

export class MeshConfigParser {
    private mapParser: SceneParser;

    constructor(mapParser: SceneParser) {
        this.mapParser = mapParser;
    }

    parse(json: WorldMap): GameObjectConfig[] {
        const mapResult = this.mapParser.parse(json.map, new Set([IndexPosition.RIGHT]));

        return mapResult.items.map(item => this.createMeshConfig(item, json));
    }

    private createMeshConfig(parsedItem: ParsedItem, worldJson: WorldMap): GameObjectConfig {
        const type = worldJson.charToType[parsedItem.str];

        const typeProps = worldJson.objects[type] ? worldJson.objects[type].properties || {} : {};
        const charProps = worldJson.objects[parsedItem.str] ? worldJson.objects[parsedItem.str].properties || {} : {};
        const props = {...typeProps, ...charProps};
        const model = props.model;
        const collider = props.collider;
        const tags = props.tags;
        const texture = props.texture;
        const rotate = props.rotate;
        delete props.collider;
        delete props.model;
        delete props.tags;
        delete props.texture;
        delete props.rotate;
        
        if (props.positionY) {
            parsedItem.pos.y = props.positionY
        }
        
        return {
            type: <GameObjectType> type,
            props: props,
            model,
            collider,
            position: toStrVector(parsedItem.pos),
            tags: tags || [],
            texture,
            rotate,
            id: undefined
        };
    }
}