import { Vector2 } from "babylonjs";
import { GameObjectFactory } from "../../services/factory/GameObjectFactory";
import { DistrictJson } from "../../services/district/DistrictJson";
import { World } from "../../services/World";
import { BasicDistrictComponent } from "./BasicDistrictComponent";
import { GameObjStore } from "../../stores/GameObjStore";
import { QuarterStore } from "../../stores/QuarterStore";

export class DistrictObj {
    id: string;
    readonly json: DistrictJson;

    cameraLocation: number;

    readonly size: Vector2;
    readonly centerPoint: Vector2;
    readonly factory: GameObjectFactory;

    basicComp: BasicDistrictComponent;
    // activeComp: ActiveDistrictComponent;
    obj: GameObjStore;
    quarter: QuarterStore;

    private _isActiveDistrict: boolean = false;

    constructor(json: DistrictJson, world: World) {
        const [width, height] = json.size.split(':').map(numStr => parseInt(numStr));
        this.size = new Vector2(width, height);
        const [relativeX, relativeY] = json.relativePos.split(':').map(numStr => parseInt(numStr));
        this.centerPoint = new Vector2(relativeX * 100, relativeY * 100);

        this.json = json;
        this.id = json.id;
        this.cameraLocation = json.cameraLocation;
        
        this.factory = new GameObjectFactory(this, world); 
        this.basicComp = new BasicDistrictComponent();

        this.obj = new GameObjStore();
        this.quarter = new QuarterStore();
    }

    isActiveDistrict() {
        return this._isActiveDistrict;
    }

    setActiveDistrict(isActive: boolean) {
        this._isActiveDistrict = isActive;
    }
}