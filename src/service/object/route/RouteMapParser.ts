import { Vector3 } from "babylonjs";
import { PathObj } from "../../../model/object/PathObj";
import { RouteObj } from "../../../model/object/route/RouteObj";
import { MapParser, ParsedItem } from "../world/MapParser";
import { WorldMap } from "../world/WorldMap";
import { RouteFactory } from "./RouteFactory";

export interface ParsedRoute {
    char: string;
    positions: {
        index: number;
        pos: Vector3
    }[];
}

export class RouteMapParser {
    private readonly routeFactory: RouteFactory;
    
    private readonly mapParser: MapParser;
    private readonly charRegexp = /(?<char>[^\d]+)(?<num>\d+)/;
    
    private routes: RouteObj[] = [];

    constructor(routeFactory: RouteFactory) {
        this.routeFactory = routeFactory;
        this.mapParser = new MapParser();
    }

    getRoutes(): RouteObj[] {
        return this.routes;
    }
    
    parse(json: WorldMap): void {
        this.mapParser.parse(json, json.routeMap);
        const parsedRoutes = this.parseRoutes(this.mapParser.getParsedItems());
        this.routes = this.createRoutes(parsedRoutes);
    }

    private createRoutes(parsedRoutes: ParsedRoute[]): RouteObj[] {
        return parsedRoutes.map(parsedRoute => {
            const path = this.createPath(parsedRoute)
            
            return this.routeFactory.createRoute([path], {});
        });
    }

    private createPath(parsedRoute: ParsedRoute): PathObj {
        const positions = parsedRoute.positions.map(position => position.pos);

        return new PathObj(positions);
    }

    private parseRoutes(items: ParsedItem[]): ParsedRoute[] {
        const map: Map<string, ParsedRoute> = new Map();

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