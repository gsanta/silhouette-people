import { World } from "../../model/World";
import { MapParser } from "./MapParser";

export interface GroundJson {
    color: string;
}

export interface LevelJson {
    grounds: GroundJson[];
    charToType: { [key: string]: string },
    models: { [key: string]: string },
    textures: { [key: string]: string },
    textureMeshIndex: { [key: string]: number },
    colliderSizes: { [key: string]: string },
    mapUrl: string;
    rotationMapUrl: string;
}

const LEVEL_SIZE = 100;

export class ImportService {
    private world: World;
    private mapParser: MapParser;

    constructor(world: World) {
        this.world = world;
        this.mapParser = new MapParser(this.world);
    }
    
    async import(json: LevelJson) {
        this.world.factory.createGround(LEVEL_SIZE);
        json.grounds.forEach((ground, index) => this.world.factory.createGroundTile(ground, LEVEL_SIZE / 2, index));
        await this.mapParser.loadAndParse(json);
    }
}