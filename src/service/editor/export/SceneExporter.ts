import { Tools } from 'babylonjs';
import { GameObjectConfig, GameObjectTag } from '../../../model/objects/game_object/GameObject';
import { RouteJson } from '../../../model/objects/route/RouteItem';
import { GameObjectStore } from '../../../store/GameObjectStore';
import { toStrVector } from '../../import/AbstractPropertyParser';
import { RouteMapJson } from '../../import/RouteMapImporter';
import { GameObjectExporter } from './GameObjectExporter';
import { RouteExporter } from './RouteExporter';
import { RouteMapExporter } from './RouteMapExporter';

export interface SceneJson {

    gameObjects: GameObjectConfig[];
    routeMap: RouteMapJson;
    routes: RouteJson[];
}

export class SceneExporter {

    private readonly gameObjectExporter: GameObjectExporter;
    private readonly routeMapExporter: RouteMapExporter;
    private readonly routeExporter: RouteExporter;

    constructor(gameObjectExporter: GameObjectExporter, routeMapExporter: RouteMapExporter, routeExporter: RouteExporter) {
        this.gameObjectExporter = gameObjectExporter;

        this.routeMapExporter = routeMapExporter;
        this.routeExporter = routeExporter;
    }

    async export(): Promise<void> {
        const gameObjects = this.gameObjectExporter.export();
        const routeMap = this.routeMapExporter.export();
        const routes = this.routeExporter.export();

        const json: SceneJson = { gameObjects, routeMap, routes }

        console.log(JSON.stringify(json, null, 2))
    }
}