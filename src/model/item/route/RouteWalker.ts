import { Vector3 } from "babylonjs";
import { GraphEdge, GraphVertex } from "../../../service/graph/GraphImpl";
import { CharacterItem } from "../character/CharacterItem";
import { RouteItem } from "./RouteItem";

export interface RouteWalker {
    walk(deltaTime: number): boolean;

    getRoute(): RouteItem;
    setRoute(route: RouteItem): void;
    getCharacter(): CharacterItem;

    getPos(): Vector3;
    getPrevPos(): Vector3;
    
    getEdge(): GraphEdge;
    setEdge(edge: GraphEdge): void;
    getTarget(): GraphVertex;
    getSource(): GraphVertex;
    
    setReversed(isReversed: boolean): void;
    isReversed(): boolean;

    setStarted(isStarted: boolean): void;
    isStarted(): boolean;
    isRunning(): boolean;
}