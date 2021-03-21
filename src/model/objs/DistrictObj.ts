import { Vector2 } from "babylonjs";
import { DistrictJson } from "../../core/io/DistrictJson";
import { World } from "../World";
import { ActiveDistrictComponent } from "./ActiveDistrictComponent";
import { DistrictActivatorComponent } from "./DistrictActivatorComponent";
import { GameObj } from "./GameObj";
import { QuarterObj } from "./QuarterObj";

export class DistrictObj {
    id: string;
    readonly json: DistrictJson;
    private gameObjects: GameObj[] = [];
    private quarters: QuarterObj[] = [];

    readonly size: Vector2;

    activeComp: ActiveDistrictComponent;
    activatorComp: DistrictActivatorComponent;

    constructor(json: DistrictJson, world: World) {
        const [width, height] = json.size.split(':').map(numStr => parseInt(numStr));
        this.size = new Vector2(width, height);
        this.json = json;
        this.id = json.id;

        this.activatorComp = new DistrictActivatorComponent(this, world);
        // this.gameObjects = gameObjects;
        
        // this.quarters.push(
        //     new QuarterObj(this),
        //     new QuarterObj(this),
        //     new QuarterObj(this),
        //     new QuarterObj(this),
        // );
        
        // this.gameObjects.forEach(obj => this.addGameObject(obj));

        // this.quarters[1].setMap(new QuarterMap(new Vector2(0, 0), new Vector2(50, -50), 0.5));
    }

    // getQuarter(index: number): QuarterObj {
    //     return this.quarters[index];
    // }

    // addGameObject(gameObject: GameObj) {
    //     this.gameObjects.push(gameObject);

    //     const quarterIndex = this.calcQuarterIndex(gameObject);
    //     gameObject.location.setDistrict(this);
    //     gameObject.location.setQuarter(this.getQuarter(quarterIndex));
    // }

    // getGameObjectByRole(role: GameObjectRole): GameObj[] {
    //     return this.gameObjects.filter(gameObject => gameObject.role === role);
    // }

    // getAllGameObjects(): GameObj[] {
    //     return this.gameObjects;
    // }

    // private calcQuarterIndex(gameObject: GameObj): number {
    //     const pos = gameObject.getPosition2D()

    //     if (pos.x < 0) {
    //         if (pos.y < 0) {
    //             return 2;
    //         } else {
    //             return 3;
    //         }
    //     } else {
    //         if (pos.y < 0) {
    //             return 1;
    //         } else {
    //             return 0;
    //         }
    //     }
    // }
}