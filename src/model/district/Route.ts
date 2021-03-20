import { Axis, Quaternion, Vector2 } from "babylonjs";
import { GameObj } from "../objs/GameObj";
import { World } from "../World";

export class Route {
    path: Vector2[];
    private fromPoint: Vector2;
    private toPoint: Vector2;
    private prevPos: Vector2;
    private currPos: Vector2;
    isFinished = false;

    private gameObject: GameObj;
    private world: World;

    constructor(gameObject: GameObj, path: Vector2[]) {
        this.gameObject = gameObject;
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

        this.gameObject.setRotation(Math.PI / 2 - dirAngle);
        this.gameObject.move(0.04);

        this.prevPos = this.currPos;
        this.currPos = this.gameObject.getPosition2D();
    }

    private checkDestReached() {
        if (!this.isDestReached(this.gameObject)) { return; }

        if (this.toPoint === this.path[this.path.length - 1]) {
            this.isFinished = true;
        } else {
            this.fromPoint = this.gameObject.getPosition2D();
            this.toPoint = this.path[this.path.indexOf(this.toPoint) + 1];
        }
    }

    private isDestReached(gameObject: GameObj) {
        if (!this.toPoint) { return true; }

        const curr = gameObject.colliderMesh.getAbsolutePosition();

        const isWithinDestRadius = this.toPoint.subtract(new Vector2(curr.x, curr.z)).length() < 0.2;
        const isLeavingDest = this.prevPos && this.prevPos.subtract(this.toPoint).length() < this.currPos.subtract(this.toPoint).length();

        return isWithinDestRadius || isLeavingDest;
    }
}