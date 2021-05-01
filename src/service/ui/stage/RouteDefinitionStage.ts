import { CharacterObj } from "../../../model/object/character/CharacterObj";
import { MeshStore } from "../../../store/MeshStore";
import { RouteStore } from "../../../store/RouteStore";
import { ActivePlayerService } from "../../ActivePlayerService";
import { ToolService } from "../../edit/ToolService";
import { GameStage, StageDescription, StepState } from "./GameStage";


export class RouteDefinitionStage implements GameStage {

    private toolService: ToolService;
    private meshStore: MeshStore;
    private activePlayerService: ActivePlayerService;
    private routeStore: RouteStore;

    private players: CharacterObj[] = [];
    private routeIsDefined: Map<CharacterObj, boolean> = new Map();

    private currentPlayer: CharacterObj = undefined;

    constructor(toolService: ToolService, meshStore: MeshStore, activePlayerService: ActivePlayerService, routeStore: RouteStore) {
        this.toolService = toolService;
        this.meshStore = meshStore;
        this.activePlayerService = activePlayerService;
        this.routeStore = routeStore;
        this.onRouteFinished = this.onRouteFinished.bind(this);
    }

    enterStage() {
        this.players = this.meshStore.getPlayers();
        this.players.forEach(player => this.routeIsDefined.set(player, false));
        this.executeStep();
    }

    executeStep() {
        this.currentPlayer = this.getNextPlayer();
        this.activePlayerService.activate(this.currentPlayer);
        this.toolService.setSelectedTool(this.toolService.path);
    }

    isFinished() {

    }

    getStepDescription(): StageDescription {
        const stageDescription: Partial<StageDescription> = {
            text: 'Draw routes'
        }

        stageDescription.steps = this.players.map(player => {
            let state: StepState = StepState.Undefined;

            if (this.routeIsDefined.get(player)) {
                state = StepState.Defined;
            } else if (this.currentPlayer === player) {
                state = StepState.Pending;
            }

            return {
                state
            }
        });

        return <StageDescription> stageDescription;
    }

    private onRouteFinished(wasCanceled: boolean) {
        if (!wasCanceled) {
            this.routeIsDefined.set(this.currentPlayer, true);
            this.executeStep();
        }
    }

    // private checkIfStepWasSuccessful() {
    //     const route = this.routeStore.getRouteForCharacter(this.currentPlayer);
    
    //     if (route) {
    //         this.routeIsDefined.set(this.currentPlayer, true);
    //         return true;
    //     }
    // }

    private getNextPlayer(): CharacterObj {
        if (!this.currentPlayer) {
            return this.players[0];
        } 
        
        const currentIndex = this.players.indexOf(this.currentPlayer);
        const nextIndex = (currentIndex + 1) % this.players.length;
        const upperHalf = this.players.slice(nextIndex, this.players.length)
        const lowerHalf = this.players.slice(0, nextIndex);

        const ordered = [...lowerHalf, ...upperHalf];

        for (let player of ordered) {
            if (!this.routeIsDefined.get(player)) {
                return player;
            }
        }
    }
}