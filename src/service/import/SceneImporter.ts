import { StoryTracker } from "../story/StoryTracker";
import { RouteParser } from "./RouteParser";
import { MeshConfigParser } from "./MeshConfigParser";
import { RouteStoryParser } from "./RouteStoryParser";
import { WorldMap } from "./WorldMap";
import { SceneService } from "../SceneService";
import { SceneParser } from "./map/SceneParser";
import { IndexPosition } from "./map/ItemParser";
import { GraphParser } from "./map/GraphParser";
import { MeshFactory } from "../object/mesh/MeshFactory";
import { WorldFactory } from "../object/WorldFactory";
import { GameObjectStore } from "../../store/GameObjectStore";
import { SceneJson } from "../editor/export/SceneExporter";

export class SceneImporter {
    readonly routeParser: RouteParser;
    readonly meshConfigParser: MeshConfigParser;
    readonly routeStoryParser: RouteStoryParser;
    
    private readonly mapParser: SceneParser;

    private readonly assetsPath = 'assets/levels';
    private readonly sceneService: SceneService;
    private readonly meshFactory: MeshFactory;
    private readonly worldFactory: WorldFactory;
    private readonly gameObjectStore: GameObjectStore;

    constructor(worldProvider: SceneService, storyTracker: StoryTracker, meshFactory: MeshFactory, worldFactory: WorldFactory, gameObjectStore: GameObjectStore) {
        this.sceneService = worldProvider;
        this.meshFactory = meshFactory;
        this.worldFactory = worldFactory;
        this.gameObjectStore = gameObjectStore;
        this.mapParser = new SceneParser();
        this.routeParser = new RouteParser();
        this.meshConfigParser = new MeshConfigParser(this.mapParser);
        this.routeStoryParser = new RouteStoryParser(storyTracker);
    }

    async parse() {
        const levelName = 'level-1';

        const json = await this.loadJson(levelName);
        const sceneJson = await this.loadScene(`${levelName}-scene`);
        const map = await this.loadWorldMap(`${levelName}-map-1.txt`);
        const routeMap = await this.loadWorldMap(`${levelName}-routes.txt`);

        json.map = map;
        json.routeMap = routeMap;

        const mapResult = this.mapParser.parse(map, new Set([IndexPosition.RIGHT]));

        this.sceneService.worldMap = json;
        this.sceneService.worldSize = mapResult.size;
        this.sceneService.quarterNum = mapResult.quarterNum;

        new GraphParser().parse(json);

        let meshConfigs = this.meshConfigParser.parse(json);
        meshConfigs = [...meshConfigs, ...sceneJson.gameObjects];

        this.sceneService.world = await this.worldFactory.createWorldObj(this.sceneService.scene);

        for (const config of meshConfigs) {
            const gameObject = await this.meshFactory.createFromConfig(config);
            this.gameObjectStore.addItem(gameObject);
        }
        this.routeStoryParser.parse(json);
    }

    private async loadScene(name: string): Promise<SceneJson> {
        return await fetch(`${this.assetsPath}/${name}.json`).then(res => res.json());
    }

    private async loadJson(name: string): Promise<WorldMap> {
        return await fetch(`${this.assetsPath}/${name}.json`).then(res => res.json());
    }

    private async loadWorldMap(name: string): Promise<string> {
        return await fetch(`${this.assetsPath}/${name}`).then(res => res.text());
    }
}