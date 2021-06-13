import { MeshItem } from "../../../../model/item/mesh/MeshItem";
import { StageDescription, StepDescription, StepState } from "../StageDescription";
import { PlayerChooserHelper } from "./PlayerChooserHelper";


export class StageDescriptionHelper {
    private players: MeshItem[] = [];
    private playerChooserHelper: PlayerChooserHelper;
    private stageText: string;

    constructor(stageText: string, playerChooserHelper: PlayerChooserHelper) {
        this.stageText = stageText;
        this.playerChooserHelper = playerChooserHelper;    
    }

    setPlayers(players: MeshItem[]) {
        this.players = players;
    }

    getDescription(): StageDescription {
        const activePlayer = this.playerChooserHelper.getActivePlayer();

        const stageDescription: StageDescription = {
            text: this.stageText,
            steps: this.getStepDescriptions(activePlayer)
        }

        return stageDescription;
    }

    private getStepDescriptions(activePlayer: MeshItem): StepDescription[] {
        return this.players.map(player => {
            let state: StepState = StepState.Undefined;

            if (this.playerChooserHelper && this.playerChooserHelper.isPlayerFinished(player)) {
                state = StepState.Defined;
            } else if (activePlayer === player) {
                state = StepState.Pending;
            }

            return {
                state
            }
        });
    }
}