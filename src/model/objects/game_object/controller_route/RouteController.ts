import { Vector3 } from "babylonjs";
import { GraphEdge } from "../../../../service/graph/GraphEdge";
import { GraphVertex } from "../../../../service/graph/GraphImpl";
import { GameObject } from "../GameObject";
import { RouteItem } from "../../route/RouteItem";
import { MonoBehaviour } from "../../../behaviours/MonoBehaviour";

export interface RouteController extends MonoBehaviour {
    update(deltaTime: number): boolean;

    getT(): number;
    setT(ratio: number): void;

    getRoute(): RouteItem;
    setRoute(route: RouteItem): void;
    getCharacter(): GameObject;

    getPos(): Vector3;
    getPrevPos(): Vector3;
    
    getEdge(): GraphEdge;
    setEdge(edge: GraphEdge): void;
    getTarget(): GraphVertex;
    getSource(): GraphVertex;
    
    reverseRoute(): void;

    setStarted(isStarted: boolean): void;
    isStarted(): boolean;
    isRunning(): boolean;
}