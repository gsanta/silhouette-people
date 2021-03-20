import { Axis, Quaternion, Vector2 } from "babylonjs";
import { GameObject } from "../game_object/GameObject";
import { World } from "../World";

export class Route {
    path: Vector2[];
    private fromPoint: Vector2;
    private toPoint: Vector2;
    private prevPos: Vector2;
    private currPos: Vector2;
    isFinished = false;

    private gameObject: GameObject;
    private world: World;

    constructor(gameObject: GameObject, world: World) {
        this.gameObject = gameObject;
        this.world = world;
    }

    update() {
        if (this.isFinished) { return; }
        if (!this.path) { this.initPath(); }

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

    private isDestReached(gameObject: GameObject) {
        if (!this.toPoint) { return true; }

        const curr = gameObject.colliderMesh.getAbsolutePosition();

        const isWithinDestRadius = this.toPoint.subtract(new Vector2(curr.x, curr.z)).length() < 0.2;
        const isLeavingDest = this.prevPos && this.prevPos.subtract(this.toPoint).length() < this.currPos.subtract(this.toPoint).length();

        return isWithinDestRadius || isLeavingDest;
    }

    private initPath() {
        const areaMap = this.world.ai.areaMap;
        const pos = this.gameObject.getPosition2D();
        const maxIndex = areaMap.len();

        let randomIndex = Math.floor(Math.random() * maxIndex);

        while (areaMap.getNum(randomIndex) === 1) {
            randomIndex++;
            if (randomIndex >= maxIndex) {
                randomIndex = 0;
            }
        }

        const worldPos = areaMap.getWorldCoordinate(randomIndex);
        
        this.path = this.world.ai.pathFinder.findPath(pos, worldPos, this.world.ai.areaMap);
        this.fromPoint = pos;
        this.toPoint = this.path[1];
    }
}