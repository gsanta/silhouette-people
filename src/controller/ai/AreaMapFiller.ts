import { Mesh } from "babylonjs/Meshes/index";
import { AreaMap } from "./AreaMap";


export class AreaMapFiller {
    fill(areaMap: AreaMap, meshes: Mesh[]) {
        meshes.forEach(mesh => {
            mesh.computeWorldMatrix();
            const minimum = mesh.getBoundingInfo().boundingBox.minimumWorld;
            const maximum = mesh.getBoundingInfo().boundingBox.maximumWorld;
    
            areaMap.fillRect(minimum, maximum, 1);
        });
    }
}