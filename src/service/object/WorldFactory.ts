import { Axis, Color3, MeshBuilder, PhysicsImpostor, Scene, Space, StandardMaterial, Vector2 } from "babylonjs";
import { WorldObj } from "../../model/objects/WorldObj";
import { QuarterStore } from "../../store/QuarterStore";
import { GroundJson } from "../import/WorldMap";
import { WorldProvider } from "../WorldProvider";
import { ModelLoader } from "./mesh/ModelLoader";
import { QuarterFactory, QuarterObjConfig } from "./QuarterFactory";

export class WorldFactory {

    private readonly worldProvider: WorldProvider;
    private readonly quarterStore: QuarterStore;
    private readonly quarterFactory: QuarterFactory;
    private readonly modelLoader: ModelLoader;
    
    constructor(worldProvider: WorldProvider, quarterStore: QuarterStore) {
        this.quarterStore = quarterStore;
        this.worldProvider = worldProvider;
        this.quarterFactory = new QuarterFactory(this.worldProvider, this.quarterStore);
        
        this.modelLoader = new ModelLoader();
    }

    async createWorldObj(scene: Scene): Promise<WorldObj> {
        const json = this.worldProvider.worldMap;
        const worldObj = new WorldObj(json.cameraLocation);
        this.worldProvider.world = worldObj;
        worldObj.scene = scene;
        worldObj.engine = scene.getEngine();

        const testMesh = MeshBuilder.CreateBox('test-mesh', { size: 3 }, scene);
        testMesh.position.y = 3;

        this.createGround(worldObj);
        this.createQuarters(json.grounds);
        await this.loadModels(json.models);

        return worldObj;
    }

    createGround(worldObj: WorldObj) {
        const size = this.worldProvider.worldSize.x;

        const ground = MeshBuilder.CreateBox('ground', { width: size, depth: size, height: 0.2 });
        ground.translate(Axis.Y, -0.21, Space.WORLD);
        const material = new StandardMaterial(`ground--material`, this.worldProvider.scene);
        material.diffuseColor = Color3.FromHexString('#FFFFFF');
        material.specularColor = new Color3(0, 0, 0);
        ground.material = material;

        ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0 }, this.worldProvider.scene);

        worldObj.ground = ground;
    }

    private async loadModels(models: string[]) {
        for (let model of models) {
            const [type, path] = model.split(',').map(str => str.trim());
            await this.modelLoader.loadModel(type, path);
        }
    }

    private createQuarters(grounds: GroundJson[][]) {
        const rows = grounds.length;
        const cols = grounds[0].length;
        const worldSize = this.worldProvider.worldSize;
        const quarterSize = new Vector2(worldSize.x / cols, worldSize.y / rows);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const x = j - cols / 2;
                const y = (rows - i) - rows / 2;
                
                const config: QuarterObjConfig = { color: grounds[i][j].color, position: new Vector2(x, y), size: quarterSize };
                this.quarterFactory.createQuarter(config);
            }
        }
    }
}