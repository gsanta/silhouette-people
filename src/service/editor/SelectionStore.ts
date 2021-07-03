import { GameObject } from "../../model/objects/game_object/GameObject";
import { EventService } from "../EventService";


export class SelectionStore {

    private selectedItems: Set<GameObject> = new Set();
    private readonly eventService: EventService;

    constructor(eventService: EventService) {
        this.eventService = eventService;
    }

    set(gameObject: GameObject) {
        this.selectedItems.clear();
        this.selectedItems.add(gameObject);
        this.eventService.guiEvents.emitGameObjectSelected(gameObject);
    }

    removeAll() {
        this.selectedItems = new Set();
        this.eventService.guiEvents.emitGameObjectSelected(null);
    }

    getAll(): Set<GameObject> {
        return this.selectedItems;
    }
}