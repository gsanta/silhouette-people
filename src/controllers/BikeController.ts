import { BikeState } from "../model/bike/BikeState";
import { AbstractController, ControllerType } from "./IController";


export class BikeController extends AbstractController {
    type = null;

    state: BikeState;

    keyboard(e: KeyboardEvent) {

    }


}