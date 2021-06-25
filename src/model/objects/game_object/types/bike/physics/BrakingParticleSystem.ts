import { GPUParticleSystem, Texture } from "babylonjs";
import { SceneService } from "../../../../../../service/SceneService";
import { GameObject } from "../../../GameObject";


export class BrakingParticleSystem {

    private readonly item: GameObject;
    private readonly worldProvider: SceneService;
    private particleSystem: GPUParticleSystem;

    constructor(item: GameObject, worldProvider: SceneService) {
        this.item = item;
        this.worldProvider = worldProvider;

        this.particleSystem = new GPUParticleSystem('braking', { capacity: 1000 }, this.worldProvider.scene);
        this.particleSystem.particleTexture = new Texture('https://www.babylonjs.com/assets/Flare.png', this.worldProvider.scene);
        this.particleSystem.emitter = this.item.collisionMesh;
        this.particleSystem.preWarmCycles = 100;
        this.particleSystem.preWarmStepOffset = 5;
    }

    create() {
        this.particleSystem.start();
    }

    dispose() {
        this.particleSystem.stop();
        // if (this.particleSystem) {
        // }
    }
}