import { Tools } from 'babylonjs';
import { GameObjectConfig, GameObjectTag } from '../../../model/objects/game_object/GameObject';
import { GameObjectStore } from '../../../store/GameObjectStore';
import { GraphService } from '../../graph/GraphService';
import { toStrVector } from '../../import/AbstractPropertyParser';
import { RouteJson } from '../../import/RouteImporter';
import { RouteExporter } from './RouteExporter';

export interface SceneJson {

    gameObjects: GameObjectConfig[];
    routes: RouteJson;
}

export class SceneExporter {

    private readonly gameObjectStore: GameObjectStore;
    private readonly graphService: GraphService;
    private readonly routeExporter: RouteExporter;

    constructor(gameObjectStore: GameObjectStore, graphService: GraphService) {
        this.gameObjectStore = gameObjectStore;
        this.graphService = graphService;

        this.routeExporter = new RouteExporter(graphService);
    }

    async export(): Promise<void> {

        const gameObjects = this.gameObjectStore.getByTag(GameObjectTag._UI_CREATED);
        const gameObjectJsons = gameObjects.map(gameObject => gameObject.config);
        gameObjects.forEach(gameObject => gameObject.config.position = toStrVector(gameObject.mainMesh.getAbsolutePosition()))
        gameObjects.forEach(gameObject => gameObject.config.rotate = Tools.ToDegrees(gameObject.rotationY));

        const routeJson = this.routeExporter.export();

        const json: SceneJson = {
            gameObjects: gameObjectJsons,
            routes: routeJson
        }

        console.log(JSON.stringify(json, null, 2))
    }

    private exportRoutes() {

    }
}