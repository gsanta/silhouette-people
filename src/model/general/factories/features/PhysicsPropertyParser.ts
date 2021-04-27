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
        const colliderMesh = gameObject.instance.getColliderMesh();
        colliderMesh.physicsImpostor = new PhysicsImpostor(colliderMesh, PhysicsImpostor.BoxImpostor, { mass: 1,  }, this.world.scene);
    }
}