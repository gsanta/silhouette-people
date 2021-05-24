import { rotateVec, rotToVec } from "../../../helpers";
import { KeyboardService, KeyName } from "../../../service/base/keyboard/KeyboardService";
import { GraphImpl } from "../../../service/graph/GraphImpl";
import { GraphService } from "../../../service/graph/GraphService";
import { MeshInputManager } from "../../MeshInputManager";
import { BikeItem, CharacterItem } from "../character/CharacterItem";
import { NextEdgeSelector } from "../route/adapters/routing/NextEdgeSelector";
import { BikeStateInfo } from "./BikeState";
import { BikeMover } from "./states/BikeMover";

export class BikeInputManager extends MeshInputManager {
    private keyboardService: KeyboardService;
    private bikeMover: BikeMover;
    private readonly character: CharacterItem;
    private readonly nextEdgeSelector: NextEdgeSelector;
    private readonly bike: BikeItem;

    constructor(bikeWalker: BikeMover, bike: BikeItem, character: CharacterItem,  keyboardService: KeyboardService, graphService: GraphService) {
        super();
        this.bikeMover = bikeWalker;
        this.bike = bike;
        this.keyboardService = keyboardService;
        this.character = character;
        this.nextEdgeSelector = new NextEdgeSelector(character.routeWalker, <GraphImpl> graphService.getGraph());
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
                this.character.routeWalker.reverseRoute();
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