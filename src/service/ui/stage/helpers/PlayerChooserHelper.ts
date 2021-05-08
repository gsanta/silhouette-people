import { CharacterItem } from "../../../../model/item/character/CharacterItem";


export class PlayerChooserHelper {
    private players: CharacterItem[] = [];
    private finishedPlayers: Set<CharacterItem>;
    private activePlayer: CharacterItem;

    setPlayers(players: CharacterItem[]) {
        this.players = players;

        this.players = players;
        this.finishedPlayers = new Set();
        this.activePlayer = undefined;
    }

    isPlayerFinished(player: CharacterItem): boolean {
        return this.finishedPlayers.has(player);
    }

    finishActivePlayer() {
        if (this.activePlayer) {
            this.finishedPlayers.add(this.activePlayer);
        }
    }

    getActivePlayer(): CharacterItem {
        return this.activePlayer;
    }

    determineNextActivePlayer(): CharacterItem {
        this.activePlayer = this.getNextPlayer();
        return this.activePlayer;
    }

    private getNextPlayer(): CharacterItem {
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