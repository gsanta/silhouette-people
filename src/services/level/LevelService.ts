import { gameobjects } from "../../model/gameobjects";
import { GameObject } from "../../model/game_object/GameObject";
import { World } from "../../model/World";


export class LevelService {
    private world: World;
    private onLevelLoadedFuncs: (() => void)[] = [];
    private isLoaded = false;

    constructor(world: World) {
        this.world = world;
    }

    async loadLevel() {
        await this.createGameObjects();
        this.fillAreaMap();

        this.isLoaded = true;
        this.onLevelLoadedFuncs.forEach(func => func());
    }

    onLevelLoaded(onLevelLoadedFunc: () => void) {
        if (this.isLoaded) {
            onLevelLoadedFunc();
        } else {
            this.onLevelLoadedFuncs.push(onLevelLoadedFunc);
        }
    }

    private async createGameObjects() {
        const promises = gameobjects.map(gameObject => GameObject.create(gameObject, this.world));
        await Promise.all(promises); 
    }

    private fillAreaMap() {
        const colliderMeshes = this.world.store.getAll()
            .filter(go => go.colliderMesh)
            .map(go => go.colliderMesh);

        this.world.ai.areaMap.fillMeshes(colliderMeshes);
    }
}