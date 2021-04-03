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

    cameraLocation: number;

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
        this.translate = new Vector2(relativeX * 100, relativeY * 100);

        this.json = json;
        this.id = json.id;
        this.cameraLocation = json.cameraLocation;
        
        this.factory = new GameObjectFactory(this, world); 
        this.basicComp = new BasicDistrictComponent();
        this.activatorComp = new DistrictActivatorComponent(this, world);
    }
}