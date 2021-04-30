import { Vector2, Vector3 } from "babylonjs";
import { GameObjectJson, MeshObjType } from "../../model/general/objs/MeshObj";
import { toStrVector } from "../../model/general/factories/AbstractPropertyParser";
import { WorldJson } from "./WorldJson";

export class WorldMapParser {
    static CONVERSION_RATIO = 2;
    private mapRows: number;
    private mapCols: number;
    private districtJson: WorldJson;
    private mapLines: string[];

    private size: Vector2;
    private jsons: GameObjectJson[];
    private quartersX: number;
    private quartersY: number;

    getSize(): Vector2 {
        return this.size;
    }

    getGameObjJsons(): GameObjectJson[] {
        return this.jsons;
    }

    getQuarterNum(): Vector2 {
        return new Vector2(this.quartersX, this.quartersY);
    }

    parse(json: WorldJson): void {
        this.districtJson = json;

        this.setMapLines(json.map);

        this.mapRows = this.mapLines.length;
        this.mapCols = this.mapLines[0].length;

        json.size = `${this.mapCols * 2}:${this.mapRows * 2}`;

        const jsons: GameObjectJson[] = [];
        
        for (let i = 0; i < this.mapRows; i++) {
            for (let j = 0; j < this.mapCols; j++) {
                const json = this.createGameObject(j, i);
                if (json) {
                    jsons.push(json);
                }
            }
        }

        this.size = new Vector2(this.mapCols * 2, this.mapRows * 2);
        this.jsons = jsons;
    }

    private setMapLines(map: string) {
        map = map.trim();

        const firstLineRegex = /^.*$/m;
        const firstLineMatch = map.match(firstLineRegex);

        this.quartersX = firstLineMatch[0].split(' ').length;
        this.quartersY = map.split('\n').filter(line => line.trim() === '').length + 1;
        
        map = map.split(' ').join('')
        
        const lines = map.split("\n").map(line => line.trim()).filter(line => line !== '');

        this.mapLines = lines;
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
        const halfCols = this.mapCols / 2 * WorldMapParser.CONVERSION_RATIO;
        const halfRows = this.mapRows / 2 * WorldMapParser.CONVERSION_RATIO;

        const posX = x * WorldMapParser.CONVERSION_RATIO - halfCols;
        const posY = -(y * WorldMapParser.CONVERSION_RATIO - halfRows);
        const pos = new Vector3(posX, 0, posY);

        const typeFeatures = this.districtJson.features[type] || [];
        const charFeatures = this.districtJson.features[char] || [];
        const features = [...typeFeatures, ...charFeatures];
        features.splice(1, 0, `Position ${toStrVector(pos)}`);

        return {
            position: new Vector3(posX, 0, posY),
            type: <MeshObjType> type,
            ch: char,
            features: features
        };
    }
}

function isNumeric(num: any){
    return !isNaN(num);
}