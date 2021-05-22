import { MeshState } from "../mesh/MeshState";

export interface BikeStateInfo {
    isPedalling: boolean;
    isBreaking: boolean;
    gear: number;
    isPowerBrakeOn: boolean;
}

export abstract class BikeState extends MeshState {
    abstract updateInfo(bikeStateInfo: BikeStateInfo): void;
}