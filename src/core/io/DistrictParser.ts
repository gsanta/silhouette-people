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

    parse(json: DistrictJson): GameObjectJson[] {
        this.districtJson = json;

        this.mapLines = this.getMapLines(json.map);

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
        let char = this.mapLines[y][x];
        if (char === '.' || isNumeric(char)) { return undefined }

        x += 1;
        while(this.mapLines[y].length > x && isNumeric(this.mapLines[y][x])) {
            char = char + this.mapLines[y][x];
            x += 1;
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
            ch: char,
            features: features
        };
    }
}

function isNumeric(num: any){
    return !isNaN(num);
}