import { Vector2 } from "babylonjs";
import { astar, Graph } from 'javascript-astar';
import { QuarterMap } from "../../../model/district/QuarterMap";
import { IPathFinder } from "./IPathFinder";

export class PathFinder implements IPathFinder {
    findPath(from: Vector2, to: Vector2, areaMap: QuarterMap): Vector2[] {
        const graph = new Graph(this.convertGraph(areaMap), { diagonal: true });
        const startGrid = areaMap.getGridCoordinate(areaMap.getIndexAtWorldCoordinate(from));
        const endGrid = areaMap.getGridCoordinate(areaMap.getIndexAtWorldCoordinate(to));

        const start = graph.grid[startGrid.x][startGrid.y];
        const end = graph.grid[endGrid.y][endGrid.y];
        const result = astar.search(graph, start, end);

        return result.map(res => new Vector2(res.x, res.y));
    }

    private convertGraph(areaMap: QuarterMap): number[][] {
        const arr: number[][] = [];

        for (let i = 0; i < areaMap.columns; i++) {
            arr.push([]);
            for (let j = 0; j < areaMap.rows; j++) {
                const index = areaMap.getIndexAtGridCoordinate(i, j);
                arr[i][j] = areaMap.getNum(index) === 1 ? 0 : 1;
            }
        }

        return arr;
    }
}