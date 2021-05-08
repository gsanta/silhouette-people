import { MeshConfig, MeshObjType } from "../../../model/object/mesh/MeshObj";
import { toStrVector } from "../../base/import/AbstractPropertyParser";
import { MapParser, ParsedItem } from "./MapParser";
import { WorldMap } from "./WorldMap";

export class MeshConfigParser {
    private mapParser: MapParser;

    constructor(mapParser: MapParser) {
        this.mapParser = mapParser;
    }

    parse(json: WorldMap, map: string): MeshConfig[] {
        const mapResult = this.mapParser.parse(json, map);

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