

export class GUIEvents {
    private gameObjectCreatedCallbacks: (() => void)[] = [];

    onGameObjectCreated(callback: () => void) {
        this.gameObjectCreatedCallbacks.push(callback);
    }

    removeonGameObjectCreated(callback: () => void) {
        this.gameObjectCreatedCallbacks = this.gameObjectCreatedCallbacks.filter(cb => cb !== callback);
    }

    emitonGameObjectCreated() {
        this.gameObjectCreatedCallbacks.forEach(callback => callback());
    }
}

export class EventService {
    private mapLoadedFuncs: Function[] = [];

    guiEvents: GUIEvents;

    constructor() {
        this.guiEvents = new GUIEvents();
    }

    onMapLoaded(func: () => void) {
        this.mapLoadedFuncs.push(func);
    }

    emitMapLoaded() {
        this.mapLoadedFuncs.forEach(func => func());
    }
}