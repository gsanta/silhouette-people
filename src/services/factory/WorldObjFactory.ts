import { WorldObj } from "../../model/objs/WorldObj";
import { GroundJson, WorldJson } from "../district/WorldJson";
import { DistrictParser } from "../district/DistrictParser";
import { Lookup } from "../Lookup";
import { GameObjectJson, GameObjTag } from "../../model/objs/GameObj";
import { Axis, Color3, MeshBuilder, PhysicsImpostor, Space, StandardMaterial, Vector2 } from "babylonjs";
import { QuarterObjConfig } from "./QuarterObjFactory";

export class WorldObjFactory {
    private assetsPath = 'assets/levels';
    private lookup: Lookup;
    private worldMapParser: DistrictParser;
    
    constructor(lookup: Lookup) {
        this.lookup = lookup;

        this.worldMapParser = new DistrictParser();
    }

    async createWorldObj(levelName: string): Promise<WorldObj> {

        const json = await this.loadWorldJson(levelName);
        const map = await this.loadWorldMap(levelName);
        json.map = map;

        this.worldMapParser.parse(json);

        const worldObj = new WorldObj(this.worldMapParser.getSize(), json.cameraLocation, this.worldMapParser.getQuarterNum(), this.lookup);

        this.createGround(worldObj);
        this.createQuarters(json.grounds, worldObj);
        await this.createGameObjs(this.worldMapParser.getGameObjJsons(), worldObj);

        return worldObj;
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

        worldObj.basicComp.platform = ground;
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
                this.lookup.quarterFactory.createQuarter(config, worldObj);
            }
        }
    }

    async createGameObjs(gameObjJsons: GameObjectJson[], worldObj: WorldObj) {
        const itemFactory = this.lookup.itemFactory;
        
        const gameObjects = await Promise.all(gameObjJsons.map(json =>  itemFactory.create(json, worldObj)));
        const colliderMeshes = gameObjects
            .filter(obj => obj.colliderMesh && obj.tag.doesNotHave(GameObjTag.Player, GameObjTag.Enemy, GameObjTag.Bicycle))
            .map(obj => obj.colliderMesh);
        

        gameObjects.forEach(obj => worldObj.obj.addGameObject(obj));
        worldObj.quarter.getQuarter(1).getMap().fillMeshes(colliderMeshes);

        this.lookup.globalStore.getCamera().setDistrict(worldObj);
    }

    private async loadWorldJson(name: string): Promise<WorldJson> {
        return await fetch(`${this.assetsPath}/${name}.json`).then(res => res.json());
    }

    private async loadWorldMap(name: string): Promise<string> {
        return await fetch(`${this.assetsPath}/${name}-map-1.txt`).then(res => res.text());
    }
}