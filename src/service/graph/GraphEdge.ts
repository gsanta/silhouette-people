import { Mesh } from "babylonjs/Meshes/mesh";
import { toVector2 } from "../../helpers";
import { LinePathShape } from "../../model/math/path/LinePathShape";
import { PathShape } from "../../model/math/path/PathShape";
import { Rotation } from "../../model/math/Rotation";
import { Line } from "../../model/math/shapes/Line";
import { Graph } from "./Graph";
import { GraphVertex } from "./GraphImpl";

export enum EdgeColor {
    RED = 'red',
    GREEN = 'green',
    GRAY = 'gray',
}

export enum EdgeDirection {
    V1_V2 = 'v1 to v2',
    V2_V1 = 'v2 to v1',
    UNDIRECTED = 'undirected'
}

export namespace EdgeDirection {

    export function getEnumDirection(edge: GraphEdge) {
        const direction = edge.direction;

        if (!direction) {
            return EdgeDirection.UNDIRECTED;
        } else if (direction[0] === edge.v1) {
            return EdgeDirection.V1_V2;
        } else {
            return EdgeDirection.V2_V1;
        }
    }

    export function getDirectionFromEnum(direction: EdgeDirection, edge: GraphEdge): [GraphVertex, GraphVertex] {
        if (direction === undefined || direction === EdgeDirection.UNDIRECTED) {
            return undefined;
        } else if (direction === EdgeDirection.V2_V1) {
            return [edge.v2, edge.v1];
        } else {
            return [edge.v1, edge.v1];
        }
    }
}

export class GraphEdge {
    static yPos = 0.05;
    private _v1: GraphVertex;
    private _v2: GraphVertex;
    private _thickness: number = 0;
    private _direction: [GraphVertex, GraphVertex];
    line: Line;
    mesh: Mesh;
    readonly yPos = 0.05;
    shape: PathShape;

    private _angle: Rotation;
    private _oppositeAngle: Rotation;
    private _graph: Graph<GraphVertex, GraphEdge>;

    private _color: EdgeColor = EdgeColor.GRAY;

    constructor(v1: GraphVertex, v2: GraphVertex, graph?: Graph<GraphVertex, GraphEdge>, thickness?: number, isDirected?: boolean) {
        this._v1 = v1;
        this._v2 = v2;
        this._graph = graph;
        this.thickness = thickness;

        this.shape = new LinePathShape([v1.p, v2.p], this.thickness);

        if (isDirected) {
            this.direction = [v1, v2];
        }

        this.reCalc();
    }

    set graph(graph: Graph<GraphVertex, GraphEdge>) {
        this._graph = graph;
    }

    get graph() {
        return this._graph;
    }

    get direction(): [GraphVertex, GraphVertex] {
        return this._direction;
    }

    isDirected() {
        return !this.graph.edgeBetween(this.v1, this.v2) || !this.graph.edgeBetween(this.v2, this.v1);
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
        if (this.shape) {
            this.shape.update(0, vertex.p);
        }
        this.reCalc();
    }

    get v2(): GraphVertex {
        return this._v2;
    }

    set v2(vertex: GraphVertex) {
        this._v2 = vertex;
        if (this.shape) {
            this.shape.update(this.shape.controlPoints.length - 1, vertex.p);
        }
        this.reCalc();
    }

    updateVertex(vertex: GraphVertex) {
        let index: number = undefined;
        if (this.v1 === vertex) {
            index = 0;
        } else if (this.v2 === vertex) {
            index = this.shape.controlPoints.length - 1;
        }

        if (index !== undefined) {
            if (this.shape) {
                this.shape.update(index, vertex.p);
            }
            this.reCalc();
        }
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
        this.reCalc();
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
        // if (this.shape) {
        //     this.shape.update([this.v1.p, this.v2.p]);
        // }
    }
}