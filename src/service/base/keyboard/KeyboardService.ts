import { KeyChecker } from "./KeyChecker";

export interface KeyboardListener {
    onKeyDown(e: KeyboardEvent): void;
    onKeyUp(e: KeyboardEvent): void;
}

export class KeyboardService {
    activeKeys: Set<string> = new Set();
    checker: KeyChecker;

    private listeners: KeyboardListener[] = [];

    constructor() {
        this.checker = new KeyChecker(this);
    }

    addListener(l: KeyboardListener) {
        this.listeners.push(l);
    }

    removeListener(l: KeyboardListener) {
        this.listeners = this.listeners.filter(listener => listener !== l);
    }

    keyDown(e: KeyboardEvent) {
        this.activeKeys.add(e.key);
        this.listeners.forEach(l => l.onKeyDown(e));
    }

    keyUp(e: KeyboardEvent) {
        this.activeKeys.delete(e.key);
        this.listeners.forEach(l => l.onKeyUp(e));
    }
}