import { Axis, MeshBuilder, Space, Vector2, Vector3 } from "babylonjs";
import { AbstractCharacterState, GameObjectStateType } from "../../model/character/AbstractCharacterState";
import { GameObject } from "../../model/GameObject";
import { World } from "../../model/World";

export class SearchingEnemyState extends AbstractCharacterState {
    private world: World;
    path: Vector2[];
    private dest: Vector2;

    constructor(world: World) {
        super(GameObjectStateType.EnemySearching);
        this.world = world;
    }

    updateAnimation(gameObject: GameObject) {
        gameObject.runAnimation('Walk');
    }

    updatePhysics(gameObject: GameObject, world: World) {
        if (!this.path) {
            const pos = gameObject.colliderMesh.getAbsolutePosition();
            this.path = world.ai.pathFinder.findPath(new Vector2(pos.x, pos.z), new Vector2(pos.x + 40, pos.z - 5));
            debugger
            this.dest = this.path[this.path.length - 1];

            const destMesh = MeshBuilder.CreateBox('destination', { size: 1 }, world.scene);
            destMesh.translate(Axis.X, this.dest.x, Space.WORLD);
            destMesh.translate(Axis.Z, this.dest.y, Space.WORLD);
        }

        const mesh = gameObject.colliderMesh ? gameObject.colliderMesh : gameObject.mesh;

        const curr = this.path[0];
        const vector = this.dest.subtract(curr);
        console.log(vector.toString())
        const angle = Math.atan2(vector.y, vector.x);
        mesh.rotation.y = Math.PI / 2 - angle;

        var forward = new Vector3(0, 0, 0.04);
        var direction = gameObject.mesh.getDirection(forward);
        direction.normalize().multiplyInPlace(new Vector3(0.04, 0.04, 0.04));
        mesh.moveWithCollisions(direction);

        return undefined;
    }

    exit(gameObject: GameObject) {
        gameObject.stopCurrentAnimation();
    }
}