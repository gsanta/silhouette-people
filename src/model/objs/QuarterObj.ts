import { Mesh, Vector2 } from "babylonjs";
import { Vector3 } from "babylonjs/Maths/math.vector";
import { QuarterMap } from "../district/QuarterMap";
import { Rect } from "../Rect";
import { WorldObj } from "./WorldObj";
import { MeshObj } from "./MeshObj";
import { TilingComponent } from "./TilingComponent";
import { InjectProperty } from "../../di/diDecorators";
import { WorldProvider } from "../../services/WorldProvider";
import { lookup } from "../../services/Lookup";

export class QuarterObj  {
    id: string;
    index: number;
    tiles: TilingComponent;
    readonly mesh: Mesh;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    private map: QuarterMap;

    constructor(id: string, mesh: Mesh) {
        this.worldProvider = lookup.worldProvider;
        this.mesh = mesh;
        this.id = id;

        const b = this.getBounds2D();
        this.map = new QuarterMap(b.tl, b.br, 0.5);
        this.tiles = new TilingComponent(this);
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

    getQuarterPosition(): Vector2 {
        const quarterCols = this.worldProvider.world.quarterNum.x;
        const y = Math.floor(this.index / quarterCols);
        const x = this.index % quarterCols;
        return new Vector2(x, y);
    }

    getSize(): Vector2 {
        const bounds = this.getBounds2D();
        return new Vector2(bounds.getWidth(), bounds.getHeight());
    }
}