import { Vector3 } from "babylonjs";
import { GameObjectType } from "../../model/game_object/GameObject";
import { World } from "../../model/World";
import { LevelJson } from "./ImportService";

export class MapParser {
    private static CONVERSION_RATIO = 2;
    private world: World;

    private mapRows: number;
    private mapCols: number;
    private levelJson: LevelJson;

    constructor(world: World) {
        this.world = world;
    }

    async loadAndParse(levelJson: LevelJson): Promise<void> {
        this.levelJson = levelJson;

        let map = await this.fetchMap();
        const lines = this.getMapLines(map);
        
        this.mapRows = lines.length;
        this.mapCols = lines[0].length;
        
        for (let i = 0; i < lines.length; i++) {
            for (let j = 0; j < lines.length; j++) {
                if (lines[i][j] !== '.') {
                    await this.createGameObject(lines[i][j], j, i);
                }
            }
        }
    }

    private getMapLines(map: string) {
        map = map.split(' ').join('')
        const lines = map.split("\n").map(line => line.trim()).filter(line => line !== '');

        return lines;
    }

    private async createGameObject(char: string, x: number, y: number) {        
        const type = this.levelJson.charToType[char];
        const halfCols = this.mapCols / 2 * MapParser.CONVERSION_RATIO;
        const halfRows = this.mapRows / 2 * MapParser.CONVERSION_RATIO;

        const posX = x * MapParser.CONVERSION_RATIO - halfCols;
        const posY = -(y * MapParser.CONVERSION_RATIO - halfRows);

        return await this.world.factory.create({
            position: new Vector3(posX, 0, posY),
            type: <GameObjectType> type,
            modelPath: this.levelJson.typeToModel[type],
            colliderSize: parseStrVector(this.levelJson.colliderSizes[type]),
        });
    }

    private async fetchMap(): Promise<string> {
        const response = await fetch(`assets/levels/${this.levelJson.mapUrl}`);
        return await response.text();
    }
}

function parseStrVector(vec: string): Vector3 {
    const [x, y, z] = vec.split(':').map(str => parseFloat(str));
    return new Vector3(x, y, z);
}