import { PhysicsImpostor } from "babylonjs";
import { GameObject } from "../../../model/objects/game_object/GameObject";
import { SceneService } from "../../SceneService";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export interface PhysicsPropertyConfig {
    mass: number;
}

export class PhysicsPropertyParser extends AbstractPropertyParser<PhysicsPropertyConfig> {
    propName = 'physics';
    
    private readonly worldProvider: SceneService;

    constructor(worldProvider: SceneService) {
        super();

        this.worldProvider = worldProvider;
    }

    isAsync() {
        return false;
    }

    processProperty(gameObject: GameObject, config: PhysicsPropertyConfig): void {
        const colliderMesh = gameObject.collisionMesh;
        if (colliderMesh) {
            colliderMesh.physicsImpostor = new PhysicsImpostor(colliderMesh, PhysicsImpostor.BoxImpostor, { mass: config.mass,  }, this.worldProvider.scene);
        }
    }
}