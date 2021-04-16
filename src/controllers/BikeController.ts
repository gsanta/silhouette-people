import { InjectProperty } from "../di/diDecorators";
import { KeyboardService } from "../services/input/KeyboardService";
import { lookup } from "../services/Lookup";
import { MeshStore } from "../stores/MeshStore";
import { AbstractController } from "./IController";

export class BikeController extends AbstractController {
    type = null;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    constructor() {
        super();

        this.meshStore = lookup.meshStore;
        this.keyboardService = lookup.keyboard;
    }

    keyboard(e: KeyboardEvent, isKeyDown: boolean) {
        const bike = this.meshStore.getBikes()[0];

        if (isKeyDown) {
            switch(e.key) {
                case '1':
                    bike.state.setGear(0);
                break;
                case '2':
                    bike.state.setGear(1);
                break;
                case '3':
                    bike.state.setGear(2);
                break;
                case 'w':
                    bike.state.setPedalling(true);
                    bike.state.setPedalDirection('forward');
                break;
                case 's':
                    bike.state.setBraking(true);
                break;
                case 'r':
                    bike.state.setPedalling(true);
                    bike.state.setPedalDirection('backward');
                break;
            }
        } else {
            switch(e.key) {
                case 'w':
                    bike.state.setPedalling(false);
                break;
                case 's':
                    bike.state.setBraking(false);
                break;
                case 'r':
                    bike.state.setPedalling(false);
                break;
            }
        }

        if (this.keyboardService.activeKeys.has('a')) {
            bike.state.setRotation(-bike.state.rotationConst);
        } else if (this.keyboardService.activeKeys.has('d')) {
            bike.state.setRotation(bike.state.rotationConst);
        } else {
            bike.state.setRotation(0);
        }
    }

    beforeRender() {
        const bike = this.meshStore.getBikes()[0];

        bike.state.beforeRender();
    }
}