import { World } from "../../model/World";
import { MapParser } from "../../services/import/MapParser";
import { District } from "../../stores/District";

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
    private mapParser: MapParser;

    constructor(world: World) {
        this.world = world;
        this.mapParser = new MapParser();
    }

    async importDistrict(json: DistrictJson): Promise<District> {
        const district = new District();

        this.world.factory.createGround(DISTRICT_SIZE);
        json.grounds.forEach((ground, index) => this.world.factory.createGroundTile(ground, DISTRICT_SIZE / 2, index));
        const gameObjectJsons = await this.mapParser.loadAndParse(json);

        const gameObjects = await Promise.all(gameObjectJsons.map(json => this.world.factory.create(json)));

        gameObjects.forEach(go => district.addGameObject(go));

        return district;
    }
}