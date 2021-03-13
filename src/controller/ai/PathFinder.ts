import { AiFacade } from "./AiFacade";
import { astar, Graph } from 'javascript-astar';
import { Vector2, Vector3 } from "babylonjs";

export class PathFinder {
    private aiFacade: AiFacade;

    constructor(aiFacade: AiFacade) {
        this.aiFacade = aiFacade;
    }

    findPath(from: Vector2, to: Vector2): Vector2[] {
        const areaMap = this.aiFacade.areaMap;

        var graph = new Graph(this.convertGraph(), { diagonal: false });
        const startGrid = areaMap.getGridCoordinate(areaMap.getIndexAtWorldCoordinate(from));
        const endGrid = areaMap.getGridCoordinate(areaMap.getIndexAtWorldCoordinate(to));

        var start = graph.grid[startGrid[1]][startGrid[0]];
        var end = graph.grid[endGrid[1]][endGrid[0]];
        var result = astar.search(graph, start, end);

        const points = result.map(grid => areaMap.getWorldCoordinate(areaMap.getIndexAtGridCoordinate(grid.x, grid.y)));
        return points;
    }

    private convertGraph(): number[][] {
        const areaMap = this.aiFacade.areaMap;

        let str = ''

        const arr: number[][] = [];

        for (let i = 0; i < areaMap.rows; i++) {
            arr.push([]);
            str += '\n';
            for (let j = 0; j < areaMap.columns; j++) {
                const index = areaMap.getIndexAtGridCoordinate(j, i);
                arr[i][j] = areaMap.getNum(index);
                str += arr[i][j]
            }
        }

        return arr;
    }
}