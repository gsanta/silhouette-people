import { Mesh, Vector2 } from "babylonjs";
import { Vector3 } from "babylonjs/Maths/math.vector";
import { InjectProperty } from "../../../di/diDecorators";
import { lookup } from "../../../service/Lookup";
import { WorldProvider } from "../../../service/object/world/WorldProvider";
import { QuarterMap } from "./QuarterMap";
import { Rect } from "../../shape/Rect";

export class QuarterObj  {
    id: string;
    index: number;
    readonly mesh: Mesh;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    private map: QuarterMap;

    constructor(id: string, mesh: Mesh) {
        this.worldProvider = lookup.worldProvider;
        this.mesh = mesh;
        this.id = id;

        const b = this.getBounds2D();
        this.map = new QuarterMap(b.min, b.max, 0.5);
    }

    getMap() {
        return this.map;
    }

    containsPoint2D(point: Vector2) {
        const {min, max} = this.getBounds2D();

        if (point.x >= min.x && point.x <= max.x && point.y >= min.y && point.y <= max.y) {
            return true;
        }
        return false;
    }

    getBounds2D(): Rect {
        const boundingBox = this.mesh.getBoundingInfo().boundingBox;
        const [minX, minZ] = [boundingBox.minimumWorld.x, boundingBox.minimumWorld.z];
        const [maxX, maxZ] = [boundingBox.maximumWorld.x, boundingBox.maximumWorld.z];

        return new Rect(new Vector2(minX, minZ), new Vector2(maxX, maxZ));
    }

    getPosition2D(): Vector2 {
        const pos = this.mesh.getAbsolutePosition();
        return new Vector2(pos.x, pos.z);
    }

    getPosition(): Vector3 {
        return this.mesh.getAbsolutePosition();
    }

    getQuarterPosition(): Vector2 {
        const quarterCols = this.worldProvider.quarterNum.x;
        const y = Math.floor(this.index / quarterCols);
        const x = this.index % quarterCols;
        return new Vector2(x, y);
    }

    getSize(): Vector2 {
        const bounds = this.getBounds2D();
        return new Vector2(bounds.getWidth(), bounds.getHeight());
    }
}