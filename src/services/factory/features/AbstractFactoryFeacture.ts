import { Vector3 } from "babylonjs";
import { MeshObj } from "../../../model/objs/MeshObj";

export abstract class AbstractFactoryFeature {
    abstract feature: string;

    isAsync(): boolean { return false; }
    processFeature(gameObject: MeshObj, attrs: string[]) { throw new Error('Not implemented.'); }
    processFeatureAsync(gameObject: MeshObj, attrs: string[]): Promise<void> { throw new Error('Not implemented.'); }

    // process(gameObject: GameObj, json: GameObjectJson): void;
}

export function parseStrVector(vec: string): Vector3 {
    if (!vec) { return undefined; }
    
    const [x, y, z] = vec.split(':').map(str => parseFloat(str));
    return new Vector3(x, y, z);
}

export function toStrVector(vec: Vector3): string {
    if (!vec) { return undefined; }

    return `${vec.x}:${vec.y}:${vec.z}`;
}