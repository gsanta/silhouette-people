import { PhysicsImpostor } from "babylonjs";
import { MeshObj } from "../../../model/object/mesh/MeshObj";
import { Lookup } from "../../Lookup";
import { WorldProvider } from "../../object/world/WorldProvider";
import { AbstractPropertyParser } from "./AbstractPropertyParser";

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

    processProperty(gameObject: MeshObj, config: PhysicsPropertyConfig): void {
        const colliderMesh = gameObject.instance.getColliderMesh();
        if (colliderMesh) {
            colliderMesh.physicsImpostor = new PhysicsImpostor(colliderMesh, PhysicsImpostor.BoxImpostor, { mass: config.mass,  }, this.worldProvider.scene);
        }
    }
}