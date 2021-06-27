import { Mesh } from "babylonjs/Meshes/mesh";
import { toVector2 } from "../../helpers";
import { Rotation } from "../../model/math/Rotation";
import { Line } from "../../model/math/shapes/Line";
import { Quad } from "../../model/math/shapes/Quad";
import { EdgeDimensionCalc } from "../import/map/EdgeDimensionCalc";
import { GraphVertex } from "./GraphImpl";

export class GraphEdge {
    private _v1: GraphVertex;
    private _v2: GraphVertex;
    private _thickness: number = 0;
    dimensions: Quad;
    line: Line;
    mesh: Mesh;

    private _angle: Rotation;
    private _oppositeAngle: Rotation;

    constructor(v1: GraphVertex, v2: GraphVertex) {
        this._v1 = v1;
        this._v2 = v2;

        this.reCalc();
    }

    get v1(): GraphVertex {
        return this._v1;
    }

    set v1(vertex: GraphVertex) {
        this._v1 = vertex;
        this.reCalc();
    }

    get v2(): GraphVertex {
        return this._v2;
    }

    set v2(vertex: GraphVertex) {
        this._v2 = vertex;
        this.reCalc();
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

    get thickness() {
        return this._thickness;
    }

    set thickness(thickness: number) {
        this._thickness = thickness;
        this.dimensions = new EdgeDimensionCalc().calc(this);
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
        const oppisiteAngle = new Rotation(this._angle.rad + Math.PI).norm().rad;
        this._oppositeAngle = new Rotation(oppisiteAngle);
    }

    toString() {
        return `[ ${this.v1.toString()} : ${this.v2.toString()} ]`;
    }

    private reCalc() {
        this.line = new Line(toVector2(this.v1.p), toVector2(this.v2.p));
        this.setAngles();
        this.dimensions = new EdgeDimensionCalc().calc(this);
    }
}