import { DistrictImporter, DistrictJson } from "../../core/io/DistrictImporter";
import { World } from "../../model/World";

export interface GroundJson {
    color: string;
}

export interface LevelJson {
    id: string;
    size: string;
    grounds: GroundJson[];
    charToType: { [key: string]: string },
    models: { [key: string]: string },
    textures: { [key: string]: string },
    textureMeshIndex: { [key: string]: number },
    colliderSizes: { [key: string]: string },
    mapUrl: string;
    rotationMapUrl: string;
}

export class ImportService {
    private world: World;
    private districtImporter: DistrictImporter;

    constructor(world: World) {
        this.world = world;
        this.districtImporter = new DistrictImporter(world);
    }
    
    async importDistrict(json: DistrictJson) {
        const district = await this.districtImporter.importDistrict(json);
        this.world.store.addDistrict(district);
        this.world.store.setActiveDistrict(district);
    }
}