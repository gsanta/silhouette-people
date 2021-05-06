

export class EventService {
    private mapLoadedFuncs: Function[] = [];

    onMapLoaded(func: () => void) {
        this.mapLoadedFuncs.push(func);
    }

    emitMapLoaded() {
        this.mapLoadedFuncs.forEach(func => func());
    }
}