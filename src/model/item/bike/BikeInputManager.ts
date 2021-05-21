import { KeyboardService } from "../../../service/base/keyboard/KeyboardService";
import { GraphImpl } from "../../../service/graph/GraphImpl";
import { GraphService } from "../../../service/graph/GraphService";
import { MeshInputManager } from "../../MeshInputManager";
import { CharacterItem } from "../character/CharacterItem";
import { NextEdgeSelector } from "../route/adapters/routing/NextEdgeSelector";
import { BikeWalker } from "./states/BikeWalker";

export class BikeInputManager extends MeshInputManager {
    private keyboardService: KeyboardService;
    private bikeWalker: BikeWalker;
    private readonly character: CharacterItem;
    private readonly nextEdgeSelector: NextEdgeSelector;

    constructor(bikeWalker: BikeWalker, character: CharacterItem,  keyboardService: KeyboardService, graphService: GraphService) {
        super();
        this.bikeWalker = bikeWalker;
        this.keyboardService = keyboardService;
        this.character = character;
        this.nextEdgeSelector = new NextEdgeSelector(character.route.walker, <GraphImpl> graphService.getGraph());
        this.keyboardService.onKeydown(e => this.onKeyDown(e));
    }

    onKeyDown(e: KeyboardEvent) {
        switch(e.key) {
        
            case 'e':
                this.nextEdgeSelector.choosePrevEdge();
            break;
            case 'r':
                this.nextEdgeSelector.chooseNextEdge();
            break;
        }
    }

    keyboard(e: KeyboardEvent, isKeyDown: boolean) {

        if (!this.isSpeedDisabled) {
            this.handleSpeed(e, isKeyDown);
        }

        if (this.keyboardService.activeKeys.has('q')) {
            if (isKeyDown) {
                const isReversed = this.character.route.walker.isReversed();

                if (isReversed) {
                    this.character.route.walker.setReversed(false);
                } else {
                    this.character.route.walker.setReversed(true);
                }
            }
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
            if (!this.character.route.walker.isRunning()) {
                return;
            }
            switch(e.key) {
                case '1':
                    walker.setGear(0);
                break;
                case '2':
                    walker.setGear(1);
                break;
                case '3':
                    walker.setGear(2);
                break;
                case 'w':
                    walker.setPedalling(true);
                    walker.setPedalDirection('forward');
                break;
                case 's':
                    walker.setBraking(true);
                break;
                // case 'r':
                //     walker.setPedalling(true);
                //     walker.setPedalDirection('backward');
                // break;
            }
        } else {
            switch(e.key) {
                case 'w':
                    walker.setPedalling(false);
                break;
                case 's':
                    walker.setBraking(false);
                break;
                // case 'r':
                //     walker.setPedalling(false);
                // break;
            }
        }
    }
}