import { Vector3 } from "babylonjs";
import { GameObjectJson, GameObjectType } from "../../model/objs/GameObj";
import { DistrictJson } from "./DistrictJson";

export class QuarterMapParser {
    private static CONVERSION_RATIO = 2;
    private mapRows: number;
    private mapCols: number;
    private districtJson: DistrictJson;
    private mapLines: string[];
    private rotMapLines: string[];

    parse(json: DistrictJson): GameObjectJson[] {
        this.districtJson = json;

        this.mapLines = this.getMapLines(json.map);
        this.rotMapLines = this.getMapLines(json.rotationMap);

        this.mapRows = this.mapLines.length;
        this.mapCols = this.mapLines[0].length;

        const jsons: GameObjectJson[] = [];
        
        for (let i = 0; i < this.mapRows; i++) {
            for (let j = 0; j < this.mapCols; j++) {
                const json = this.createGameObject(j, i);
                if (json) {
                    jsons.push(json);
                }
            }
        }

        return jsons;
    }

    private getMapLines(map: string) {
        map = map.split(' ').join('')
        const lines = map.split("\n").map(line => line.trim()).filter(line => line !== '');

        return lines;
    }

    private createGameObject(x: number, y: number): GameObjectJson {
        if (this.mapLines[y][x] === '.') { return undefined }

        const char = this.mapLines[y][x];
        const rotationChar = this.rotMapLines[y][x];

        let rotation = 0;
        if (rotationChar !== '.') {
            rotation = parseInt(rotationChar, 10) * Math.PI / 4;
        }

        const type = this.districtJson.charToType[char];
        const halfCols = this.mapCols / 2 * QuarterMapParser.CONVERSION_RATIO;
        const halfRows = this.mapRows / 2 * QuarterMapParser.CONVERSION_RATIO;

        const posX = x * QuarterMapParser.CONVERSION_RATIO - halfCols;
        const posY = -(y * QuarterMapParser.CONVERSION_RATIO - halfRows);

        return {
            position: new Vector3(posX, 0, posY),
            type: <GameObjectType> type,
            modelPath: this.districtJson.models[type],
            texturePath: this.districtJson.textures[type],
            textureMeshIndex: this.districtJson.textureMeshIndex[type] || 0,
            colliderSize: parseStrVector(this.districtJson.colliderSizes[type]),
            rotation: rotation
        };
    }
}

function parseStrVector(vec: string): Vector3 {
    if (!vec) { return undefined; }
    
    const [x, y, z] = vec.split(':').map(str => parseFloat(str));
    return new Vector3(x, y, z);
}