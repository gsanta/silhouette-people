import { GameObjectStore } from "./GameObjectStore"
import { QuarterStore } from "./QuarterStore";

export class DistrictStore {
    id: string
    gameObjects: GameObjectStore;
        
    private quarters: QuarterStore[] = [];

    getQuarter(index: number): QuarterStore {
        return this.quarters[index];
    }
}