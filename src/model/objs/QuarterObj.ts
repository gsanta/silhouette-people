import { Vector2 } from "babylonjs";
import { Vector3 } from "babylonjs/Maths/math.vector";
import { QuarterMap } from "../district/QuarterMap";
import { Rect } from "../Rect";
import { DistrictObj } from "./DistrictObj";
import { GameObj } from "./GameObj";

export class QuarterObj  {
    private map: QuarterMap;
    private district: DistrictObj;
    readonly groundObj: GameObj;

    constructor(district: DistrictObj, groundObj: GameObj) {
        this.district = district;
        this.groundObj = groundObj;

        const b = this.getBounds2D();
        this.map = new QuarterMap(b.tl, b.br, 0.5)
    }

    getAllGameObjects(): GameObj[] {
        return this.district.obj.getAllGameObjects().filter(obj => obj.getQuarter() === this);
    }

    getMap() {
        return this.map;
    }

    containsPoint2D(point: Vector2) {
        const b = this.getBounds2D();

        if (point.x >= b.tl.x && point.x <= b.br.x && point.y <= b.tl.y && point.y >= b.br.y) {
            return true;
        }
        return false;
    }

    getBounds2D(): Rect {
        const boundingBox = this.groundObj.getMesh().getBoundingInfo().boundingBox;
        const [minX, minZ] = [boundingBox.minimumWorld.x, boundingBox.minimumWorld.z];
        const [maxX, maxZ] = [boundingBox.maximumWorld.x, boundingBox.maximumWorld.z];

        return new Rect(new Vector2(minX, maxZ), new Vector2(maxX, minZ));
    }

    getPosition2D(): Vector2 {
        return this.groundObj.getPosition2D();
    }

    getPosition(): Vector3 {
        return this.groundObj.getPosition();
    }

    getSize(): Vector2 {
        const bounds = this.getBounds2D();
        return new Vector2(bounds.getWidth(), bounds.getHeight());
    }
}