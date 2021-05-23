import { KeyboardService } from "../../../service/base/keyboard/KeyboardService";
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
        this.keyboardService.onKeydown(e => this.onKeyDown(e));
    }

    onKeyDown(e: KeyboardEvent) {
        let key = (e.key || '').toLowerCase();
        let bikeInfo = this.bike.info;

        switch(key) {
            case 'e':
                this.nextEdgeSelector.chooseNextEdge();
            break;
            case 'r':
                this.character.routeWalker.reverseRoute();
            break;
            case 'q':
                this.nextEdgeSelector.choosePrevEdge();
            break;
            case '1':
                bikeInfo = this.bike.info.setGear(0);
            break;
            case '2':
                bikeInfo = this.bike.info.setGear(1);
            break;
            case '3':
                bikeInfo = this.bike.info.setGear(2);
            break;
        }

        this.updateStateIfBikeInfoChanged(bikeInfo);
    }

    keyboard(downKeys: Set<string>) {
        let info: BikeStateInfo = this.bike.info;
        
        info = this.handleSpeed(info, downKeys);
        info = this.handleSteering(info);

        this.updateStateIfBikeInfoChanged(info);
    }

    private handleSpeed(info: BikeStateInfo, downKeys: Set<string>): BikeStateInfo {
        info = info.setPowerBrakeOn(downKeys.has('shift'));
        info = info.setPedalling(downKeys.has('w'));
        info = info.setBraking(downKeys.has('s'));

        return info;
    }

    private handleSteering(info: BikeStateInfo): BikeStateInfo {
        if (!this.isDirectionDisabled) {
            if (this.keyboardService.keys.has('a')) {
                info = info.setSteering(-this.bikeMover.rotationConst);
            } else if (this.keyboardService.keys.has('d')) {
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