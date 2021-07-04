import { Mesh } from "babylonjs/Meshes/mesh";
import { toVector2 } from "../../helpers";
import { Rotation } from "../../model/math/Rotation";
import { Line } from "../../model/math/shapes/Line";
import { Quad } from "../../model/math/shapes/Quad";
import { EdgeDimensionCalc } from "../import/map/EdgeDimensionCalc";
import { Graph } from "./Graph";
import { GraphVertex } from "./GraphImpl";

export enum EdgeColor {
    RED = 'red',
    GREEN = 'green',
    GRAY = 'gray'
}

export class GraphEdge {
    private _v1: GraphVertex;
    private _v2: GraphVertex;
    private _thickness: number = 0;
    private _direction: [GraphVertex, GraphVertex];
    dimensions: Quad;
    line: Line;
    mesh: Mesh;
    readonly yPos = 0.2;

    private _angle: Rotation;
    private _oppositeAngle: Rotation;
    private _graph: Graph<GraphVertex, GraphEdge>;

    private _color: EdgeColor = EdgeColor.GRAY;

    constructor(v1: GraphVertex, v2: GraphVertex, graph?: Graph<GraphVertex, GraphEdge>, thickness?: number, isDirected?: boolean) {
        this._v1 = v1;
        this._v2 = v2;
        this._graph = graph;
        this.thickness = thickness;

        if (isDirected) {
            this.direction = [v1, v2];
        }

        this.reCalc();
    }

    set graph(graph: Graph<GraphVertex, GraphEdge>) {
        this._graph = graph;
    }

    get direction(): [GraphVertex, GraphVertex] {
        return this._direction;
    }

    set direction(vertices: [GraphVertex, GraphVertex]) {
        if (vertices) {
            const [v1, v2] = vertices;
            if (!this.hasVertex(v1)) { throw new Error(`${v1.toString()} is not a vertex of this edge`); }
            if (!this.hasVertex(v2)) { throw new Error(`${v2.toString()} is not a vertex of this edge`); }

            this._direction = vertices;
        } else {
            this._direction = undefined;
        }

        this.reCalc();

        if (this._graph) { this._graph.updateDirection(this);}
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

    set color(color: EdgeColor) {
        this._color = color;
    }

    get color(): EdgeColor {
        return this._color;
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