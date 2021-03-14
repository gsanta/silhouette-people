import { Axis, MeshBuilder, Space, Vector2 } from "babylonjs";
import { GameObject } from "../game_object/GameObject";
import { World } from "../World";

export class Route {
    path: Vector2[];
    private fromPoint: Vector2;
    private toPoint: Vector2;
    private prevPos: Vector2;
    private currPos: Vector2;
    private isFinished = false;

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
        const mesh = this.gameObject.colliderMesh ? this.gameObject.colliderMesh : this.gameObject.mesh;

        const dirVector = this.toPoint.subtract(this.fromPoint);
        const dirAngle = Math.atan2(dirVector.y, dirVector.x);
        
        mesh.rotation.y = Math.PI / 2 - dirAngle;
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
        const curr = gameObject.colliderMesh.getAbsolutePosition();

        const isWithinDestRadius = this.toPoint.subtract(new Vector2(curr.x, curr.z)).length() < 0.2;
        const isLeavingDest = this.prevPos && this.prevPos.subtract(this.toPoint).length() < this.currPos.subtract(this.toPoint).length();

        return isWithinDestRadius || isLeavingDest;
    }

    private initPath() {
        const pos = this.gameObject.get2dPos();
        
        this.path = this.world.ai.pathFinder.findPath(pos, new Vector2(pos.x + 40, pos.y - 5), this.world.ai.areaMap);
        // this.path = world.ai.pathFinder.findPath(new Vector2(pos.x, pos.z), new Vector2(8, -5));
        this.fromPoint = pos;
        this.toPoint = this.path[1];

        const destMesh = MeshBuilder.CreateBox('destination', { size: 1 }, this.world.scene);
        destMesh.translate(Axis.X, this.toPoint.x, Space.WORLD);
        destMesh.translate(Axis.Z, this.toPoint.y, Space.WORLD);
    }
}