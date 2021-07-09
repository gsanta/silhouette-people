import { Vector3 } from "babylonjs";
import { Quad } from "../shapes/Quad";

export enum PathShapeType {
    LINE = 'line',
    CURVED = 'curved'
}

export namespace PathShapeType {
    export function all(): string[] {
        const items: string[] = [];
        for (let item in PathShapeType) {
            if (isNaN(Number(item))) {
                items.push(item);
            }
        }

        return items;
    }
}


export interface PathShape {
    type: PathShapeType;
    path: Vector3[][];
    bounds: Quad;
    controlPoints: Vector3[];
    internalControlPoints: Vector3[];
    size: number;
    getT(t: number): Vector3;
    getDerivative(t: number, reversed?: boolean): Vector3;
    update(controlPointIndex: number, val: Vector3);
}