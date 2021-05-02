import { CharacterObj } from "../../../../model/object/character/CharacterObj";


export class PlayerChooserHelper {
    private players: CharacterObj[];
    private finishedPlayers: Set<CharacterObj>;
    private activePlayer: CharacterObj;

    constructor(players: CharacterObj[]) {
        this.players = players;
        this.finishedPlayers = new Set();
    }

    isPlayerFinished(player: CharacterObj): boolean {
        return this.finishedPlayers.has(player);
    }

    finishActivePlayer() {
        if (this.activePlayer) {
            this.finishedPlayers.add(this.activePlayer);
        }
    }

    getActivePlayer(): CharacterObj {
        return this.activePlayer;
    }

    determineNextActivePlayer(): CharacterObj {
        this.activePlayer = this.getNextPlayer();
        return this.activePlayer;
    }

    private getNextPlayer(): CharacterObj {
        if (!this.activePlayer) {
            return this.players[0];
        } 
        
        const currentIndex = this.players.indexOf(this.activePlayer);
        const nextIndex = (currentIndex + 1) % this.players.length;
        const upperHalf = this.players.slice(nextIndex, this.players.length)
        const lowerHalf = this.players.slice(0, nextIndex);

        const ordered = [...lowerHalf, ...upperHalf];

        for (let player of ordered) {
            if (!this.finishedPlayers.has(player)) {
                return player;
            }
        }
    }
}