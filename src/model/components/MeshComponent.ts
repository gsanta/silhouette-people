import { Mesh, Vector2 } from "babylonjs";
import { Vector3 } from "babylonjs/Maths/math.vector";
import { MeshObj, MeshObjTag } from "../objs/MeshObj";


export class MeshComponent {
    private gameObj: MeshObj;

    constructor(gameObj: MeshObj) {
        this.gameObj = gameObj;
    }

    distance(gameObj: MeshObj): number {
        return Vector2.Distance(this.gameObj.getPosition2D(), gameObj.getPosition2D());
    }

    getDimensions(): Vector3 {
        const mesh = this.gameObj.getMesh();
        return mesh.getBoundingInfo().boundingBox.extendSizeWorld;
    }

    getPositionRelativeToDistrict() {
        const districtPos = this.gameObj.worldObj.basicComp.platform.getAbsolutePosition();
        const gameObjPos = this.gameObj.getPosition();

        return gameObjPos.subtract(districtPos);
    }

    getRotation(): Vector3 {
        return this.gameObj.getMesh().rotationQuaternion.toEulerAngles();
    }

    setPosition(pos: Vector3) {
        this.gameObj.getMesh().setAbsolutePosition(pos);
    }

    addMeshes(meshes: Mesh[], mainMesh: Mesh) {
        this.gameObj.mainMesh = mainMesh;
        this.gameObj.allMeshes = meshes;
    }
}