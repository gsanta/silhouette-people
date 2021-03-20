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
    private mapLines: string[];
    private rotMapLines: string[];

    constructor(world: World) {
        this.world = world;
    }

    async loadAndParse(levelJson: LevelJson): Promise<void> {
        this.levelJson = levelJson;

        let map = await this.fetchMap(levelJson.mapUrl);
        this.mapLines = this.getMapLines(map);
        let rotMap = await this.fetchMap(levelJson.rotationMapUrl);
        this.rotMapLines = this.getMapLines(rotMap);

        this.mapRows = this.mapLines.length;
        this.mapCols = this.mapLines[0].length;
        
        for (let i = 0; i < this.mapRows; i++) {
            for (let j = 0; j < this.mapCols; j++) {
                await this.createGameObject(j, i);
            }
        }
    }

    private getMapLines(map: string) {
        map = map.split(' ').join('')
        const lines = map.split("\n").map(line => line.trim()).filter(line => line !== '');

        return lines;
    }

    private async createGameObject(x: number, y: number) {
        if (this.mapLines[y][x] === '.') { return undefined }

        const char = this.mapLines[y][x];
        const rotationChar = this.rotMapLines[y][x];

        let rotation = 0;
        if (rotationChar !== '.') {
            rotation = parseInt(rotationChar, 10) * Math.PI / 4;
        }

        const type = this.levelJson.charToType[char];
        const halfCols = this.mapCols / 2 * MapParser.CONVERSION_RATIO;
        const halfRows = this.mapRows / 2 * MapParser.CONVERSION_RATIO;

        const posX = x * MapParser.CONVERSION_RATIO - halfCols;
        const posY = -(y * MapParser.CONVERSION_RATIO - halfRows);

        return await this.world.factory.create({
            position: new Vector3(posX, 0, posY),
            type: <GameObjectType> type,
            modelPath: this.levelJson.models[type],
            texturePath: this.levelJson.textures[type],
            textureMeshIndex: this.levelJson.textureMeshIndex[type] || 0,
            colliderSize: parseStrVector(this.levelJson.colliderSizes[type]),
            rotation: rotation
        });
    }

    private async fetchMap(name: string): Promise<string> {
        const response = await fetch(`assets/levels/${name}`);
        return await response.text();
    }
}

function parseStrVector(vec: string): Vector3 {
    if (!vec) { return undefined; }
    
    const [x, y, z] = vec.split(':').map(str => parseFloat(str));
    return new Vector3(x, y, z);
}