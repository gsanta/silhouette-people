import { KeyboardService } from "../../../service/base/keyboard/KeyboardService";


export abstract class InputController {
    protected isSpeedDisabled = false;
    protected isDirectionDisabled = false;

    constructor(keyboardService: KeyboardService) {
        keyboardService.addListener({
            onKeyDown: (e) => this.keyboard(keyboardService.keyNames),
            onKeyUp: () => this.keyboard(keyboardService.keyNames)
        });
    }
    
    abstract keyboard(downKeys: Set<string>);

    disableSpeed() {
        this.isSpeedDisabled = true;
    }
    
    enableSpeed() {
        this.isSpeedDisabled = false;
    }

    disableDirection() {
        this.isDirectionDisabled = true;
    }

    enableDirection() {
        this.isDirectionDisabled = false;
    }
}