import { RouteStoryConfig } from "../../model/objects/route/RouteItem";

export interface GroundJson {
    color: string;
    materialId: string;
}

export interface WorldMap {
    id: string;
    relativePos: string;
    cameraLocation: number;
    grounds: GroundJson[][];
    charToType: { [key: string]: string };
    models: string[];
    textures: { [key: string]: string };
    textureMeshIndex: { [key: string]: number };
    collider: { [key: string]: string | boolean };
    tags: { [key: string]: string };
    objects: { [key: string]: {properties: {[key: string]: any} }};
    routes: RouteStoryConfig[];
    routeEdges: string[][];
    edgeThickness: { edgeRef: string, thickness: number }[];

    mapUrl: string;
    routeMapUrl: string;

    map: string;
    routeMap: string;

    playerRoute: [string, string];
}