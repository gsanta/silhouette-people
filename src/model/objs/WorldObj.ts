import { Vector2 } from "babylonjs";
import { GameObjectFactory } from "../../services/factory/GameObjectFactory";
import { WorldJson } from "../../services/district/WorldJson";
import { Lookup } from "../../services/Lookup";
import { BasicDistrictComponent } from "./BasicDistrictComponent";
import { GameObjStore } from "../../stores/GameObjStore";
import { QuarterStore } from "../../stores/QuarterStore";

export class WorldObj {
    cameraLocation: number;

    readonly size: Vector2;
    readonly quarterNum: Vector2;
    readonly quarterSize: Vector2 = new Vector2(50, 50);
    readonly factory: GameObjectFactory;

    basicComp: BasicDistrictComponent;
    obj: GameObjStore;
    quarter: QuarterStore;

    private _isActiveDistrict: boolean = false;

    constructor(worldSize: Vector2, cameraLocation: number, quarterNum: Vector2, lookup: Lookup) {
        this.size = worldSize;
        this.cameraLocation = cameraLocation;
        this.quarterNum = quarterNum;
        
        this.factory = new GameObjectFactory(this, lookup); 
        this.basicComp = new BasicDistrictComponent();

        this.obj = new GameObjStore(this);
        this.quarter = new QuarterStore();
    }

    isActiveDistrict() {
        return this._isActiveDistrict;
    }

    setActiveDistrict(isActive: boolean) {
        this._isActiveDistrict = isActive;
    }
}