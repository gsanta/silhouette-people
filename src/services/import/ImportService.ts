import { World } from "../../model/World";

export interface GroundJson {
    color: string;
}

export interface LevelJson {
    grounds: GroundJson[];
}

const LEVEL_SIZE = 100;

export class ImportService {
    private world: World;

    constructor(world: World) {
        this.world = world;
    }
    
    import(json: LevelJson) {
        json.grounds.forEach((ground, index) => this.world.factory.createGround(ground, LEVEL_SIZE / 2, index));
    }
}