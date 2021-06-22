import { KeyChecker } from "./KeyChecker";

export interface KeyboardListener {
    onKeyDown?(e: KeyboardEvent): void;
    onKeyUp?(e: KeyboardEvent): void;
}

export enum KeyName {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    UP = 'UP',
    DOWN = 'DOWN',
    SHIFT = 'SHIFT',
    E = 'E',
    Q = 'Q',
    R = 'R',
    M = 'M',
    T = 'T',
    NONE = 'NONE',
    FORWARD1 = 'FORWARD1',
    BACKWARD1 = 'BACKWARD1',
    FORWARD2 = 'FORWARD2',
    BACKWARD2 = 'BACKWARD2',
    SPACE = 'SPACE'
}

export class KeyboardService {
    keys: Set<string> = new Set();
    keyNames: Set<string> = new Set();
    checker: KeyChecker;

    private handlers: KeyboardListener[] = [];
    private keydownHandlers: ((keyName: KeyName) => void)[] = [];

    constructor() {
        this.checker = new KeyChecker(this);
    }

    addListener(l: KeyboardListener) {
        this.handlers.push(l);
    }

    onKeydown(handler: (keyName: KeyName) => void) {
        this.keydownHandlers.push(handler);
    }

    removeListener(l: KeyboardListener) {
        this.handlers = this.handlers.filter(listener => listener !== l);
    }

    keyDown(e: KeyboardEvent) {
        this.keys.add(e.key);

        let keyName = this.mapKey(e.key);
        if (keyName !== KeyName.NONE) {
            this.keyNames.add(keyName);
        }

        this.handleShift(e);
        this.handlers.forEach(l => l.onKeyDown && l.onKeyDown(e));
        this.keydownHandlers.forEach(handler => handler(keyName));
    }

    keyUp(e: KeyboardEvent) {
        this.keys.delete(e.key);
        this.handleShift(e);
        this.keyNames.delete(this.mapKey(e.key));
        this.handlers.forEach(l => l.onKeyUp && l.onKeyUp(e));
    }

    private handleShift(e: KeyboardEvent) {
        if (e.shiftKey) {
            this.keys.add('shift');
            this.keyNames.add(KeyName.SHIFT);
        } else {
            this.keys.delete('shift');
            this.keyNames.delete(KeyName.SHIFT);
        }
    }

    private mapKey(keyboardKey: string): KeyName {
        keyboardKey = (keyboardKey || '').toLowerCase();
        
        switch(keyboardKey) {
            case 'w':
                return KeyName.UP;
            case 's':
                return KeyName.DOWN;
            case 'a':
                return KeyName.LEFT;
            case 'd':
                return KeyName.RIGHT;
            case 'e':
                return KeyName.FORWARD1;
            case 'q':
                return KeyName.BACKWARD1;
            case 'r':
                return KeyName.R;
            case 'm':
                return KeyName.M;
            case 't':
                return KeyName.T;
            case 'c':
                return KeyName.FORWARD2;
            case 'x':
                return KeyName.BACKWARD2;
            case 'shift':
                return KeyName.SHIFT;
            case ' ':
                return KeyName.SPACE;
            default:
                return KeyName.NONE;
        }
    }
}