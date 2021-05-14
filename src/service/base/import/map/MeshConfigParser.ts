import { MeshConfig, MeshObjType } from "../../../../model/item/mesh/MeshItem";
import { toStrVector } from "../AbstractPropertyParser";
import { IndexPosition } from "./parse/ItemParser";
import { MapParser, ParsedItem } from "./parse/MapParser";
import { WorldMap } from "./WorldMap";

export class MeshConfigParser {
    private mapParser: MapParser;

    constructor(mapParser: MapParser) {
        this.mapParser = mapParser;
    }

    parse(json: WorldMap): MeshConfig[] {
        const mapResult = this.mapParser.parse(json.map, new Set([IndexPosition.RIGHT]));

        return mapResult.items.map(item => this.createMeshConfig(item, json));
    }

    private createMeshConfig(parsedItem: ParsedItem, worldJson: WorldMap): MeshConfig {
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