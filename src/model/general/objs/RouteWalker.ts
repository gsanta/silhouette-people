
export interface RouteWalker {
    step(deltaTime: number): void;
    isAtCheckPoint(): boolean;
    isFinished(): boolean;
}