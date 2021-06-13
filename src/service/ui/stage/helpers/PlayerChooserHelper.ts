import { GameObject } from "../../../../model/objects/game_object/GameObject";

export class PlayerChooserHelper {
    private players: GameObject[] = [];
    private finishedPlayers: Set<GameObject>;
    private activePlayer: GameObject;

    setPlayers(players: GameObject[]) {
        this.players = players;

        this.players = players;
        this.finishedPlayers = new Set();
        this.activePlayer = undefined;
    }

    isPlayerFinished(player: GameObject): boolean {
        return this.finishedPlayers.has(player);
    }

    finishActivePlayer() {
        if (this.activePlayer) {
            this.finishedPlayers.add(this.activePlayer);
        }
    }

    getActivePlayer(): GameObject {
        return this.activePlayer;
    }

    determineNextActivePlayer(): GameObject {
        this.activePlayer = this.getNextPlayer();
        return this.activePlayer;
    }

    private getNextPlayer(): GameObject {
        if (this.players.length > 0 && !this.activePlayer) {
            return this.players[0];
        } 
        
        const currentIndex = this.players.indexOf(this.activePlayer);
        const nextIndex = (currentIndex + 1) % this.players.length;
        const upperHalf = this.players.slice(nextIndex, this.players.length)
        const lowerHalf = this.players.slice(0, nextIndex);

        const ordered = [...upperHalf, ...lowerHalf];

        for (let player of ordered) {
            if (!this.finishedPlayers.has(player)) {
                return player;
            }
        }
    }
}