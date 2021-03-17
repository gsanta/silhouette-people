import { World } from "../../model/World";
import { MapParser } from "./MapParser";

export interface GroundJson {
    color: string;
}

export interface LevelJson {
    grounds: GroundJson[];
    charToType: { [key: string]: string },
    typeToModel: { [key: string]: string },
    colliderSizes: { [key: string]: string },
    mapUrl: string;
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
        json.grounds.forEach((ground, index) => this.world.factory.createGround(ground, LEVEL_SIZE / 2, index));
        await this.mapParser.loadAndParse(json);
    }
}