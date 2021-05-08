import { Mesh, MeshBuilder, StandardMaterial, Vector3 } from "babylonjs";
import { PathItem } from "../../../model/item/PathItem";
import { WorldProvider } from "../../object/world/WorldProvider";
import { MaterialStore } from "../../../store/MaterialStore";


export class PathVisualizer {

    private worldProvider: WorldProvider;
    private materialStore: MaterialStore;

    constructor(worldProvider: WorldProvider, materialStore: MaterialStore) {
        this.worldProvider = worldProvider;
        this.materialStore = materialStore;
    }

    visualize(path: PathItem): void {
        this.visualizeArrowHead(path);
        this.visualizeArrow(path);
    }

    private visualizeArrowHead(path: PathItem) {
            const pathes = this.createArrowHeadPathes(path);

            const arrowHead = path.getArrowHead();
            const updatedArrowHead = MeshBuilder.CreateRibbon("arrow-head", {pathArray: pathes, updatable: true, instance: arrowHead}, this.worldProvider.scene);

            if (!arrowHead) {
                updatedArrowHead.material = new StandardMaterial('abcd', this.worldProvider.scene);
                updatedArrowHead.material.wireframe = true;
                path.addArrowHead(updatedArrowHead);
            }
    }

    private createArrowHeadPathes(path: PathItem) {
        const angle = this.getAngle(path.getStartPoint(), path.getEndPoint());
        const angelPlus = angle + Math.PI / 2;
        const angelMinus = angle - Math.PI / 2;
        const radius = 0.4;
        const end = path.getEndPoint();

        const path1 = [
            end.add(new Vector3(radius * Math.cos(angelPlus), 0.5, radius * Math.sin(angelPlus))),
            end.add(new Vector3(radius * Math.cos(angelMinus), 0.5, radius * Math.sin(angelMinus))),
        ];

        const path2 = [
            end.add(new Vector3(radius * Math.cos(angle), 0.5, radius * Math.sin(angle))),
            end.add(new Vector3(radius * Math.cos(angle), 0.5, radius * Math.sin(angle))),
        ];

        return [path1, path2];
    }

    private visualizeArrow(path: PathItem) {
        const pathes = this.createRibbonPathes(path);
        const ribbon = path.getMesh();
        const updatedRibbon = MeshBuilder.CreateRibbon("ribbon", {pathArray: pathes, updatable: true, instance: ribbon}, this.worldProvider.scene);

        if (!ribbon) {
            updatedRibbon.material = this.materialStore.getRibbonMaterial();
            path.addMesh(updatedRibbon);
        }
    }

    private createRibbonPathes(path: PathItem) {
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