import { GameObjectStore } from "../../../store/GameObjectStore";
import { EventService } from "../../EventService";
import { KeyboardService, KeyName } from "../../input/KeyboardService";
import { SelectionStore } from "../SelectionStore";
import { Hotkey } from "./Hotkey";


export class EraseHotkey implements Hotkey {
    private readonly keyboardService: KeyboardService;
    private readonly selectionStore: SelectionStore;
    private readonly gameObjectStore: GameObjectStore;
    private readonly eventService: EventService;
    private isEnabled = false;

    constructor(keyboardService: KeyboardService, selectionStore: SelectionStore, gameObjectStore: GameObjectStore, eventService: EventService) {
        this.keyboardService = keyboardService;
        this.selectionStore = selectionStore;
        this.gameObjectStore = gameObjectStore;
        this.eventService = eventService;
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    enable() {
        if (!this.isEnabled) {
            this.keyboardService.onKeydown(this.onKeyDown);
        }
        this.isEnabled = true;
    }

    disable() {
        this.keyboardService.removeOnKeydown(this.onKeyDown);
        this.isEnabled = false;
    }

    private onKeyDown(keyName: KeyName) {
        if (keyName === KeyName.DELETE) {
            this.selectionStore.getAll().forEach(gameObject => {
                this.gameObjectStore.removeItem(gameObject, true);
            });
            this.eventService.guiEvents.emitGameObjectDeleted();
        }
    }
}