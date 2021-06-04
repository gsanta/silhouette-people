import { RouteStore } from "../../../store/RouteStore";
import { StoryTracker } from "../../story/StoryTracker";
import { RouteFactory } from "../../routing/route/RouteFactory";
import { RouteParser } from "./map/RouteParser";
import { MeshConfigParser } from "./map/MeshConfigParser";
import { RouteStoryParser } from "./map/RouteStoryParser";
import { WorldMap } from "./map/WorldMap";
import { WorldProvider } from "../../WorldProvider";
import { MapParser } from "./map/parse/MapParser";
import { IndexPosition } from "./map/parse/ItemParser";
import { GraphParser } from "./map/parse/GraphParser";

export class WorldImporter {
    private readonly routeStore: RouteStore;

    readonly routeParser: RouteParser;
    readonly meshConfigParser: MeshConfigParser;
    readonly routeStoryParser: RouteStoryParser;
    
    private readonly mapParser: MapParser;
    private readonly storyTracker: StoryTracker;

    private readonly assetsPath = 'assets/levels';
    private readonly worldProvider: WorldProvider;

    constructor(worldProvider: WorldProvider, routeFactory: RouteFactory, routeStore: RouteStore, storyTracker: StoryTracker) {
        this.worldProvider = worldProvider;
        this.storyTracker = storyTracker;
        this.routeStore = routeStore;
        this.mapParser = new MapParser();
        this.routeParser = new RouteParser();
        this.meshConfigParser = new MeshConfigParser(this.mapParser);
        this.routeStoryParser = new RouteStoryParser(storyTracker);
    }

    async parse() {
        const levelName = 'level-1';

        const json = await this.loadWorldJson(levelName);
        const map = await this.loadWorldMap(`${levelName}-map-1.txt`);
        const routeMap = await this.loadWorldMap(`${levelName}-routes.txt`);

        json.map = map;
        json.routeMap = routeMap;

        const mapResult = this.mapParser.parse(map, new Set([IndexPosition.RIGHT]));

        this.worldProvider.worldMap = json;
        this.worldProvider.worldSize = mapResult.size;
        this.worldProvider.quarterNum = mapResult.quarterNum;

        const routeConfigs = this.routeParser.parse(json);
        new GraphParser().parse(json);
        // routes.forEach(route => this.routeStore.addRoute(route));

        const meshConfigs = this.meshConfigParser.parse(json);
        meshConfigs.forEach(meshConfig => this.storyTracker.producer.createMeshStory(meshConfig));
        this.routeStoryParser.parse(json);
    }

    private async loadWorldJson(name: string): Promise<WorldMap> {
        return await fetch(`${this.assetsPath}/${name}.json`).then(res => res.json());
    }

    private async loadWorldMap(name: string): Promise<string> {
        return await fetch(`${this.assetsPath}/${name}`).then(res => res.text());
    }
}