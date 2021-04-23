import { Mesh, MeshBuilder, Vector3 } from "babylonjs";
import { WorldProvider } from "../services/WorldProvider";
import { MaterialStore } from "../stores/MaterialStore";


export class PathVisualizer {

    private worldProvider: WorldProvider;
    private materialStore: MaterialStore;

    constructor(worldProvider: WorldProvider, materialStore: MaterialStore) {
        this.worldProvider = worldProvider;
        this.materialStore = materialStore;
    }

    visualize(path: Vector3[], ribbon?: Mesh): Mesh {
        const pathes = this.createRibbonPathes(path);
        const updatedRibbon = MeshBuilder.CreateRibbon("ribbon", {pathArray: pathes, updatable: true, instance: ribbon}, this.worldProvider.world.scene);

        if (!ribbon) {
            updatedRibbon.material = this.materialStore.getRibbonMaterial();
        }

        return updatedRibbon;
    }

    private createRibbonPathes(path: Vector3[]) {
        const angle = this.getAngle(path);
        const angelPlus = angle + Math.PI / 2;
        const angelMinus = angle - Math.PI / 2;
        const radius = 0.2;
        
        const path1 = [
            path[0].add(new Vector3(radius * Math.cos(angelPlus), 0.5, radius * Math.sin(angelPlus))),
            path[1].add(new Vector3(radius * Math.cos(angelPlus), 0.5, radius * Math.sin(angelPlus))),
        ];

        const path2 = [
            path[0].add(new Vector3(radius * Math.cos(angelMinus), 0.5, radius * Math.sin(angelMinus))),
            path[1].add(new Vector3(radius * Math.cos(angelMinus), 0.5, radius * Math.sin(angelMinus))),
        ];

        return [path1, path2];
    }

    private getAngle(path: Vector3[]) {
        const vector = path[1].subtract(path[0]);
        return Math.atan2(vector.z, vector.x);
    }
}