import { KeyboardService, KeyName } from "../../../../service/base/keyboard/KeyboardService";
import { GraphImpl } from "../../../../service/graph/GraphImpl";
import { GraphService } from "../../../../service/graph/GraphService";
import { BikeItem, CharacterItem } from "../../character/CharacterItem";
import { InputController } from "./InputController";
import { NextEdgeSelector } from "../../route/adapters/routing/NextEdgeSelector";
import { BikeStateInfo } from "../../bike/BikeState";
import { BikeController } from "../../bike/states/BikeController";

export class BikeInputController extends InputController {
    private keyboardService: KeyboardService;
    private bikeMover: BikeController;
    private readonly character: CharacterItem;
    private readonly nextEdgeSelector: NextEdgeSelector;
    private readonly bike: BikeItem;

    constructor(bikeWalker: BikeController, bike: BikeItem, character: CharacterItem,  keyboardService: KeyboardService, graphService: GraphService) {
        super();
        this.bikeMover = bikeWalker;
        this.bike = bike;
        this.keyboardService = keyboardService;
        this.character = character;
        this.nextEdgeSelector = new NextEdgeSelector(character.routeController, <GraphImpl> graphService.getGraph());
        this.keyboardService.onKeydown(keyName => this.onKeyDown(keyName));
    }

    onKeyDown(key: KeyName) {
        let info = this.bike.info;

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
                const nextGear = info.gear === info.maxGear ? info.maxGear : info.gear + 1; 
                info = this.bike.info.setGear(nextGear);
            break;
            case KeyName.BACKWARD2:
                const prevGear = info.gear === 0 ? 0 : info.gear - 1; 
                info = this.bike.info.setGear(prevGear);
            break;
        }

        this.updateStateIfBikeInfoChanged(info);
    }

    keyboard(downKeys: Set<KeyName>) {
        let info: BikeStateInfo = this.bike.info;
        
        info = this.handleSpeed(info, downKeys);
        info = this.handleSteering(info, downKeys);

        this.updateStateIfBikeInfoChanged(info);
    }

    private handleSpeed(info: BikeStateInfo, downKeys: Set<KeyName>): BikeStateInfo {
        info = info.setPowerBrakeOn(downKeys.has(KeyName.SHIFT));
        info = info.setPedalling(downKeys.has(KeyName.UP));
        info = info.setBraking(downKeys.has(KeyName.DOWN));

        return info;
    }

    private handleSteering(info: BikeStateInfo, downKeys: Set<KeyName>): BikeStateInfo {
        if (!this.isDirectionDisabled) {
            if (downKeys.has(KeyName.LEFT)) {
                info = info.setSteering(-this.bikeMover.rotationConst);
            } else if (downKeys.has(KeyName.RIGHT)) {
                info = info.setSteering(this.bikeMover.rotationConst);
            } else {
                info = info.setSteering(0);
            }
        }

        return info;
    }

    private updateStateIfBikeInfoChanged(bikeInfo: BikeStateInfo) {
        if (this.bike.info !== bikeInfo) {
            this.bike.info = bikeInfo;
            this.bike.animationState.updateInfo(bikeInfo);
        }
    }
}