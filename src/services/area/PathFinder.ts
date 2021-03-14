import { Vector2 } from "babylonjs";
import { astar, Graph } from 'javascript-astar';
import { AreaMap } from "../../model/area/AreaMap";
import { IPathFinder } from "./IPathFinder";

export class PathFinder implements IPathFinder {
    findPath(from: Vector2, to: Vector2, areaMap: AreaMap): Vector2[] {
        const graph = new Graph(this.convertGraph(areaMap), { diagonal: true });
        const startGrid = areaMap.getGridCoordinate(areaMap.getIndexAtWorldCoordinate(from));
        const endGrid = areaMap.getGridCoordinate(areaMap.getIndexAtWorldCoordinate(to));

        const start = graph.grid[startGrid[1]][startGrid[0]];
        const end = graph.grid[endGrid[1]][endGrid[0]];
        const result = astar.search(graph, start, end);

        return result.map(res => new Vector2(res.x, res.y));
    }

    private convertGraph(areaMap: AreaMap): number[][] {
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