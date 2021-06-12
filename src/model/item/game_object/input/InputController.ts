

export abstract class InputController {
    protected isSpeedDisabled = false;
    protected isDirectionDisabled = false;
    
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