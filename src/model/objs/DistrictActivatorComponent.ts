import { Axis, Space } from "babylonjs";
import { QuarterMapParser } from "../../core/io/QuarterMapParser";
import { World } from "../World";
import { ActiveDistrictComponent } from "./ActiveDistrictComponent";
import { DistrictObj } from "./DistrictObj";
import { GameObjectRole } from "./GameObj";

export class DistrictActivatorComponent {
    private district: DistrictObj;
    private world: World;
    private mapParser: QuarterMapParser;

    constructor(district: DistrictObj, world: World) {
        this.district = district;
        this.world = world;
        this.mapParser = new QuarterMapParser();
    }

    async initialize() {
        const districtSize = this.district.size.x;
        const json = this.district.json;

        const ground = this.district.factory.createGround(districtSize);
        ground.translate(Axis.X, this.district.translate.x, Space.WORLD);
        ground.translate(Axis.Z, this.district.translate.y, Space.WORLD);
        this.district.basicComp.platform = ground;

        json.grounds.forEach((ground, index) => this.district.factory.createGroundTile(ground, districtSize / 2, index));


    }

    async activate() {        
        const gameObjectJsons = this.mapParser.parse(this.district.json);
        const gameObjects = await Promise.all(gameObjectJsons.map(json => this.district.factory.create(json)));
        const colliderMeshes = gameObjects
            .filter(obj => obj.colliderMesh && obj.role === GameObjectRole.Static)
            .map(obj => obj.colliderMesh)

            
        const activeComp = new ActiveDistrictComponent(this.district, gameObjects);
        activeComp.getQuarter(1).getMap().fillMeshes(colliderMeshes);
        
        this.district.activeComp = activeComp;
    }
}