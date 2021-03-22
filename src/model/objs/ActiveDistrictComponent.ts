import { Axis, Vector2 } from "babylonjs";
import { QuarterMap } from "../district/QuarterMap";
import { DistrictObj } from "./DistrictObj";
import { GameObj, GameObjectRole } from "./GameObj";
import { QuarterObj } from "./QuarterObj";


export class ActiveDistrictComponent {
    private gameObjects: GameObj[] = [];
    private quarters: QuarterObj[] = [];
    private district: DistrictObj;

    constructor(district: DistrictObj) {
        this.district = district;
        this.district.activeComp = this;
    }

    addQuarter(quarterObj: QuarterObj) {
        this.quarters.push(quarterObj);
    }

    getQuarter(index: number): QuarterObj {
        return this.quarters[index];
    }

    addGameObject(gameObject: GameObj) {
        this.gameObjects.push(gameObject);

        const quarterIndex = this.calcQuarterIndex(gameObject);
        gameObject.district = this.district;
        gameObject.quarterIndex = quarterIndex;
    }

    getGameObjectByRole(role: GameObjectRole): GameObj[] {
        return this.gameObjects.filter(gameObject => gameObject.role === role);
    }

    getAllGameObjects(): GameObj[] {
        return this.gameObjects;
    }

    private calcQuarterIndex(gameObject: GameObj): number {
        const pos = gameObject.getPosition2D();

        const quarterIndex = this.quarters.findIndex(quarter => quarter.containsPoint2D(pos));
        return quarterIndex;
        // if (pos.x < 0) {
        //     if (pos.y < 0) {
        //         return 2;
        //     } else {
        //         return 3;
        //     }
        // } else {
        //     if (pos.y < 0) {
        //         return 1;
        //     } else {
        //         return 0;
        //     }
        // }
    }
}