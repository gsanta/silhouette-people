import { RouteStore } from "../../../store/RouteStore";
import { Backlog } from "../../story/Backlog";
import { RouteFactory } from "../route/RouteFactory";
import { RouteMapParser } from "../route/RouteMapParser";
import { MapParser } from "./MapParser";
import { MeshConfigParser } from "./MeshConfigParser";
import { WorldMap } from "./WorldMap";
import { WorldProvider } from "./WorldProvider";

export class WorldMapParser {
    private readonly routeStore: RouteStore;

    readonly routeParser: RouteMapParser;
    readonly meshConfigParser: MeshConfigParser;
    
    private readonly mapParser: MapParser;
    private readonly backlog: Backlog;

    private readonly assetsPath = 'assets/levels';
    private readonly worldProvider: WorldProvider;

    constructor(worldProvider: WorldProvider, routeFactory: RouteFactory, routeStore: RouteStore, backlog: Backlog) {
        this.worldProvider = worldProvider;
        this.backlog = backlog;
        this.routeStore = routeStore;
        this.mapParser = new MapParser();
        this.routeParser = new RouteMapParser(routeFactory);
        this.meshConfigParser = new MeshConfigParser(this.mapParser);
    }

    async parse() {
        const levelName = 'level-1';

        const json = await this.loadWorldJson(levelName);
        const map = await this.loadWorldMap(`${levelName}-map-1.txt`);
        const routeMap = await this.loadWorldMap(`${levelName}-routes.txt`);

        const mapResult = this.mapParser.parse(json, map);

        this.worldProvider.worldMap = json;
        this.worldProvider.worldSize = mapResult.size;
        this.worldProvider.quarterNum = mapResult.quarterNum;

        const routes = this.routeParser.parse(json, routeMap);
        routes.forEach(route => this.routeStore.addRoute(route));

        const meshConfigs = this.meshConfigParser.parse(json, map);
        meshConfigs.forEach(meshConfig => this.backlog.producer.createMeshStory(meshConfig));
    }

    private async loadWorldJson(name: string): Promise<WorldMap> {
        return await fetch(`${this.assetsPath}/${name}.json`).then(res => res.json());
    }

    private async loadWorldMap(name: string): Promise<string> {
        return await fetch(`${this.assetsPath}/${name}`).then(res => res.text());
    }
}