import { Axis, Quaternion, Space, Vector2 } from "babylonjs";
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

    createRandomDest() {
        this.isFinished = false;
        this.initPath();
    }

    private moveGameObject() {
        const mesh = this.gameObject.colliderMesh ? this.gameObject.colliderMesh : this.gameObject.mesh;

        const dirVector = this.toPoint.subtract(this.fromPoint);
        const dirAngle = Math.atan2(dirVector.y, dirVector.x);

        mesh.rotationQuaternion = Quaternion.RotationAxis(Axis.Y, Math.PI / 2 - dirAngle);
        // mesh.rotation.y = Math.PI / 2 - dirAngle;
        
        // mesh.rotation.y = dirAngle//  Math.PI / 2 - dirAngle;
        // console.log()
        // const rotation = dirAngle - this.gameObject.colliderMesh.rotation.y;
        // this.gameObject.colliderMesh.rotate(Axis.Y, rotation, Space.WORLD);
        // // this.gameObject.mesh.rotation.y = -Math.PI / 2;
        // this.gameObject.colliderMesh.rotation.y = Math.PI
        this.gameObject.move(0.04);

        const meshPos = mesh.getAbsolutePosition();
        this.prevPos = this.currPos;
        this.currPos = new Vector2(meshPos.x, meshPos.z);
    }

    private checkDestReached() {
        if (!this.isDestReached(this.gameObject)) { return; }

        if (this.toPoint === this.path[this.path.length - 1]) {
            this.isFinished = true;
        } else {
            this.fromPoint = this.gameObject.get2dPos();
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
        const pos = this.gameObject.get2dPos();
        const maxIndex = areaMap.len();

        let randomIndex = Math.floor(Math.random() * maxIndex);

        while (areaMap.getNum(randomIndex) === 1) {
            randomIndex++;
            if (randomIndex >= maxIndex) {
                randomIndex = 0;
            }
        }

        // const gridPos = areaMap.getGridCoordinate(randomIndex);
        const worldPos = areaMap.getWorldCoordinate(randomIndex);
        
        this.path = this.world.ai.pathFinder.findPath(pos, worldPos, this.world.ai.areaMap);
        this.fromPoint = pos;
        this.toPoint = this.path[1];
    }
}