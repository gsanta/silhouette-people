import { GPUParticleSystem, Texture } from "babylonjs";
import { WorldProvider } from "../../../../service/WorldProvider";
import { MeshItem } from "../../mesh/MeshItem";


export class BrakingParticleSystem {

    private readonly item: MeshItem;
    private readonly worldProvider: WorldProvider;
    private particleSystem: GPUParticleSystem;

    constructor(item: MeshItem, worldProvider: WorldProvider) {
        this.item = item;
        this.worldProvider = worldProvider;

        this.particleSystem = new GPUParticleSystem('braking', { capacity: 1000 }, this.worldProvider.scene);
        this.particleSystem.particleTexture = new Texture('https://www.babylonjs.com/assets/Flare.png', this.worldProvider.scene);
        this.particleSystem.emitter = this.item.collisionMesh;
        this.particleSystem.preWarmCycles = 100;
        this.particleSystem.preWarmStepOffset = 5;
    }

    create() {
        console.log('srart');
        this.particleSystem.start();
    }

    dispose() {
        console.log('dispose')
        this.particleSystem.stop();
        // if (this.particleSystem) {
        // }
    }
}