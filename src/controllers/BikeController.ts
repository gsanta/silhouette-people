import { BikeState } from "../model/bike/BikeState";
import { AbstractController } from "./IController";


export class BikeController extends AbstractController {
    type = null;

    state: BikeState;

    keyboard(e: KeyboardEvent, isKeyDown: boolean) {
        if (isKeyDown) {
            switch(e.key) {
                case '1':
                    this.state.setGear(0);
                break;
                case '2':
                    this.state.setGear(1);
                break;
                case '3':
                    this.state.setGear(2);
                break;
                case 'w':
                    this.state.setPedalling(true);
                    this.state.setPedalDirection('forward');
                break;
                case 's':
                    this.state.setBraking(true);
                break;
                case 'r':
                    this.state.setPedalling(true);
                    this.state.setPedalDirection('backward');
                break;
            }
        } else {
            switch(e.key) {
                case 'w':
                    this.state.setPedalling(false);
                break;
                case 's':
                    this.state.setBraking(false);
                break;
                case 'r':
                    this.state.setPedalling(false);
                break;
            }
        }
    }


}