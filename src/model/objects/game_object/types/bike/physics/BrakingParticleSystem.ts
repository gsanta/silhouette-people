import { GPUParticleSystem, Texture } from "babylonjs";
import { WorldProvider } from "../../../../../../service/WorldProvider";
import { GameObject } from "../../../GameObject";


export class BrakingParticleSystem {

    private readonly item: GameObject;
    private readonly worldProvider: WorldProvider;
    private particleSystem: GPUParticleSystem;

    constructor(item: GameObject, worldProvider: WorldProvider) {
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