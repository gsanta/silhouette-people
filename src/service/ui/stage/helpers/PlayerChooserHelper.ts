import { MeshItem } from "../../../../model/item/mesh/MeshItem";

export class PlayerChooserHelper {
    private players: MeshItem[] = [];
    private finishedPlayers: Set<MeshItem>;
    private activePlayer: MeshItem;

    setPlayers(players: MeshItem[]) {
        this.players = players;

        this.players = players;
        this.finishedPlayers = new Set();
        this.activePlayer = undefined;
    }

    isPlayerFinished(player: MeshItem): boolean {
        return this.finishedPlayers.has(player);
    }

    finishActivePlayer() {
        if (this.activePlayer) {
            this.finishedPlayers.add(this.activePlayer);
        }
    }

    getActivePlayer(): MeshItem {
        return this.activePlayer;
    }

    determineNextActivePlayer(): MeshItem {
        this.activePlayer = this.getNextPlayer();
        return this.activePlayer;
    }

    private getNextPlayer(): MeshItem {
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