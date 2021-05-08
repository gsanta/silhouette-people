import { Vector3 } from "babylonjs";
import { MeshItem } from "../../../model/item/mesh/MeshItem";

export abstract class AbstractPropertyParser<P> {
    abstract propName: string;

    isAsync(): boolean { return false; }
    processProperty(meshItem: MeshItem, props: P) { throw new Error('Not implemented.'); }
    processPropertyAsync(meshItem: MeshItem, props: P): Promise<void> { throw new Error('Not implemented.'); }
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