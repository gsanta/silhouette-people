
export enum GameEventType {
    DISTRICTS_LOADED = 'DISTRICTS_LOADED'
}

export class EventService {
    private listeners: ((type: GameEventType) => void)[] = [];


    on(listener: (type: GameEventType) => void) {
        this.listeners.push(listener);
    }

    off(listener: (type: GameEventType) => void) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    emit(type: GameEventType) {
        this.listeners.forEach(listener => listener(type));
    }
}