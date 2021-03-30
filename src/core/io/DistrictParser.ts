import { Vector3 } from "babylonjs";
import { GameObjectJson, GameObjectType } from "../../model/objs/GameObj";
import { toStrVector } from "../factories/AbstractFactoryFeacture";
import { DistrictJson } from "./DistrictJson";

export class DistrictParser {
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
        const halfCols = this.mapCols / 2 * DistrictParser.CONVERSION_RATIO;
        const halfRows = this.mapRows / 2 * DistrictParser.CONVERSION_RATIO;

        const posX = x * DistrictParser.CONVERSION_RATIO - halfCols;
        const posY = -(y * DistrictParser.CONVERSION_RATIO - halfRows);
        const pos = new Vector3(posX, 0, posY);

        const typeFeatures = this.districtJson.features[type] || [];
        const charFeatures = this.districtJson.features[char] || [];
        const features = [...typeFeatures, ...charFeatures];
        features.splice(1, 0, `Position ${toStrVector(pos)}`);

        return {
            position: new Vector3(posX, 0, posY),
            type: <GameObjectType> type,
            // modelPath: this.districtJson.models[type],
            // texturePath: this.districtJson.textures[type],
            // textureMeshIndex: this.districtJson.textureMeshIndex[type] || 0,
            // collider:  typeof this.districtJson.collider[type] === 'string' ? parseStrVector(<string> this.districtJson.collider[type]) : <boolean> this.districtJson.collider[type],
            rotation: rotation,
            ch: char,
            features: features
            // addons: this.districtJson.addons[char]
        };
    }
}

function parseStrVector(vec: string): Vector3 {
    if (!vec) { return undefined; }
    
    const [x, y, z] = vec.split(':').map(str => parseFloat(str));
    return new Vector3(x, y, z);
}