import { Mesh, Vector2 } from "babylonjs";
import { Vector3 } from "babylonjs/Maths/math.vector";
import { GameObj, GameObjTag } from "../../model/objs/GameObj";


export class MeshComponent {
    private gameObj: GameObj;

    constructor(gameObj: GameObj) {
        this.gameObj = gameObj;
    }

    distance(gameObj: GameObj): number {
        return Vector2.Distance(this.gameObj.getPosition2D(), gameObj.getPosition2D());
    }

    getDimensions(): Vector3 {
        const mesh = this.gameObj.getMesh();
        return mesh.getBoundingInfo().boundingBox.extendSizeWorld;
    }

    addMeshes(meshes: Mesh[], mainMesh: Mesh) {
        this.gameObj.mainMesh = mainMesh;
        this.gameObj.allMeshes = meshes;
    }
}