import { ArcRotateCamera, Axis, Color3, MeshBuilder, PhysicsImpostor, Scene, Space, StandardMaterial, Vector2, Vector3 } from "babylonjs";
import { InjectProperty } from "../../di/diDecorators";
import { CameraObj } from "../../model/general/objs/CameraObj";
import { GameObjectJson, MeshObjTag } from "../../model/general/objs/MeshObj";
import { WorldObj } from "../../model/general/objs/WorldObj";
import { MeshStore } from "../../stores/MeshStore";
import { QuarterStore } from "../../stores/QuarterStore";
import { TileStore } from "../../stores/TileStore";
import { WorldMapParser } from "../district/WorldMapParser";
import { GroundJson, WorldJson } from "../district/WorldJson";
import { lookup, Lookup } from "../Lookup";
import { QuarterObjConfig } from "./QuarterFactory";
import { ModelLoader } from "./ModelLoader";

export class WorldFactory {

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("QuarterStore")
    private quarterStore: QuarterStore;

    @InjectProperty("TileStore")
    private tileStore: TileStore;

    private assetsPath = 'assets/levels';
    private lookup: Lookup;
    private worldMapParser: WorldMapParser;
    private modelLoader: ModelLoader;
    
    constructor(lookup: Lookup) {
        this.lookup = lookup;
        this.meshStore = lookup.meshStore;
        this.quarterStore = lookup.quarterStore;
        this.tileStore = lookup.tileStore;

        this.worldMapParser = new WorldMapParser();
        this.modelLoader = new ModelLoader();
    }

    async createWorldObj(levelName: string, scene: Scene): Promise<WorldObj> {

        const json = await this.loadWorldJson(levelName);
        const map = await this.loadWorldMap(levelName);
        json.map = map;

        this.worldMapParser.parse(json);

        const worldObj = new WorldObj(this.worldMapParser.getSize(), json.cameraLocation, this.worldMapParser.getQuarterNum());
        lookup.worldProvider.world = worldObj;
        worldObj.scene = scene;
        worldObj.engine = scene.getEngine();
        this.tileStore.TILES_PER_ROW = Math.floor(worldObj.size.x / this.tileStore.TILE_SIZE); 
        this.tileStore.TILES_PER_COL = Math.floor(worldObj.size.y / this.tileStore.TILE_SIZE); 

        worldObj.camera = this.createCamera(worldObj);
        this.createGround(worldObj);
        this.createQuarters(json.grounds, worldObj);
        await this.loadModels(json.models);
        await this.createGameObjs(this.worldMapParser.getGameObjJsons(), worldObj);

        return worldObj;
    }

    createCamera(worldObj: WorldObj) {
        const camera = new ArcRotateCamera("camera", Math.PI + Math.PI / 3, Math.PI / 3, 120, new Vector3(0, 0, 0), this.lookup.scene);
        camera.attachControl(this.lookup.canvas, true);

        const cameraOj = new CameraObj(camera, worldObj);

        this.lookup.controller.getCameraController().setCameraObj(cameraOj);

        return cameraOj;
    }

    createGround(worldObj: WorldObj) {
        const size = worldObj.size.x;

        const ground = MeshBuilder.CreateBox('ground', { width: size, depth: size, height: 0.2 });
        ground.translate(Axis.Y, -0.21, Space.WORLD);
        const material = new StandardMaterial(`ground--material`, this.lookup.scene);
        material.diffuseColor = Color3.FromHexString('#FFFFFF');
        material.specularColor = new Color3(0, 0, 0);
        ground.material = material;

        ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0 }, this.lookup.scene);

        worldObj.ground = ground;
    }

    private async loadModels(models: string[]) {
        for (let model of models) {
            const [type, path] = model.split(',').map(str => str.trim());
            await this.modelLoader.loadModel(type, path);
        }
    }

    private createQuarters(grounds: GroundJson[][], worldObj: WorldObj) {
        const rows = grounds.length;
        const cols = grounds[0].length;
        const worldSize = this.worldMapParser.getSize();
        const quarterSize = new Vector2(worldSize.x / cols, worldSize.y / rows);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const x = j - cols / 2;
                const y = (rows - i) - rows / 2;
                
                const config: QuarterObjConfig = { color: grounds[i][j].color, position: new Vector2(x, y), size: quarterSize };
                this.lookup.quarterFactory.createQuarter(config);
            }
        }
    }

    async createGameObjs(gameObjJsons: GameObjectJson[], worldObj: WorldObj) {
        const itemFactory = this.lookup.meshFactory;
        
        const gameObjects = await Promise.all(gameObjJsons.map(json =>  itemFactory.create(json, worldObj)));
        const colliderMeshes = gameObjects
            .filter(obj => obj.instance.getColliderMesh() && obj.tag.doesNotHave(MeshObjTag.Player, MeshObjTag.Enemy, MeshObjTag.Bicycle))
            .map(obj => obj.instance.getColliderMesh());
        

        gameObjects.forEach(obj => this.meshStore.addObj(obj));
        this.quarterStore.getQuarter(1).getMap().fillMeshes(colliderMeshes);
    }

    private async loadWorldJson(name: string): Promise<WorldJson> {
        return await fetch(`${this.assetsPath}/${name}.json`).then(res => res.json());
    }

    private async loadWorldMap(name: string): Promise<string> {
        return await fetch(`${this.assetsPath}/${name}-map-1.txt`).then(res => res.text());
    }
}