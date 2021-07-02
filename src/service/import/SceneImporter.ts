import { RouteParser } from "./RouteParser";
import { MeshConfigParser } from "./MeshConfigParser";
import { WorldMap } from "./WorldMap";
import { SceneService } from "../SceneService";
import { SceneParser } from "./map/SceneParser";
import { IndexPosition } from "./map/ItemParser";
import { WorldFactory } from "../object/WorldFactory";
import { SceneJson } from "../editor/export/SceneExporter";
import { RouteImporter } from "./RouteImporter";
import { GameObjectImporter } from "./GameObjectImporter";

export class SceneImporter {
    readonly routeParser: RouteParser;
    readonly meshConfigParser: MeshConfigParser;
    
    private readonly mapParser: SceneParser;

    private readonly assetsPath = 'assets/levels';
    private readonly sceneService: SceneService;
    private readonly worldFactory: WorldFactory;
    private readonly routeImporter: RouteImporter;
    private readonly gameObjectImporter: GameObjectImporter;

    constructor(worldProvider: SceneService, worldFactory: WorldFactory, gameObjectImporter: GameObjectImporter, routeImporter: RouteImporter) {
        this.sceneService = worldProvider;
        this.worldFactory = worldFactory;
        this.gameObjectImporter = gameObjectImporter;
        this.routeImporter = routeImporter;
        this.mapParser = new SceneParser();
        this.routeParser = new RouteParser();
        this.meshConfigParser = new MeshConfigParser(this.mapParser);
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

        this.sceneService.world = await this.worldFactory.createWorldObj(this.sceneService.scene);

        this.routeImporter.import(sceneJson.routes);
        await this.gameObjectImporter.import(sceneJson.gameObjects, json);
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