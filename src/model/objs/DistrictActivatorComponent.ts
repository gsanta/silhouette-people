import { Axis, Space } from "babylonjs";
import { QuarterMapParser } from "../../core/io/QuarterMapParser";
import { World } from "../../services/World";
import { ActiveDistrictComponent } from "./ActiveDistrictComponent";
import { DistrictObj } from "./DistrictObj";
import { GameObjTag } from "./GameObj";

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

        const ground = this.district.factory.createGround(districtSize);
        ground.translate(Axis.X, this.district.translate.x, Space.WORLD);
        ground.translate(Axis.Z, this.district.translate.y, Space.WORLD);
        this.district.basicComp.platform = ground;
    }

    async activate() {
        const districtSize = this.district.size.x;
        const json = this.district.json;

        const activeComp = new ActiveDistrictComponent(this.district);
        
        json.grounds.forEach((ground, index) => {
            const quarterObj = this.district.factory.createGroundTile(ground, districtSize / 2, index);
            this.district.activeComp.addQuarter(quarterObj);
        });
        
        const gameObjectJsons = this.mapParser.parse(this.district.json);
        const gameObjects = await Promise.all(gameObjectJsons.map(json => this.district.factory.create(json)));
        const colliderMeshes = gameObjects
            .filter(obj => obj.colliderMesh && obj.tag.doesNotHave(GameObjTag.Player, GameObjTag.Enemy, GameObjTag.Bicycle))
            .map(obj => obj.colliderMesh)

        gameObjects.forEach(obj => activeComp.addGameObject(obj));
            
        activeComp.getQuarter(1).getMap().fillMeshes(colliderMeshes);
    }
}