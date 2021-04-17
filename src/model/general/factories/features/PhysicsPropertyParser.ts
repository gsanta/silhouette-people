import { PhysicsImpostor } from "babylonjs";
import { MeshObj } from "../../objs/MeshObj";
import { Lookup } from "../../../../services/Lookup";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export class PhysicsPropertyParser extends AbstractPropertyParser {
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