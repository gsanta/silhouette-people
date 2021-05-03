import { CharacterObj } from "../../../../model/object/character/CharacterObj";
import { StageDescription, StepDescription, StepState } from "../StageDescription";
import { PlayerChooserHelper } from "./PlayerChooserHelper";


export class StageDescriptionHelper {
    private players: CharacterObj[] = [];
    private playerChooserHelper: PlayerChooserHelper;
    private stageText: string;

    constructor(stageText: string, playerChooserHelper: PlayerChooserHelper) {
        this.stageText = stageText;
        this.playerChooserHelper = playerChooserHelper;    
    }

    setPlayers(players: CharacterObj[]) {
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

    private getStepDescriptions(activePlayer: CharacterObj): StepDescription[] {
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