import { toVector2, vector3ToRotation } from "../../helpers";
import { Rotation } from "../../model/math/Rotation";
import { Quad } from "../../model/math/shapes/Quad";
import { GraphVertex } from "./GraphImpl";

export class GraphEdge {
    readonly v1: GraphVertex;
    readonly v2: GraphVertex;
    thickness: number = 0;
    dimensions: Quad;

    private _angle: Rotation;
    private _oppositeAngle: Rotation;

    constructor(v1: GraphVertex, v2: GraphVertex) {
        this.v1 = v1;
        this.v2 = v2;

        this.setAngles();
    }

    hasVertex(v: GraphVertex) {
        return this.v1 === v || this.v2 === v;
    }

    getOtherVertex(v: GraphVertex) {
        if (v === this.v1) {
            return this.v2;
        } else if (v === this.v2) {
            return this.v1;
        }

        return undefined;
    }

    get angle(): Rotation {
        return this._angle;
    }

    get oppositeAngle(): Rotation {
        return this._oppositeAngle;
    }

    getSource(isReversed = false): GraphVertex {
        return isReversed ? this.v2 : this.v1;
    }

    getTraget(isReversed = false): GraphVertex {
        return isReversed ? this.v1 : this.v2;
    }

    private setAngles(): void {
        this._angle = Rotation.FromVectors(toVector2(this.v1.p), toVector2(this.v2.p));
        const oppisiteAngle = new Rotation(this._angle.rad + Math.PI).norm(); 
        this._oppositeAngle = new Rotation(oppisiteAngle);
    }

    toString() {
        return `[ ${this.v1.toString()} : ${this.v2.toString()} ]`;
    }
}