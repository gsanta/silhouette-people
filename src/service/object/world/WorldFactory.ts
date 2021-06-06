import { ArcRotateCamera, Axis, Color3, MeshBuilder, PhysicsImpostor, Scene, Space, StandardMaterial, Vector2, Vector3 } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { CameraItem } from "../../../model/item/CameraItem";
import { WorldObj } from "../../../model/item/WorldObj";
import { QuarterStore } from "../../../store/QuarterStore";
import { GroundJson } from "../../base/import/map/WorldMap";
import { CameraService } from "../../edit/camera/CameraService";
import { lookup } from "../../Lookup";
import { WorldProvider } from "../../WorldProvider";
import { ModelLoader } from "../mesh/ModelLoader";
import { QuarterFactory, QuarterObjConfig } from "../quarter/QuarterFactory";

export class WorldFactory {

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    @InjectProperty("QuarterStore")
    private quarterStore: QuarterStore;

    @InjectProperty("CameraService")
    private cameraService: CameraService;
    
    private readonly quarterFactory: QuarterFactory;

    private readonly modelLoader: ModelLoader;
    
    constructor() {
        this.quarterStore = lookup.quarterStore;
        this.cameraService = lookup.cameraService;
        this.worldProvider = lookup.worldProvider;
        this.quarterFactory = new QuarterFactory(this.worldProvider, this.quarterStore);
        
        this.modelLoader = new ModelLoader();
    }

    async createWorldObj(scene: Scene): Promise<WorldObj> {
        const json = this.worldProvider.worldMap;
        const worldObj = new WorldObj(json.cameraLocation);
        lookup.worldProvider.world = worldObj;
        worldObj.scene = scene;
        worldObj.engine = scene.getEngine();

        worldObj.camera = this.createCamera(worldObj);
        this.createGround(worldObj);
        this.createQuarters(json.grounds);
        await this.loadModels(json.models);

        return worldObj;
    }

    createCamera(worldObj: WorldObj) {
        const camera = new ArcRotateCamera("camera", Math.PI + Math.PI / 3, Math.PI / 3, 120, new Vector3(0, 0, 0), this.worldProvider.scene);
        camera.attachControl(this.worldProvider.canvas, true);

        const cameraOj = new CameraItem(camera, worldObj);

        this.cameraService.setCameraObj(cameraOj);

        return cameraOj;
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