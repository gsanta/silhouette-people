import { InjectProperty } from "../di/diDecorators";
import { lookup } from "../services/Lookup";
import { MeshStore } from "../stores/MeshStore";
import { AbstractController } from "./IController";

export class BikeController extends AbstractController {
    type = null;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    constructor() {
        super();

        this.meshStore = lookup.meshStore;
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
    }
}