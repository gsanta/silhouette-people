import { ArcRotateCamera, Axis, Color3, MeshBuilder, PhysicsImpostor, Scene, Space, StandardMaterial, Vector2, Vector3 } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { CameraItem } from "../../../model/item/CameraItem";
import { MeshConfig, MeshItemTag } from "../../../model/item/mesh/MeshItem";
import { WorldObj } from "../../../model/item/WorldObj";
import { MeshStore } from "../../../store/MeshStore";
import { QuarterStore } from "../../../store/QuarterStore";
import { CameraService } from "../../edit/camera/CameraService";
import { lookup } from "../../Lookup";
import { MeshFactory } from "../mesh/MeshFactory";
import { ModelLoader } from "../mesh/ModelLoader";
import { QuarterFactory, QuarterObjConfig } from "../quarter/QuarterFactory";
import { GroundJson } from "./WorldMap";
import { WorldProvider } from "./WorldProvider";

export class WorldFactory {

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("QuarterStore")
    private quarterStore: QuarterStore;

    @InjectProperty("CameraService")
    private cameraService: CameraService;
    
    private readonly meshFactory: MeshFactory;
    private readonly quarterFactory: QuarterFactory;

    private readonly modelLoader: ModelLoader;
    
    constructor(meshFactory: MeshFactory) {
        this.meshStore = lookup.meshStore;
        this.quarterStore = lookup.quarterStore;
        this.cameraService = lookup.cameraService;
        this.worldProvider = lookup.worldProvider;
        this.meshFactory = meshFactory;
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

    async createGameObjs(gameObjJsons: MeshConfig[], worldObj: WorldObj) {
        const gameObjects = await Promise.all(gameObjJsons.map(json =>  this.meshFactory.create(json)));
        const colliderMeshes = gameObjects
            .filter(obj => obj.instance.getColliderMesh() && obj.tag.doesNotHave(MeshItemTag.Player, MeshItemTag.Enemy, MeshItemTag.Bicycle))
            .map(obj => obj.instance.getColliderMesh());
        

        gameObjects.forEach(obj => this.meshStore.addItem(obj));
        this.quarterStore.getQuarter(1).getMap().fillMeshes(colliderMeshes);
    }
}