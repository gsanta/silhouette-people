

export interface LockedFeature {
    enableFeature(): void;
    disableFeature(): void;
    update(deltaTime: number);
}