import { Vector2 } from "babylonjs";
import { GameObj, GameObjTag } from "../../model/objs/GameObj";


export class MeshComponent {
    private gameObj: GameObj;

    constructor(gameObj: GameObj) {
        this.gameObj = gameObj;
    }

    distance(gameObj: GameObj): number {
        return Vector2.Distance(this.gameObj.getPosition2D(), gameObj.getPosition2D());
    }
}