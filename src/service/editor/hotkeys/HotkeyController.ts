import { Hotkey } from "./Hotkey";


export class HotkeyController {

    private hotkeys: Hotkey[] = [];

    addHotkey(hotkey: Hotkey) {
        this.hotkeys.push(hotkey);
    }
    
    enable() {
        this.hotkeys.forEach(hotkey => hotkey.enable());
    }

    disable() {
        this.hotkeys.forEach(hotkey => hotkey.disable());
    }
}