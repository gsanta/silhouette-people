import { Axis, MeshBuilder, Space, Vector2, Vector3 } from "babylonjs";
import { AbstractCharacterState, GameObjectStateType } from "../../model/character/AbstractCharacterState";
import { GameObject } from "../../model/GameObject";
import { World } from "../../model/World";

export class SearchingEnemyState extends AbstractCharacterState {
    private world: World;
    path: Vector2[];
    private fromPoint: Vector2;
    private toPoint: Vector2;
    private prevPos: Vector2;
    private currPos: Vector2;
    private isFinished = false;

    constructor(world: World) {
        super(GameObjectStateType.EnemySearching);
        this.world = world;
    }

    updateAnimation(gameObject: GameObject) {
        gameObject.runAnimation('Walk');
    }

    updatePhysics(gameObject: GameObject, world: World) {
        if (this.isFinished) { return; }

        if (!this.path) {
            this.initPath(gameObject, world);
        }

        if (this.isDestReached(gameObject)) {
            if (this.toPoint === this.path[this.path.length - 1]) {
                this.isFinished = true;
                return;
            } else {
                this.fromPoint = gameObject.get2dPos();
                this.toPoint = this.path[this.path.indexOf(this.toPoint) + 1];
            }
        }

        const mesh = gameObject.colliderMesh ? gameObject.colliderMesh : gameObject.mesh;

        const vector = this.toPoint.subtract(this.fromPoint);
        const angle = Math.atan2(vector.y, vector.x);
        mesh.rotation.y = Math.PI / 2 - angle;

        var forward = new Vector3(0, 0, 0.04);
        var direction = gameObject.mesh.getDirection(forward);
        direction.normalize().multiplyInPlace(new Vector3(0.04, 0.04, 0.04));
        mesh.moveWithCollisions(direction);

        const meshPos = mesh.getAbsolutePosition();

        this.prevPos = this.currPos;
        this.currPos = new Vector2(meshPos.x, meshPos.z);

        return undefined;
    }

    private isDestReached(gameObject: GameObject) {
        const curr = gameObject.colliderMesh.getAbsolutePosition();

        const isWithinDestRadius = this.toPoint.subtract(new Vector2(curr.x, curr.z)).length() < 0.2;
        const isLeavingDest = this.prevPos && this.prevPos.subtract(this.toPoint).length() < this.currPos.subtract(this.toPoint).length();

        return isWithinDestRadius || isLeavingDest;
    }

    private initPath(gameObject: GameObject, world: World) {
        const pos = gameObject.get2dPos();
        
        this.path = world.ai.pathFinder.findPath(pos, new Vector2(pos.x + 40, pos.y - 5), world.ai.areaMap);
        // this.path = world.ai.pathFinder.findPath(new Vector2(pos.x, pos.z), new Vector2(8, -5));
        this.fromPoint = pos;
        this.toPoint = this.path[1];

        const destMesh = MeshBuilder.CreateBox('destination', { size: 1 }, world.scene);
        destMesh.translate(Axis.X, this.toPoint.x, Space.WORLD);
        destMesh.translate(Axis.Z, this.toPoint.y, Space.WORLD);
    }


    exit(gameObject: GameObject) {
        gameObject.stopCurrentAnimation();
    }
}