import { Mesh, Vector2 } from "babylonjs";
import { Vector3 } from "babylonjs/Maths/math.vector";
import { QuarterMap } from "../district/QuarterMap";
import { Rect } from "../Rect";
import { WorldObj } from "./WorldObj";
import { GameObj } from "./GameObj";
import { TilingComponent } from "./TilingComponent";
import { Lookup } from "../../services/Lookup";

export class QuarterObj  {
    id: string;
    private map: QuarterMap;
    private district: WorldObj;
    readonly mesh: Mesh;

    tiles: TilingComponent;

    constructor(id: string, district: WorldObj, mesh: Mesh, lookup: Lookup) {
        this.district = district;
        this.mesh = mesh;
        this.id = id;

        const b = this.getBounds2D();
        this.map = new QuarterMap(b.tl, b.br, 0.5);
        this.tiles = new TilingComponent(this, lookup);
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
        const boundingBox = this.mesh.getBoundingInfo().boundingBox;
        const [minX, minZ] = [boundingBox.minimumWorld.x, boundingBox.minimumWorld.z];
        const [maxX, maxZ] = [boundingBox.maximumWorld.x, boundingBox.maximumWorld.z];

        return new Rect(new Vector2(minX, maxZ), new Vector2(maxX, minZ));
    }

    getPosition2D(): Vector2 {
        const pos = this.mesh.getAbsolutePosition();
        return new Vector2(pos.x, pos.z);
    }

    getPosition(): Vector3 {
        return this.mesh.getAbsolutePosition();
    }

    getSize(): Vector2 {
        const bounds = this.getBounds2D();
        return new Vector2(bounds.getWidth(), bounds.getHeight());
    }
}