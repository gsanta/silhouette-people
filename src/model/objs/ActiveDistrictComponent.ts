import { DistrictObj } from "./DistrictObj";
import { GameObj, GameObjTag } from "./GameObj";
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

    getGameObjsByTag(tag: GameObjTag): GameObj[] {
        return this.gameObjects.filter(gameObj => gameObj.tags.has(tag));
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