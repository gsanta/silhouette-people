export interface GroundJson {
    color: string;
}

export interface QuarterJson {
    color: string;
}

export interface WorldMap {
    id: string;
    size: string;
    relativePos: string;
    cameraLocation: number;
    grounds: QuarterJson[][];
    charToType: { [key: string]: string },
    models: string[],
    textures: { [key: string]: string },
    textureMeshIndex: { [key: string]: number },
    collider: { [key: string]: string | boolean },
    tags: { [key: string]: string },
    features: { [key: string]: string[] },
    map: string;
    routeMap: string;
    rotationMap: string;
}