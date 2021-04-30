

export abstract class MeshInputManager {
    protected isSpeedDisabled = false;
    protected isDirectionDisabled = false;
    
    abstract keyboard(e: KeyboardEvent, isKeyDown: boolean);

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