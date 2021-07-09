import { Vector3 } from "babylonjs/Maths/math.vector";
import { GraphEdge } from "../../../../service/graph/GraphEdge";
import { RouteItem } from "../../route/RouteItem";
import { RouteController } from "./RouteController";
import { GameObject } from "../GameObject";
import { MonoBehaviour } from "../../../behaviours/MonoBehaviour";
import { MonoBehaviourName } from "../../../behaviours/MonoBehaviourName";

export class RouteControllerImpl extends MonoBehaviour implements RouteController {
    private readonly character: GameObject;
    private route: RouteItem;

    private prevPos: Vector3;
    private currPos: Vector3;

    private edge: GraphEdge;
    private t: number;

    private started = false;

    constructor(route: RouteItem, character: GameObject) {
        super(MonoBehaviourName.ROUTE_CONTROLLER);
        this.route = route;
        this.character = character;
        this.edge = route.firstEdge;
    }

    getT(): number {
        return this.t;
    }

    setT(t: number) {
        this.t = t > 1 ? 1 : t;
    }

    getRoute(): RouteItem {
        return this.route;
    }

    setRoute(route: RouteItem): void {
        this.route = route;
    }

    getCharacter(): GameObject {
        return this.character;
    }

    getPos(): Vector3 {
        return this.currPos;
    }

    getPrevPos(): Vector3 {
        return this.prevPos;
    }

    getEdge(): GraphEdge {
        return this.edge;
    }

    setEdge(edge: GraphEdge): void {
        this.edge = edge;
        this.t = 0;
    }

    getTarget() {
        return this.edge && this.edge.getTraget(this.route.isReversed(this.edge));
    }

    getSource() {
        return this.edge && this.edge.getSource(this.route.isReversed(this.edge));
    }

    update(): boolean {
        if (this.started && this.edge) {
            this.prevPos = this.currPos;
            this.currPos = this.character.position;
            return true;
        }
        return false;
    }

    reverseRoute() {
        this.route = this.route.reverse();

        if (!this.edge) {
            this.edge = this.route.getEdges()[0];
        }
    }

    setStarted(isStarted: boolean): void {
        this.started = isStarted;
    }

    isStarted(): boolean {
        return this.started;
    }

    isRunning(): boolean {
        return this.isStarted() && this.edge !== undefined;
    }
}