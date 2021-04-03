import { Vector3 } from "babylonjs";
import { GameObj, GameObjectJson } from "../../../model/objs/GameObj";

export abstract class AbstractFactoryFeature {
    abstract feature: string;

    abstract isAsync(): boolean;
    processFeature(gameObject: GameObj, attrs: string[]) { throw new Error('Not implemented.'); }
    processFeatureAsync(gameObject: GameObj, attrs: string[]): Promise<void> { throw new Error('Not implemented.'); }

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