import { InjectProperty } from "../../di/diDecorators";
import { EventService } from "../base/EventService";
import { lookup } from "../Lookup";
import { RouteFactory } from "../object/route/RouteFactory";
import { RouteMapParser } from "../object/route/RouteMapParser";
import { WorldMapParser } from "../object/world/WorldMapParser";
import { RoutePool } from "./RoutePool";


export class CitizenSetup {

    private readonly routePool: RoutePool;
    private readonly worldMapParser: WorldMapParser;

    constructor(worldMapParser: WorldMapParser) {
        this.routePool = new RoutePool();
        this.worldMapParser = worldMapParser;
    }

    setup() {
        const { routeParser } = this.worldMapParser;

        routeParser.getRoutes().forEach(route => this.routePool.addRoute(route));
    }
}