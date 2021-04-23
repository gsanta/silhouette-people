import { Mesh, MeshBuilder, Vector3 } from "babylonjs";
import { Path } from "../model/general/objs/Path";
import { WorldProvider } from "../services/WorldProvider";
import { MaterialStore } from "../stores/MaterialStore";


export class PathVisualizer {

    private worldProvider: WorldProvider;
    private materialStore: MaterialStore;

    constructor(worldProvider: WorldProvider, materialStore: MaterialStore) {
        this.worldProvider = worldProvider;
        this.materialStore = materialStore;
    }

    visualize(path: Path, ribbon?: Mesh): Mesh {
        const pathes = this.createRibbonPathes(path);
        const updatedRibbon = MeshBuilder.CreateRibbon("ribbon", {pathArray: pathes, updatable: true, instance: ribbon}, this.worldProvider.world.scene);

        if (!ribbon) {
            updatedRibbon.material = this.materialStore.getRibbonMaterial();
        }

        return updatedRibbon;
    }

    private createRibbonPathes(path: Path) {
        const angle = this.getAngle(path.getStartPoint(), path.getEndPoint());
        const angelPlus = angle + Math.PI / 2;
        const angelMinus = angle - Math.PI / 2;
        const radius = 0.2;
        
        const [start, end] = [path.getStartPoint(), path.getEndPoint()];

        const path1 = [
            start.add(new Vector3(radius * Math.cos(angelPlus), 0.5, radius * Math.sin(angelPlus))),
            end.add(new Vector3(radius * Math.cos(angelPlus), 0.5, radius * Math.sin(angelPlus))),
        ];

        const path2 = [
            start.add(new Vector3(radius * Math.cos(angelMinus), 0.5, radius * Math.sin(angelMinus))),
            end.add(new Vector3(radius * Math.cos(angelMinus), 0.5, radius * Math.sin(angelMinus))),
        ];

        return [path1, path2];
    }

    private getAngle(startPoint: Vector3, endPoint) {
        const vector = endPoint.subtract(startPoint);
        return Math.atan2(vector.z, vector.x);
    }
}