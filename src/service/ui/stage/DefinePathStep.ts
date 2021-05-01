import { CharacterObj } from "../../../model/object/character/CharacterObj";
import { MeshStore } from "../../../store/MeshStore";
import { ToolService } from "../../edit/ToolService";


export class DefinePathStep {

    private toolService: ToolService;
    private meshStore: MeshStore;

    private players: CharacterObj[] = [];
    private pathDefined: Map<CharacterObj, boolean> = new Map();

    private currentPlayer: CharacterObj = undefined;

    constructor(toolService: ToolService, meshStore: MeshStore) {
        this.toolService = toolService;
        this.meshStore = meshStore;
        this.onPathReady = this.onPathReady.bind(this);
    }

    enterStage() {
        this.toolService.setSelectedTool(this.toolService.path);
        this.players = this.meshStore.getPlayers();
        this.players.forEach(player => this.pathDefined.set(player, false));
    }

    executeStep() {
        this.currentPlayer = this.getNextPlayer();


    }

    isFinished() {

    }

    private onPathReady() {
        this.executeStep();
    }

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
            if (!this.pathDefined.get(player)) {
                return player;
            }
        }
    }
}