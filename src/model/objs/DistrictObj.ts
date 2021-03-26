import { Vector2 } from "babylonjs";
import { GameObjectFactory } from "../../core/factories/GameObjectFactory";
import { DistrictJson } from "../../core/io/DistrictJson";
import { World } from "../../services/World";
import { ActiveDistrictComponent } from "./ActiveDistrictComponent";
import { BasicDistrictComponent } from "./BasicDistrictComponent";
import { DistrictActivatorComponent } from "./DistrictActivatorComponent";

export class DistrictObj {
    id: string;
    readonly json: DistrictJson;

    readonly size: Vector2;
    readonly translate: Vector2;

    readonly factory: GameObjectFactory;

    basicComp: BasicDistrictComponent;
    activeComp: ActiveDistrictComponent;
    activatorComp: DistrictActivatorComponent;

    constructor(json: DistrictJson, world: World) {
        const [width, height] = json.size.split(':').map(numStr => parseInt(numStr));
        this.size = new Vector2(width, height);
        const [relativeX, relativeY] = json.relativePos.split(':').map(numStr => parseInt(numStr));
        this.translate = new Vector2(relativeX * 120, relativeY * 120);

        this.json = json;
        this.id = json.id;
        
        this.factory = new GameObjectFactory(this, world); 
        this.basicComp = new BasicDistrictComponent();
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