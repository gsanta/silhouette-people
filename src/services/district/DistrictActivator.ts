import { Axis, Space } from "babylonjs";
import { DistrictParser } from "./DistrictParser";
import { ActiveDistrictComponent } from "../../model/objs/ActiveDistrictComponent";
import { DistrictObj } from "../../model/objs/DistrictObj";
import { GameObjTag } from "../../model/objs/GameObj";
import { QuarterObj } from "../../model/objs/QuarterObj";
import { World } from "../World";

export class DistrictActivator {
    private world: World;
    private districtParser: DistrictParser;

    constructor(world: World) {
        this.world = world;
        this.districtParser = new DistrictParser();
    }

    async initialize(district: DistrictObj) {
        const districtSize = district.size.x;

        const ground = district.factory.createGround(district.id, districtSize);
        ground.translate(Axis.X, district.centerPoint.x, Space.WORLD);
        ground.translate(Axis.Z, district.centerPoint.y, Space.WORLD);
        district.basicComp.platform = ground;
    }

    async activate(district: DistrictObj) {
        const districtSize = district.size.x;
        const json = district.json;
        
        const activeComp = new ActiveDistrictComponent(district);
        
        json.grounds.forEach((ground, index) => {
            const quarterGround = district.factory.createQuarterGround(ground, districtSize / 2, index);
            district.activeComp.addQuarter(new QuarterObj(district, quarterGround));
            district.activeComp.addGameObject(quarterGround);
        });
        
        const gameObjectJsons = this.districtParser.parse(district.json);
        const gameObjects = await Promise.all(gameObjectJsons.map(json => district.factory.create(json)));
        const colliderMeshes = gameObjects
        .filter(obj => obj.colliderMesh && obj.tag.doesNotHave(GameObjTag.Player, GameObjTag.Enemy, GameObjTag.Bicycle))
        .map(obj => obj.colliderMesh)
        
        gameObjects.forEach(obj => activeComp.addGameObject(obj));
        activeComp.getQuarter(1).getMap().fillMeshes(colliderMeshes);

        const districtBorder = district.factory.createDistrictBorder();
        district.activeComp.addGameObject(districtBorder);

        this.world.globalStore.getCamera().setDistrict(district);
    }

    deactivate(district: DistrictObj) {
        district.activeComp.remove();
    }
}