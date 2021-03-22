import { QuarterMap } from "../district/QuarterMap";
import { GameObj } from "./GameObj";
import { DistrictObj } from "./DistrictObj";
import { Mesh, Vector2 } from "babylonjs";
import { Rect } from "../Rect";

export class QuarterObj  {
    private map: QuarterMap;
    private district: DistrictObj;
    readonly mesh: Mesh;

    constructor(district: DistrictObj, mesh: Mesh) {
        this.district = district;
        this.mesh = mesh;

        const b = this.getBounds2D();
        this.map = new QuarterMap(b.tl, b.br, 0.5)
    }

    getAllGameObjects(): GameObj[] {
        return this.district.activeComp.getAllGameObjects().filter(obj => obj.getQuarter() === this);
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
        const boundingBox = this.mesh.getBoundingInfo().boundingBox;
        const [minX, minZ] = [boundingBox.minimumWorld.x, boundingBox.minimumWorld.z];
        const [maxX, maxZ] = [boundingBox.maximumWorld.x, boundingBox.maximumWorld.z];

        return new Rect(new Vector2(minX, maxZ), new Vector2(maxX, minZ));
    }
}