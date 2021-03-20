import { Vector2 } from "babylonjs";
import { World } from "../../model/World";
import { QuarterMapParser } from "./QuarterMapParser";
import { DistrictObj } from "../../model/objs/DistrictObj";

const DISTRICT_SIZE = 100;

export interface QuarterJson {
    color: string;
}

export interface DistrictJson {
    id: string;
    size: string;
    grounds: QuarterJson[];
    charToType: { [key: string]: string },
    models: { [key: string]: string },
    textures: { [key: string]: string },
    textureMeshIndex: { [key: string]: number },
    colliderSizes: { [key: string]: string },
    mapUrl: string;
    rotationMapUrl: string;
}

export class DistrictImporter {
    private world: World;
    private mapParser: QuarterMapParser;

    constructor(world: World) {
        this.world = world;
        this.mapParser = new QuarterMapParser();
    }

    async importDistrict(json: DistrictJson): Promise<DistrictObj> {
        const [width, height] = json.size.split(':').map(numStr => parseInt(numStr));
        
        this.world.factory.gameObject.createGround(DISTRICT_SIZE);
        json.grounds.forEach((ground, index) => this.world.factory.gameObject.createGroundTile(ground, DISTRICT_SIZE / 2, index));
        
        const gameObjectJsons = await this.mapParser.loadAndParse(json);
        const gameObjects = await Promise.all(gameObjectJsons.map(json => this.world.factory.gameObject.create(json)));
        
        const district = new DistrictObj(new Vector2(width, height), gameObjects);

        return district;
    }
}