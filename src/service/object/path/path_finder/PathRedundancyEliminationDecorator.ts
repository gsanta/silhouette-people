import { Vector2 } from "babylonjs";
import { QuarterMap } from "../../../../model/objects/game_object/types/quarter/QuarterMap";
import { IPathFinder } from "./IPathFinder";

export class PathRedundancyEliminationDecorator implements IPathFinder {
    private pathFinder: IPathFinder;

    constructor(pathFinder: IPathFinder) {
        this.pathFinder = pathFinder;
    }

    findPath(from: Vector2, to: Vector2, areaMap: QuarterMap): Vector2[] {
        let path = this.pathFinder.findPath(from, to, areaMap);
        this.eliminateRedundancy(path);
        return path;
    }

    private eliminateRedundancy(path: Vector2[]): Vector2[] {

        let index = 0;

        while(index < path.length) {
            if (this.isIndexRedundant(index + 1, path)) {
                path.splice(index + 1, 1);
            } else {
                index++;
            }
        }

        return path;
    }

    private isIndexRedundant(index: number, path: Vector2[]): boolean {
        if (index === 0 || index >= path.length - 1) { return false; }

        const prev = path[index - 1];
        const curr = path[index];
        const next = path[index + 1];


        if (prev.x === curr.x && next.x === curr.x) { return true; }
        if (prev.y === curr.y && next.y === curr.y) { return true; }
        if (this.isDiagonal(prev, curr, next)) { return true; }

        return false;
    }

    private isDiagonal(prev: Vector2, curr: Vector2, next: Vector2) {
        if (Math.sign(prev.x - curr.x) !== Math.sign(curr.x - next.x)) { return false; }
        if (Math.sign(prev.y - curr.y) !== Math.sign(curr.y - next.y)) { return false; }

        if (Math.abs(prev.x - curr.x) !== Math.abs(prev.y - curr.y)) { return false; }
        if (Math.abs(curr.x - next.x) !== Math.abs(curr.y - next.y)) { return false; }
        
        return true;
    }
}