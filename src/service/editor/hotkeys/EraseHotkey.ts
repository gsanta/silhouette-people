import { GameObjectStore } from "../../../store/GameObjectStore";
import { KeyboardService, KeyName } from "../../input/KeyboardService";
import { SelectionStore } from "../SelectionStore";
import { Hotkey } from "./Hotkey";


export class EraseHotkey implements Hotkey {
    private readonly keyboardService: KeyboardService;
    private readonly selectionStore: SelectionStore;
    private readonly gameObjectStore: GameObjectStore;
    private isEnabled = false;

    constructor(keyboardService: KeyboardService, selectionStore: SelectionStore, gameObjectStore: GameObjectStore) {
        this.keyboardService = keyboardService;
        this.selectionStore = selectionStore;
        this.gameObjectStore = gameObjectStore;
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
        if (keyName === KeyName.M) {
            this.selectionStore.getAll().forEach(gameObject => {
                this.gameObjectStore.removeItem(gameObject);
            });
        }
    }
}