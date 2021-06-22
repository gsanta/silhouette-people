import { GameObjectConfig, GameObjectType } from "../../model/objects/game_object/GameObject";
import { toStrVector } from "./AbstractPropertyParser";
import { IndexPosition } from "./map/ItemParser";
import { MapParser, ParsedItem } from "./map/MapParser";
import { WorldMap } from "./WorldMap";

export class MeshConfigParser {
    private mapParser: MapParser;

    constructor(mapParser: MapParser) {
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
        
        if (props.positionY) {
            parsedItem.pos.y = props.positionY
        }
        
        props.position = toStrVector(parsedItem.pos);

        return {
            type: <GameObjectType> type,
            ch: parsedItem.str,
            props: props
        };
    }
}