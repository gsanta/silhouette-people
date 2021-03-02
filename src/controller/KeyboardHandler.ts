

export class KeyboardHandler {
    activeKeys: Set<string> = new Set();

    keyDown(e: KeyboardEvent) {
        this.activeKeys.add(e.key);
    }

    keyUp(e: KeyboardEvent) {
        this.activeKeys.delete(e.key);
    }
}