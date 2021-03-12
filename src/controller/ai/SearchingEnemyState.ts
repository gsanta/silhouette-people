import { Axis, MeshBuilder, Space, Vector2, Vector3 } from "babylonjs";
import { AbstractCharacterState } from "../../model/character/AbstractCharacterState";
import { GameObject } from "../../model/GameObject";
import { World } from "../../model/World";

export class SearchingEnemyState extends AbstractCharacterState {
    private world: World;
    private path: Vector2[];
    private dest: Vector2;

    constructor(world: World) {
        super();
        this.world = world;
    }

    updateAnimation(gameObject: GameObject) {
        gameObject.runAnimation('Walk');
    }

    updatePhysics(gameObject: GameObject, world: World) {
        if (!this.path) {
            const pos = gameObject.colliderMesh.getAbsolutePosition();
            this.path = world.ai.pathFinder.findPath(new Vector2(pos.x, pos.z), new Vector2(pos.x + 40, pos.z));
            
            this.dest = this.path[this.path.length - 1];

            const destMesh = MeshBuilder.CreateBox('destination', { size: 1 }, world.scene);
            destMesh.translate(Axis.X, this.dest.x, Space.WORLD);
            destMesh.translate(Axis.Z, this.dest.y, Space.WORLD);
        }

        const mesh = gameObject.colliderMesh ? gameObject.colliderMesh : gameObject.mesh;

        const curr = new Vector2(mesh.getAbsolutePosition().x, mesh.getAbsolutePosition().z);
        const vector = this.dest.subtract(curr);
        const angle = Math.atan2(vector.y, vector.x);
        const angleDeg = angle * 180 / Math.PI;
        // mesh.
        const delta =  (angle + Math.PI / 2) - mesh.rotation.y;
        mesh.rotation.y = angle + Math.PI / 2;
        // mesh.rotate(Axis.Y, delta, Space.WORLD);

        var forward = new Vector3(0, 0, 0.04);//gameObject.velocity;	
        var direction = gameObject.mesh.getDirection(forward);
        direction.normalize().multiplyInPlace(new Vector3(0.04, 0.04, 0.04));
        mesh.moveWithCollisions(direction);
        // mesh.rotate(Axis.Y, gameObject.rotation.y, Space.LOCAL);

        return undefined;
    }

    exit(gameObject: GameObject) {
        gameObject.stopCurrentAnimation();
    }
}