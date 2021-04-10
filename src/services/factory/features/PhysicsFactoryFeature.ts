import { PhysicsImpostor } from "babylonjs";
import { MeshObj } from "../../../model/objs/MeshObj";
import { Lookup } from "../../Lookup";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";


export class PhysicsFactoryFeature extends AbstractFactoryFeature {
    private world: Lookup;

    constructor(world: Lookup) {
        super();
        this.world = world;
    }

    feature = 'Physics';

    isAsync() {
        return false;
    }

    processFeature(gameObject: MeshObj): void {
        gameObject.colliderMesh.physicsImpostor = new PhysicsImpostor(gameObject.colliderMesh, PhysicsImpostor.BoxImpostor, { mass: 1,  }, this.world.scene);
    }
}