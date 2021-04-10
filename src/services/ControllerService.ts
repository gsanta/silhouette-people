import { AbstractController, ControllerType } from "../controllers/IController";


export class ControllerService {
    readonly all: AbstractController[] = [];

    addController(controller: AbstractController) {
        this.all.push(controller);
    }

    getByType(type: ControllerType) {
        return this.all.find(controller => controller.type === type);
    }
}