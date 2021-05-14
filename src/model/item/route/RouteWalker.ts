import { Vector3 } from "babylonjs";
import { LockedFeature } from "./features/LockedFeature";

export interface RouteWalker {
    getCurrPos(): Vector3;
    getPrevPos(): Vector3;
    setDestPoint(currDestPoint: Vector3, prevDestPoint?: Vector3);
    getDestPoint(): Vector3;
    getPrevDestPoint(): Vector3;
    walk(deltaTime: number): boolean;
    addFeature(lockedFeature: LockedFeature);
    isFinished(): boolean;
    isStarted(): boolean;
    onFinished(func: () => void);
    setStarted();
    setFinished(isFinished);
}