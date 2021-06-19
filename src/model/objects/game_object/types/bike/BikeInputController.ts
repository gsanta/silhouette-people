import { KeyboardService, KeyName } from "../../../../../service/input/KeyboardService";
import { GraphImpl } from "../../../../../service/graph/GraphImpl";
import { GraphService } from "../../../../../service/graph/GraphService";
import { InputController } from "../../InputController";
import { NextEdgeSelector } from "../../../route/routing/NextEdgeSelector";
import { BikeController } from "./BikeController";
import { GameObject } from "../../GameObject";

export class BikeInputController extends InputController {
    private keyboardService: KeyboardService;
    private motionController: BikeController;
    private readonly character: GameObject;
    private readonly nextEdgeSelector: NextEdgeSelector;

    constructor(motionController: BikeController, character: GameObject,  keyboardService: KeyboardService, graphService: GraphService) {
        super(keyboardService);
        this.motionController = motionController;
        this.keyboardService = keyboardService;
        this.character = character;
        this.nextEdgeSelector = new NextEdgeSelector(character.routeController, <GraphImpl> graphService.getGraph());
        this.keyboardService.onKeydown(keyName => this.onKeyDown(keyName));
    }

    onKeyDown(key: KeyName) {
        switch(key) {
            case KeyName.FORWARD1:
                this.nextEdgeSelector.chooseNextEdge();
            break;
            case KeyName.BACKWARD1:
                this.nextEdgeSelector.choosePrevEdge();
            break;
            case KeyName.R:
                this.character.routeController.reverseRoute();
            break;
            case KeyName.FORWARD2:
                const nextGear = this.motionController.gear === this.motionController.maxGear ? this.motionController.maxGear : this.motionController.gear + 1; 
                this.motionController.gear = nextGear;
            break;
            case KeyName.BACKWARD2:
                const prevGear = this.motionController.gear === 0 ? 0 : this.motionController.gear - 1;
                this.motionController.gear = prevGear;
            break;
        }
    }

    keyboard(downKeys: Set<KeyName>) {        
        this.handleSpeed(downKeys);
        this.handleSteering(downKeys);
    }

    private handleSpeed(downKeys: Set<KeyName>) {
        this.motionController.powerBrakeOn = downKeys.has(KeyName.SHIFT);
        this.motionController.pedalling = downKeys.has(KeyName.UP);
        this.motionController.braking = downKeys.has(KeyName.DOWN);
    }

    private handleSteering(downKeys: Set<KeyName>) {
        if (!this.isDirectionDisabled) {
            if (downKeys.has(KeyName.LEFT)) {
                this.motionController.steering = this.motionController.rotationConst; 
            } else if (downKeys.has(KeyName.RIGHT)) {
                this.motionController.steering = -this.motionController.rotationConst; 
            } else {
                this.motionController.steering = 0; 
            }
        }
    }
}