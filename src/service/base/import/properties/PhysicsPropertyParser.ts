import { PhysicsImpostor } from "babylonjs";
import { MeshItem } from "../../../../model/item/mesh/MeshItem";
import { Lookup } from "../../../Lookup";
import { WorldProvider } from "../../../WorldProvider";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export interface PhysicsPropertyConfig {
    mass: number;
}

export class PhysicsPropertyParser extends AbstractPropertyParser<PhysicsPropertyConfig> {
    propName = 'physics';
    
    private readonly worldProvider: WorldProvider;

    constructor(worldProvider: WorldProvider) {
        super();

        this.worldProvider = worldProvider;
    }

    isAsync() {
        return false;
    }

    processProperty(gameObject: MeshItem, config: PhysicsPropertyConfig): void {
        const colliderMesh = gameObject.instance.getColliderMesh();
        if (colliderMesh) {
            colliderMesh.physicsImpostor = new PhysicsImpostor(colliderMesh, PhysicsImpostor.BoxImpostor, { mass: config.mass,  }, this.worldProvider.scene);
        }
    }
}