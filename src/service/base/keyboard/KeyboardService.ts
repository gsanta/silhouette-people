import { KeyChecker } from "./KeyChecker";

export interface KeyboardListener {
    onKeyDown?(e: KeyboardEvent): void;
    onKeyUp?(e: KeyboardEvent): void;
}

export class KeyboardService {
    activeKeys: Set<string> = new Set();
    checker: KeyChecker;

    private handlers: KeyboardListener[] = [];
    private keydownHandlers: ((e: KeyboardEvent) => void)[] = [];

    constructor() {
        this.checker = new KeyChecker(this);
    }

    addListener(l: KeyboardListener) {
        this.handlers.push(l);
    }

    onKeydown(handler: (e: KeyboardEvent) => void) {
        this.keydownHandlers.push(handler);
    }

    removeListener(l: KeyboardListener) {
        this.handlers = this.handlers.filter(listener => listener !== l);
    }

    keyDown(e: KeyboardEvent) {
        this.activeKeys.add(e.key);
        this.handlers.forEach(l => l.onKeyDown && l.onKeyDown(e));
        this.keydownHandlers.forEach(handler => handler(e));
    }

    keyUp(e: KeyboardEvent) {
        this.activeKeys.delete(e.key);
        this.handlers.forEach(l => l.onKeyUp && l.onKeyUp(e));
    }
}