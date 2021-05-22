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
    private bikeWalker: BikeMover;
    private readonly character: CharacterItem;
    private readonly nextEdgeSelector: NextEdgeSelector;
    private readonly bikeInfo: BikeStateInfo;
    private readonly bike: BikeItem;

    constructor(bikeWalker: BikeMover, bike: BikeItem, character: CharacterItem,  keyboardService: KeyboardService, graphService: GraphService) {
        super();
        this.bikeWalker = bikeWalker;
        this.bike = bike;
        this.keyboardService = keyboardService;
        this.character = character;
        this.nextEdgeSelector = new NextEdgeSelector(character.routeWalker, <GraphImpl> graphService.getGraph());
        this.keyboardService.onKeydown(e => this.onKeyDown(e));
        this.keyboardService.onKeyup(e => this.onKeyDown(e));

        this.bikeInfo = {
            isBreaking: false,
            isPedalling: false,
            gear: 0,
            isPowerBrakeOn: false
        }
    }

    onKeyDown(e: KeyboardEvent) {
        switch(e.key) {
            case 'e':
                this.nextEdgeSelector.chooseNextEdge();
            break;
            case 'r':
                this.character.routeWalker.reverseRoute();
            break;
            case 'q':
                this.nextEdgeSelector.choosePrevEdge();
            break;
        }

        if (e.shiftKey) {
            this.bikeInfo.isPowerBrakeOn = true;
            this.bike.animationState.updateInfo(this.bikeInfo);
        }
    }

    onKeyUp(e: KeyboardEvent) {
        if (!e.shiftKey) {
            this.bikeInfo.isPowerBrakeOn = true;
            this.bike.animationState.updateInfo(this.bikeInfo);
        }
    }

    keyboard(e: KeyboardEvent, isKeyDown: boolean) {

        if (!this.isSpeedDisabled) {
            this.handleSpeed(e, isKeyDown);
        }

        if (!this.isDirectionDisabled) {
            this.handleDirection();
        }
    }

    private handleDirection() {
        const walker = this.bikeWalker;

        if (this.keyboardService.activeKeys.has('a')) {
            walker.setRotation(-walker.rotationConst);
        } else if (this.keyboardService.activeKeys.has('d')) {
            walker.setRotation(walker.rotationConst);
        } else {
            walker.setRotation(0);
        }
    }

    private handleSpeed(e: KeyboardEvent, isKeyDown: boolean) {
        const walker = this.bikeWalker;

        if (isKeyDown) {
            if (!this.character.routeWalker.isRunning()) {
                return;
            }
            switch(e.key) {
                case '1':
                    this.bikeInfo.gear = 0;
                    this.bike.animationState.updateInfo(this.bikeInfo);
                    // walker.setGear(0);
                break;
                case '2':
                    this.bikeInfo.gear = 1;
                    this.bike.animationState.updateInfo(this.bikeInfo);
                    // walker.setGear(1);
                break;
                case '3':
                    this.bikeInfo.gear = 2;
                    this.bike.animationState.updateInfo(this.bikeInfo);
                    // walker.setGear(2);
                break;
                case 'w':
                    this.bikeInfo.isPedalling = true;
                    this.bike.animationState.updateInfo(this.bikeInfo);
                    // walker.setPedalling(true);
                    // walker.setPedalDirection('forward');
                break;
                case 's':
                    this.bikeInfo.isBreaking = true;
                    this.bike.animationState.updateInfo(this.bikeInfo);
                    // walker.setBraking(true);
                break;
            }
        } else {
            switch(e.key) {
                case 'w':
                    this.bikeInfo.isPedalling = false;
                    this.bike.animationState.updateInfo(this.bikeInfo);
                    // walker.setPedalling(false);
                break;
                case 's':
                    this.bikeInfo.isBreaking = false;
                    this.bike.animationState.updateInfo(this.bikeInfo);
                    // walker.setBraking(false);
                break;
            }
        }
    }
}