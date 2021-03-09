import { Mesh } from "babylonjs/Meshes/index";
import { AreaMap } from "./AreaMap";


export class AreaMapFiller {
    fill(areaMap: AreaMap, meshes: Mesh[]) {
        meshes.forEach(mesh => {
            const minimum = mesh.getBoundingInfo().boundingBox.minimumWorld;
            const maximum = mesh.getBoundingInfo().boundingBox.maximumWorld;
    
            areaMap.blockRect(minimum, maximum);
        });
    }


    // private fillWithMesh(areaMap: AreaMap, mesh: Mesh) {
    //     const minimum = mesh.getBoundingInfo().boundingBox.minimum;
    //     const maximum = mesh.getBoundingInfo().boundingBox.maximum;

    //     minimum.x
    // }
}