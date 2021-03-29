import { PhysicsImpostor } from "babylonjs";
import { GameObj } from "../../model/objs/GameObj";
import { World } from "../../services/World";
import { IFactoryFeature } from "./IFactoryFeacture";


export class PhysicsFactoryFeature implements IFactoryFeature {
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    process(gameObject: GameObj): void {
        gameObject.colliderMesh.physicsImpostor = new PhysicsImpostor(gameObject.colliderMesh, PhysicsImpostor.BoxImpostor, { mass: 1,  }, this.world.scene);
    }
}