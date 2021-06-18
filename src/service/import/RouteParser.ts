import { Vector3 } from "babylonjs";
import { PathItem } from "../../model/objects/PathItem";
import { RouteItem } from "../../model/objects/route/RouteItem";
import { IndexPosition } from "./map/ItemParser";
import { MapParser, ParsedItem } from "./map/MapParser";
import { WorldMap } from "./WorldMap";

export interface RouteConfig {
    char: string;
    positions: {
        index: number;
        pos: Vector3
    }[];
}

export class RouteParser {
    private readonly mapParser: MapParser;
    private readonly charRegexp = /(?<char>[^\d]+)(?<num>\d+)/;

    constructor() {
        this.mapParser = new MapParser(['#']);
    }
    
    parse(json: WorldMap): RouteConfig[] {
        const indexPositions = [IndexPosition.LEFT, IndexPosition.RIGHT, IndexPosition.TOP, IndexPosition.BOTTOM];
        const mapResult = this.mapParser.parse(json.routeMap, new Set(indexPositions));
        const routeConfigs = this.parseRoutes(mapResult.items);
        return routeConfigs;
        // return this.createRoutes(parsedRoutes);
    }

    private parseRoutes(items: ParsedItem[]): RouteConfig[] {
        const map: Map<string, RouteConfig> = new Map();

        items.forEach(item => {
            const {char, num} = item.str.match(this.charRegexp).groups;

            if (!map.has(char)) {
                map.set(char, { char, positions: [] });
            }

            map.get(char).positions.push({
                index: parseInt(num, 10),
                pos: item.pos
            });
        });

        const routes = Array.from(map.values());

        routes.forEach(route => route.positions.sort(this.sortRoutePositions));

        return routes;
    }

    private sortRoutePositions(pos1: {index: number}, pos2: {index: number}) {
        return pos1.index - pos2.index;
    }
}