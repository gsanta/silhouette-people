

export interface RouteExecutor {
    updateRoutes(deltaTime: number): void;
    startRoutes(): void;
}