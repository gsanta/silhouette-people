import { RouteFactory } from "../route/RouteFactory";
import { RouteMapParser } from "../route/RouteMapParser";
import { ItemMapParser } from "./ItemMapParser";
import { WorldMap } from "./WorldMap";
import { WorldProvider } from "./WorldProvider";

export class WorldMapParser {
    readonly routeParser: RouteMapParser;
    readonly itemParser: ItemMapParser;
    
    private readonly assetsPath = 'assets/levels';
    private readonly worldProvider: WorldProvider;

    constructor(worldProvider: WorldProvider, routeFactory: RouteFactory) {
        this.worldProvider = worldProvider;
        this.routeParser = new RouteMapParser(routeFactory);
        this.itemParser = new ItemMapParser();
    }

    async parse() {
        const levelName = 'level-1';

        const json = await this.loadWorldJson(levelName);
        const map = await this.loadWorldMap(`${levelName}-map-1.txt`);
        const routeMap = await this.loadWorldMap(`${levelName}-routes.txt`);
        json.map = map;
        json.routeMap = routeMap;

        this.worldProvider.worldMap = json;
        this.routeParser.parse(json);
        this.itemParser.parse(json);
    }
    
    private async loadWorldJson(name: string): Promise<WorldMap> {
        return await fetch(`${this.assetsPath}/${name}.json`).then(res => res.json());
    }

    private async loadWorldMap(name: string): Promise<string> {
        return await fetch(`${this.assetsPath}/${name}`).then(res => res.text());
    }
}