export interface GroundJson {
    color: string;
}

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
    map: string;
    rotationMap: string;
}