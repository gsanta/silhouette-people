import { Vector2 } from "babylonjs";
import { QuarterMap } from "../district/QuarterMap";
import { GameObj, GameObjectRole } from "./GameObj";
import { QuarterObj } from "./QuarterObj";

export class DistrictObj {
    id: string
    private gameObjects: GameObj[] = [];
    private quarters: QuarterObj[] = [];

    readonly size: Vector2;

    constructor(size: Vector2, gameObjects: GameObj[]) {
        this.size = size;
        this.gameObjects = gameObjects;
        
        this.quarters.push(
            new QuarterObj(this),
            new QuarterObj(this),
            new QuarterObj(this),
            new QuarterObj(this),
        );
        
        this.gameObjects.forEach(obj => this.addGameObject(obj));

        this.quarters[1].setMap(new QuarterMap(new Vector2(0, 0), new Vector2(50, -50), 0.5));
    }

    getQuarter(index: number): QuarterObj {
        return this.quarters[index];
    }

    addGameObject(gameObject: GameObj) {
        this.gameObjects.push(gameObject);

        const quarterIndex = this.calcQuarterIndex(gameObject);
        gameObject.location.setDistrict(this);
        gameObject.location.setQuarter(this.getQuarter(quarterIndex));
    }

    getGameObjectByRole(role: GameObjectRole): GameObj[] {
        return this.gameObjects.filter(gameObject => gameObject.role === role);
    }

    getAllGameObjects(): GameObj[] {
        return this.gameObjects;
    }

    private calcQuarterIndex(gameObject: GameObj): number {
        const pos = gameObject.getPosition2D()

        if (pos.x < 0) {
            if (pos.y < 0) {
                return 2;
            } else {
                return 3;
            }
        } else {
            if (pos.y < 0) {
                return 1;
            } else {
                return 0;
            }
        }
    }
}