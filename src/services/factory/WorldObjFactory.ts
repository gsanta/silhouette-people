import { WorldObj } from "../../model/objs/WorldObj";
import { GroundJson, WorldJson } from "../district/WorldJson";
import { DistrictParser } from "../district/DistrictParser";
import { Lookup } from "../Lookup";
import { GameObjectJson, GameObjTag } from "../../model/objs/GameObj";
import { Vector2 } from "babylonjs";


export class WorldObjFactory {
    private assetsPath = 'assets/levels';
    private lookup: Lookup;
    
    constructor(lookup: Lookup) {
        this.lookup = lookup;
    }

    async createWorldObj(levelName: string): Promise<WorldObj> {

        const json = await this.loadWorldJson(levelName);
        const map = await this.loadWorldMap(levelName);
        json.map = map;

        const worldParser = new DistrictParser(json);
        const worldObj = new WorldObj(worldParser.getSize(), json.cameraLocation, worldParser.getQuarterNum(), this.lookup);

        this.createGround(worldObj);
        this.createQuarters(json.grounds, worldObj);
        await this.createGameObjs(worldParser.getGameObjJsons(), worldObj);

        return worldObj;
    }

    createGround(worldObj: WorldObj) {
        const districtSize = worldObj.size.x;

        const ground = worldObj.factory.createGround(districtSize);
        worldObj.basicComp.platform = ground;
    }

    private createQuarters(grounds: GroundJson[][], worldObj: WorldObj) {
        const rows = grounds.length;
        const cols = grounds[0].length;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const x = j - cols / 2;
                const y = (rows - i) - rows / 2;
                
                worldObj.factory.createQuarterGround(grounds[i][j], new Vector2(x, y));
            }
        }
    }

    async createGameObjs(gameObjJsons: GameObjectJson[], worldObj: WorldObj) {
        worldObj.setActiveDistrict(true);
        
        const gameObjects = await Promise.all(gameObjJsons.map(json => worldObj.factory.create(json)));
        const colliderMeshes = gameObjects
            .filter(obj => obj.colliderMesh && obj.tag.doesNotHave(GameObjTag.Player, GameObjTag.Enemy, GameObjTag.Bicycle))
            .map(obj => obj.colliderMesh);
        

        gameObjects.forEach(obj => worldObj.obj.addGameObject(obj));
        worldObj.quarter.getQuarter(1).getMap().fillMeshes(colliderMeshes);

        const districtBorder = worldObj.factory.createDistrictBorder();
        worldObj.obj.addGameObject(districtBorder);

        this.lookup.globalStore.getCamera().setDistrict(worldObj);
    }

    private async loadWorldJson(name: string): Promise<WorldJson> {
        return await fetch(`${this.assetsPath}/${name}.json`).then(res => res.json());
    }

    private async loadWorldMap(name: string): Promise<string> {
        return await fetch(`${this.assetsPath}/${name}-map-1.txt`).then(res => res.text());
    }
}