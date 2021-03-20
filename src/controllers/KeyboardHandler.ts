import { KeyChecker } from "./KeyChecker";


export class KeyboardHandler {
    activeKeys: Set<string> = new Set();
    checker: KeyChecker;

    constructor() {
        this.checker = new KeyChecker(this);
    }

    keyDown(e: KeyboardEvent) {
        this.activeKeys.add(e.key);
    }

    keyUp(e: KeyboardEvent) {
        this.activeKeys.delete(e.key);
    }
}