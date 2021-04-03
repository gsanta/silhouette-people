import { PhysicsImpostor } from "babylonjs";
import { GameObj } from "../../../model/objs/GameObj";
import { World } from "../../World";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";


export class PhysicsFactoryFeature extends AbstractFactoryFeature {
    private world: World;

    constructor(world: World) {
        super();
        this.world = world;
    }

    feature = 'Physics';

    isAsync() {
        return false;
    }

    processFeature(gameObject: GameObj): void {
        gameObject.colliderMesh.physicsImpostor = new PhysicsImpostor(gameObject.colliderMesh, PhysicsImpostor.BoxImpostor, { mass: 1,  }, this.world.scene);
    }
}