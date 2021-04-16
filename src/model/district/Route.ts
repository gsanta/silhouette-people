import { Vector2 } from "babylonjs";
import { Lookup } from "../../services/Lookup";
import { MeshObj } from "../general/objs/MeshObj";

export class Route {
    path: Vector2[];
    private fromPoint: Vector2;
    private toPoint: Vector2;
    private prevPos: Vector2;
    private currPos: Vector2;
    isFinished = false;

    private meshObj: MeshObj;
    private world: Lookup;

    constructor(gameObject: MeshObj, path: Vector2[]) {
        this.meshObj = gameObject;
        this.path = path;

        if (this.path.length < 2) {
            throw new Error('A path needs to contain at least two vectors');
        }
        
        this.fromPoint = gameObject.getPosition2D();
        this.toPoint = this.path[1];
    }

    update() {
        if (this.isFinished) { return; }

        this.checkDestReached();
        
        if (!this.isFinished) { this.moveGameObject(); }
    }

    private moveGameObject() {
        const dirVector = this.toPoint.subtract(this.fromPoint);
        const dirAngle = Math.atan2(dirVector.y, dirVector.x);

        this.meshObj.setRotation(Math.PI / 2 - dirAngle);
        this.meshObj.move(0.04);

        this.prevPos = this.currPos;
        this.currPos = this.meshObj.getPosition2D();
    }

    private checkDestReached() {
        if (!this.isDestReached(this.meshObj)) { return; }

        if (this.toPoint === this.path[this.path.length - 1]) {
            this.isFinished = true;
        } else {
            this.fromPoint = this.meshObj.getPosition2D();
            this.toPoint = this.path[this.path.indexOf(this.toPoint) + 1];
        }
    }

    private isDestReached(gameObject: MeshObj) {
        if (!this.toPoint) { return true; }

        const curr = gameObject.colliderMesh.getAbsolutePosition();

        const isWithinDestRadius = this.toPoint.subtract(new Vector2(curr.x, curr.z)).length() < 0.2;
        const isLeavingDest = this.prevPos && this.prevPos.subtract(this.toPoint).length() < this.currPos.subtract(this.toPoint).length();

        return isWithinDestRadius || isLeavingDest;
    }
}