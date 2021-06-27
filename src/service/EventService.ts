import { GameObject } from "../model/objects/game_object/GameObject";


export class GUIEvents {
    private gameObjectCreatedCallbacks: (() => void)[] = [];
    private gameObjectSelectedCallbacks: ((gameObject: GameObject) => void)[] = [];
    private gameObjectDeletedCallbacks: (() => void)[] = [];

    onGameObjectCreated(callback: () => void) {
        this.gameObjectCreatedCallbacks.push(callback);
    }

    removeGameObjectCreated(callback: () => void) {
        this.gameObjectCreatedCallbacks = this.gameObjectCreatedCallbacks.filter(cb => cb !== callback);
    }

    emitGameObjectCreated() {
        this.gameObjectCreatedCallbacks.forEach(callback => callback());
    }

    onGameObjectSelected(callback: (gameObject: GameObject) => void) {
        this.gameObjectSelectedCallbacks.push(callback);
    }

    removeGameObjectSelected(callback: (gameObject: GameObject) => void) {
        this.gameObjectSelectedCallbacks = this.gameObjectSelectedCallbacks.filter(cb => cb !== callback);
    }

    emitGameObjectSelected(gameObject: GameObject) {
        this.gameObjectSelectedCallbacks.forEach(callback => callback(gameObject));
    }

    onGameObjectDeleted(callback: () => void) {
        this.gameObjectDeletedCallbacks.push(callback);
    }

    removeGameObjectDeleted(callback: () => void) {
        this.gameObjectDeletedCallbacks = this.gameObjectDeletedCallbacks.filter(cb => cb !== callback);
    }

    emitGameObjectDeleted() {
        this.gameObjectDeletedCallbacks.forEach(callback => callback());
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