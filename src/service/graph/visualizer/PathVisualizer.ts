import { Mesh } from "babylonjs";
import { GraphEdge } from "../GraphEdge";

export type getMaterialFunc = (edge: GraphEdge) => string;

export enum PathVisualizerType {
    LINE_PATH = 'LINE_PATH',
    CURVED_PATH = 'CURVED_PATH'
}

export interface PathVisualizer {
    create(edge: GraphEdge, updatable: boolean, getMaterial: getMaterialFunc): Mesh;
    update(edge: GraphEdge): void;
}