import { World } from "../../model/World";
import { LevelJson } from "../import/ImportService";


export class LevelService {
    private world: World;
    private onLevelLoadedFuncs: (() => void)[] = [];
    private isLoaded = false;

    constructor(world: World) {
        this.world = world;
    }

    async loadLevel(json: LevelJson) {
        await this.world.import.import(json);
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

    private fillAreaMap() {
        const colliderMeshes = this.world.store.getAll()
            .filter(go => go.colliderMesh)
            .map(go => go.colliderMesh);

        this.world.ai.areaMap.fillMeshes(colliderMeshes);
    }
}