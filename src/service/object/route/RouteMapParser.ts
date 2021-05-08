import { Vector3 } from "babylonjs";
import { PathItem } from "../../../model/item/PathItem";
import { RouteItem } from "../../../model/item/route/RouteItem";
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
    
    private routes: RouteItem[] = [];

    constructor(routeFactory: RouteFactory) {
        this.routeFactory = routeFactory;
        this.mapParser = new MapParser();
    }

    getRoutes(): RouteItem[] {
        return this.routes;
    }
    
    parse(json: WorldMap, map: string): void {
        const mapResult = this.mapParser.parse(json, map);
        const parsedRoutes = this.parseRoutes(mapResult.items);
        this.routes = this.createRoutes(parsedRoutes);
    }

    private createRoutes(parsedRoutes: ParsedRoute[]): RouteItem[] {
        return parsedRoutes.map(parsedRoute => {
            const path = this.createPath(parsedRoute)
            
            return this.routeFactory.createRoute([path], { lockDirection: true, lockSpeed: true });
        });
    }

    private createPath(parsedRoute: ParsedRoute): PathItem {
        const positions = parsedRoute.positions.map(position => position.pos);

        return new PathItem(positions);
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